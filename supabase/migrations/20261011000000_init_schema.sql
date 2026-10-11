-- SAILS 360: initial schema, roles, Row Level Security, storage buckets.
-- NOT YET APPLIED to any project. Review before running (see README).
-- Principles: least privilege; every table has RLS enabled; the client can
-- never set its own role; private concerns are readable only by admin/reviewer.

-- ---------------------------------------------------------------------------
-- Types
-- ---------------------------------------------------------------------------
create type public.app_role as enum
  ('student', 'content_editor', 'program_officer', 'admin', 'reviewer');
create type public.publication_status as enum ('draft', 'published', 'archived');
create type public.review_status as enum ('pending', 'approved', 'rejected');
create type public.access_class as enum ('public', 'members', 'restricted');
create type public.feedback_kind as enum ('general', 'concern');

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- ---------------------------------------------------------------------------
-- profiles (one row per auth user)
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text check (char_length(full_name) <= 120),
  year_level text check (char_length(year_level) <= 40),
  role public.app_role not null default 'student',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

-- Role check used by policies. SECURITY DEFINER avoids recursive RLS on profiles.
create or replace function public.has_any_role(allowed public.app_role[])
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.profiles p
    where p.id = (select auth.uid()) and p.role = any (allowed)
  );
$$;
revoke all on function public.has_any_role(public.app_role[]) from public;
grant execute on function public.has_any_role(public.app_role[]) to anon, authenticated;

-- New auth users always start as 'student'. Never read a role from user metadata.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, role) values (new.id, 'student');
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Block self-promotion. Changes made from the SQL editor / service role
-- (auth.uid() is null) are allowed; this is how the first admin is created.
create or replace function public.guard_role_change()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if new.role is distinct from old.role
     and (select auth.uid()) is not null
     and not public.has_any_role(array['admin']::public.app_role[]) then
    raise exception 'Only an administrator can change roles';
  end if;
  return new;
end $$;
create trigger profiles_guard_role before update on public.profiles
  for each row execute function public.guard_role_change();

alter table public.profiles enable row level security;
create policy "profiles: read own" on public.profiles
  for select to authenticated using (id = (select auth.uid()));
create policy "profiles: admins read all" on public.profiles
  for select to authenticated using (public.has_any_role(array['admin']::public.app_role[]));
create policy "profiles: update own (role guarded by trigger)" on public.profiles
  for update to authenticated
  using (id = (select auth.uid())) with check (id = (select auth.uid()));
create policy "profiles: admins update any" on public.profiles
  for update to authenticated
  using (public.has_any_role(array['admin']::public.app_role[]))
  with check (public.has_any_role(array['admin']::public.app_role[]));

-- ---------------------------------------------------------------------------
-- pillars and programs
-- ---------------------------------------------------------------------------
create table public.pillars (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  tagline text,
  purpose text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.programs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null unique,
  pillar_id uuid not null references public.pillars (id),
  summary text,
  purpose text,
  beneficiaries text,
  participation text,
  status text not null default 'to-be-confirmed'
    check (status in ('planned', 'active', 'to-be-confirmed')),
  publication public.publication_status not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index programs_pillar_idx on public.programs (pillar_id);
create trigger programs_updated_at before update on public.programs
  for each row execute function public.set_updated_at();

alter table public.pillars enable row level security;
alter table public.programs enable row level security;
create policy "pillars: public read" on public.pillars for select to anon, authenticated using (true);
create policy "pillars: admins write" on public.pillars for all to authenticated
  using (public.has_any_role(array['admin']::public.app_role[]))
  with check (public.has_any_role(array['admin']::public.app_role[]));
create policy "programs: public read published" on public.programs
  for select to anon, authenticated using (publication = 'published');
create policy "programs: staff read all" on public.programs
  for select to authenticated
  using (public.has_any_role(array['admin','program_officer','reviewer']::public.app_role[]));
create policy "programs: staff write" on public.programs
  for all to authenticated
  using (public.has_any_role(array['admin','program_officer']::public.app_role[]))
  with check (public.has_any_role(array['admin','program_officer']::public.app_role[]));

-- ---------------------------------------------------------------------------
-- announcements and events
-- ---------------------------------------------------------------------------
create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null check (char_length(title) between 3 and 200),
  category text not null default 'General',
  excerpt text,
  body text not null,
  featured boolean not null default false,
  status public.publication_status not null default 'draft',
  is_demo boolean not null default false,
  published_at timestamptz,
  author_id uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index announcements_status_idx on public.announcements (status, published_at desc);
create trigger announcements_updated_at before update on public.announcements
  for each row execute function public.set_updated_at();

create table public.events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null check (char_length(title) between 3 and 200),
  category text not null default 'Community',
  summary text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  location text not null default 'To be announced',
  capacity int check (capacity is null or capacity > 0),
  registration_deadline timestamptz,
  status public.publication_status not null default 'draft',
  is_demo boolean not null default false,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at is null or ends_at >= starts_at)
);
create index events_status_idx on public.events (status, starts_at);
create trigger events_updated_at before update on public.events
  for each row execute function public.set_updated_at();

