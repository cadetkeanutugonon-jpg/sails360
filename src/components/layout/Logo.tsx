import Link from "next/link";

/** Placeholder mark: compass rose. Replace with the official logo when supplied. */
export function CompassMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <circle cx="24" cy="24" r="21" stroke="#F4B41A" strokeWidth="2" />
      <path d="M24 5l5 19-5 19-5-19 5-19z" fill="#F4B41A" />
      <path d="M5 24l19-5 19 5-19 5-19-5z" fill="#1B6CA8" opacity="0.9" />
      <circle cx="24" cy="24" r="3" fill="#0A2342" />
    </svg>
  );
}

export function Logo({ light = true }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5"
      aria-label="SAILS 360 home"
    >
      <CompassMark />
      <span
        className={`font-heading text-xl font-extrabold tracking-tight ${
          light ? "text-white" : "text-navy"
        }`}
      >
        SAILS <span className="text-gold">360</span>
      </span>
    </Link>
  );
}
