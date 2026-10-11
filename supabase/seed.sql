-- SAILS 360 seed data. Run after the migration.
-- Pillars and program titles are official. Sample rows are marked is_demo = true.

insert into public.pillars (slug, title, tagline, sort_order) values
  ('academics', 'Academics', 'Learn together, pass together.', 1),
  ('leadership', 'Leadership', 'Lead with responsibility.', 2),
  ('welfare', 'Welfare', 'No student left behind.', 3),
  ('camaraderie', 'Camaraderie', 'One crew, one BSMT family.', 4),
  ('maritime-excellence', 'Maritime Excellence', 'Raise the standard.', 5)
on conflict (slug) do nothing;

-- Pillar mapping is an assumption (see README). Confirm with officers.
insert into public.programs (slug, title, pillar_id, status)
select v.slug, v.title, p.id, v.status
from (values
  ('sails-360-student-support',   'SAILS 360 Student Support',     'welfare',             'to-be-confirmed'),
  ('sails-academic-network',      'SAILS Academic Network',        'academics',           'to-be-confirmed'),
  ('cadet-mentorship-program',    'Cadet Mentorship Program',      'leadership',          'to-be-confirmed'),
  ('sails-leadership-academy',    'SAILS Leadership Academy',      'leadership',          'to-be-confirmed'),
  ('maritime-excellence-program', 'Maritime Excellence Program',   'maritime-excellence', 'to-be-confirmed'),
  ('sails-career-connect',        'SAILS Career Connect',          'maritime-excellence', 'to-be-confirmed'),
  ('one-bsmt-community',          'One BSMT Community',            'camaraderie',         'to-be-confirmed'),
  ('student-recognition-program', 'Student Recognition Program',   'camaraderie',         'to-be-confirmed'),
  ('sails-digital-hub',           'SAILS Digital Hub',             'academics',           'active'),
  ('sails-transparency',          'SAILS Transparency',            'leadership',          'to-be-confirmed')
) as v (slug, title, pillar_slug, status)
join public.pillars p on p.slug = v.pillar_slug
on conflict (slug) do nothing;

-- DEMONSTRATION CONTENT. Fictional. Delete before going live (see README).
insert into public.announcements (slug, title, category, excerpt, body, status, is_demo, published_at) values
  ('demo-welcome-to-sails-360', 'Welcome to the SAILS 360 site', 'General',
   'Sample announcement showing how updates will appear here.',
   'Demonstration content. Real announcements appear only after an authorized editor publishes them.',
   'published', true, now());

insert into public.events (slug, title, category, summary, starts_at, status, is_demo) values
  ('demo-orientation-session', 'Sample orientation session', 'Orientation',
   'Demonstration event. Not a confirmed activity.',
   '2026-11-05 09:00:00+08', 'published', true);