alter table public.announcements enable row level security;
alter table public.events enable row level security;
create policy "announcements: public read published" on public.announcements
  for select to anon, authenticated using (status = 'published');
create policy "announcements: editors read all" on public.announcements
  for select to authenticated
  using (public.has_any_role(array['admin','content_editor','reviewer']::public.app_role[]));
create policy "announcements: editors write" on public.announcements
  for all to authenticated
  using (public.has_any_role(array['admin','content_editor']::public.app_role[]))
  with check (public.has_any_role(array['admin','content_editor']::public.app_role[]));
create policy "events: public read published" on public.events
  for select to anon, authenticated using (status = 'published');
create policy "events: staff read all" on public.events
  for select to authenticated
  using (public.has_any_role(array['admin','content_editor','program_officer','reviewer']::public.app_role[]));
create policy "events: staff write" on public.events
  for all to authenticated
  using (public.has_any_role(array['admin','program_officer']::public.app_role[]))
  with check (public.has_any_role(array['admin','program_officer']::public.app_role[]));

-- ---------------------------------------------------------------------------
-- event registrations
-- ---------------------------------------------------------------------------
create table public.event_registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events (id) on delete cascade,
  profile_id uuid not null references public.profiles (id) on delete cascade,
  attended boolean,
  created_at timestamptz not null default now(),
  unique (event_id, profile_id)
);
create index event_registrations_profile_idx on public.event_registrations (profile_id);

alter table public.event_registrations enable row level security;
create policy "registrations: register self for published events" on public.event_registrations
  for insert to authenticated
  with check (
    profile_id = (select auth.uid())
    and exists (select 1 from public.events e where e.id = event_id and e.status = 'published')
  );
create policy "registrations: read own" on public.event_registrations
  for select to authenticated using (profile_id = (select auth.uid()));
create policy "registrations: cancel own" on public.event_registrations
  for delete to authenticated using (profile_id = (select auth.uid()));
create policy "registrations: staff read" on public.event_registrations
  for select to authenticated
  using (public.has_any_role(array['admin','program_officer']::public.app_role[]));
create policy "registrations: staff update attendance" on public.event_registrations
  for update to authenticated
  using (public.has_any_role(array['admin','program_officer']::public.app_role[]))
  with check (public.has_any_role(array['admin','program_officer']::public.app_role[]));

-- ---------------------------------------------------------------------------
-- resources (metadata; files live in Storage)
-- ---------------------------------------------------------------------------
create table public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 3 and 200),
  description text,
  category text not null default 'Reference',
  access public.access_class not null default 'public',
  status public.publication_status not null default 'draft',
  storage_bucket text,
  storage_path text,
  file_type text,
  file_size_bytes bigint check (file_size_bytes is null or file_size_bytes <= 26214400),
  is_demo boolean not null default false,
  uploaded_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger resources_updated_at before update on public.resources
  for each row execute function public.set_updated_at();

alter table public.resources enable row level security;
create policy "resources: public read" on public.resources
  for select to anon, authenticated using (status = 'published' and access = 'public');
create policy "resources: members read" on public.resources
  for select to authenticated using (status = 'published' and access = 'members');
create policy "resources: staff read all" on public.resources
  for select to authenticated
  using (public.has_any_role(array['admin','content_editor','reviewer']::public.app_role[]));
create policy "resources: editors write" on public.resources
  for all to authenticated
  using (public.has_any_role(array['admin','content_editor']::public.app_role[]))
  with check (public.has_any_role(array['admin','content_editor']::public.app_role[]));

-- ---------------------------------------------------------------------------
-- mentorship applications
-- ---------------------------------------------------------------------------
create table public.mentorship_applications (
  id uuid primary key default gen_random_uuid(),
  applicant_id uuid not null references public.profiles (id) on delete cascade,
  role_sought text not null check (role_sought in ('mentee', 'mentor')),
  message text check (char_length(message) <= 2000),
  status public.review_status not null default 'pending',
  reviewed_by uuid references public.profiles (id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.mentorship_applications enable row level security;
create policy "mentorship: apply as self" on public.mentorship_applications
  for insert to authenticated
  with check (applicant_id = (select auth.uid()) and status = 'pending');
create policy "mentorship: read own" on public.mentorship_applications
  for select to authenticated using (applicant_id = (select auth.uid()));
create policy "mentorship: officers read" on public.mentorship_applications
  for select to authenticated
  using (public.has_any_role(array['admin','program_officer','reviewer']::public.app_role[]));
create policy "mentorship: officers review" on public.mentorship_applications
  for update to authenticated
  using (public.has_any_role(array['admin','program_officer']::public.app_role[]))
  with check (public.has_any_role(array['admin','program_officer']::public.app_role[]));

-- ---------------------------------------------------------------------------
-- recognition nominations (anyone may nominate; nothing public until approved)
-- ---------------------------------------------------------------------------
create table public.recognition_nominations (
  id uuid primary key default gen_random_uuid(),
  nominee_name text not null check (char_length(nominee_name) between 2 and 100),
  reason text not null check (char_length(reason) between 20 and 2000),
  nominator_name text check (char_length(nominator_name) <= 100),
  nominee_consented boolean not null default false,
  status public.review_status not null default 'pending',
  reviewed_by uuid references public.profiles (id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.recognition_nominations enable row level security;
create policy "nominations: anyone may submit pending" on public.recognition_nominations
  for insert to anon, authenticated
  with check (status = 'pending' and nominee_consented = false and reviewed_by is null);
create policy "nominations: public read approved with consent" on public.recognition_nominations
  for select to anon, authenticated using (status = 'approved' and nominee_consented = true);
create policy "nominations: reviewers read all" on public.recognition_nominations
  for select to authenticated
  using (public.has_any_role(array['admin','reviewer']::public.app_role[]));
create policy "nominations: reviewers decide" on public.recognition_nominations
  for update to authenticated
  using (public.has_any_role(array['admin','reviewer']::public.app_role[]))
  with check (public.has_any_role(array['admin','reviewer']::public.app_role[]));

-- ---------------------------------------------------------------------------
-- feedback and private concerns
-- Concerns are NEVER publicly readable and are hidden from content editors.
-- ---------------------------------------------------------------------------
create table public.feedback_submissions (
  id uuid primary key default gen_random_uuid(),
  kind public.feedback_kind not null,
  message text not null check (char_length(message) between 10 and 4000),
  name text check (char_length(name) <= 100),
  contact text check (char_length(contact) <= 200),
  status public.review_status not null default 'pending',
  reviewed_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);
create index feedback_kind_idx on public.feedback_submissions (kind, created_at desc);

alter table public.feedback_submissions enable row level security;
create policy "feedback: anyone may submit" on public.feedback_submissions
  for insert to anon, authenticated
  with check (status = 'pending' and reviewed_by is null);
create policy "feedback: staff read general" on public.feedback_submissions
  for select to authenticated
  using (kind = 'general'
         and public.has_any_role(array['admin','program_officer','reviewer']::public.app_role[]));
create policy "feedback: only admin/reviewer read concerns" on public.feedback_submissions
  for select to authenticated
  using (kind = 'concern'
         and public.has_any_role(array['admin','reviewer']::public.app_role[]));
create policy "feedback: admin/reviewer update" on public.feedback_submissions
  for update to authenticated
  using (public.has_any_role(array['admin','reviewer']::public.app_role[]))
  with check (public.has_any_role(array['admin','reviewer']::public.app_role[]));

-- ---------------------------------------------------------------------------
-- reports and audit logs
-- ---------------------------------------------------------------------------
create table public.reports (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text,
  storage_bucket text,
  storage_path text,
  status public.publication_status not null default 'draft',
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);
alter table public.reports enable row level security;
create policy "reports: public read published" on public.reports
  for select to anon, authenticated using (status = 'published');
create policy "reports: staff read all" on public.reports
  for select to authenticated
  using (public.has_any_role(array['admin','reviewer']::public.app_role[]));
create policy "reports: admin write" on public.reports
  for all to authenticated
  using (public.has_any_role(array['admin']::public.app_role[]))
  with check (public.has_any_role(array['admin']::public.app_role[]));

-- Audit log: records who did what to which row. Never stores form contents.
create table public.audit_logs (
  id bigint generated always as identity primary key,
  actor_id uuid,
  action text not null,
  table_name text not null,
  row_id text,
  created_at timestamptz not null default now()
);
alter table public.audit_logs enable row level security;
create policy "audit: admins and reviewers read" on public.audit_logs
  for select to authenticated
  using (public.has_any_role(array['admin','reviewer']::public.app_role[]));
-- No insert/update/delete policies: rows are written only by the trigger below.

create or replace function public.log_admin_action()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.audit_logs (actor_id, action, table_name, row_id)
  values (
    (select auth.uid()),
    tg_op,
    tg_table_name,
    coalesce(to_jsonb(new) ->> 'id', to_jsonb(old) ->> 'id')
  );
  return coalesce(new, old);
end $$;

create trigger audit_programs after insert or update or delete on public.programs
  for each row execute function public.log_admin_action();
create trigger audit_announcements after insert or update or delete on public.announcements
  for each row execute function public.log_admin_action();
create trigger audit_events after insert or update or delete on public.events
  for each row execute function public.log_admin_action();
create trigger audit_resources after insert or update or delete on public.resources
  for each row execute function public.log_admin_action();
create trigger audit_profiles after update on public.profiles
  for each row execute function public.log_admin_action();

-- ---------------------------------------------------------------------------
-- Storage buckets: public files vs private files (served by signed URL)
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('public-resources', 'public-resources', true, 26214400,
   array['application/pdf','image/png','image/jpeg',
         'application/vnd.openxmlformats-officedocument.wordprocessingml.document']),
  ('private-resources', 'private-resources', false, 26214400,
   array['application/pdf','image/png','image/jpeg',
         'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
on conflict (id) do nothing;

create policy "storage: editors upload" on storage.objects
  for insert to authenticated
  with check (bucket_id in ('public-resources','private-resources')
              and public.has_any_role(array['admin','content_editor']::public.app_role[]));
create policy "storage: editors manage" on storage.objects
  for update to authenticated
  using (bucket_id in ('public-resources','private-resources')
         and public.has_any_role(array['admin','content_editor']::public.app_role[]));
create policy "storage: editors delete" on storage.objects
  for delete to authenticated
  using (bucket_id in ('public-resources','private-resources')
         and public.has_any_role(array['admin','content_editor']::public.app_role[]));
create policy "storage: staff read private" on storage.objects
  for select to authenticated
  using (bucket_id = 'private-resources'
         and public.has_any_role(array['admin','content_editor','reviewer']::public.app_role[]));
