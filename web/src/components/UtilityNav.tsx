import Link from "next/link";
import { utilityLinks } from "@/data/mock";

function Icon({ kind }: { kind: (typeof utilityLinks)[number]["icon"] }) {
  const common = "size-3.5";
  switch (kind) {
    case "radio":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M4 7h16a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2zm8 11a3 3 0 100-6 3 3 0 000 6zM7 4l9 3H7V4z" />
        </svg>
      );
    case "calendar":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M7 2h2v2h6V2h2v2h3a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h3V2zm13 8H4v10h16V10z" />
        </svg>
      );
    case "bank":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M3 10l9-7 9 7v2H3v-2zm2 3h2v6H5v-6zm5 0h2v6h-2v-6zm5 0h2v6h-2v-6zM3 21h18v2H3v-2z" />
        </svg>
      );
    case "unicode":
      return <span className="text-[11px] font-bold leading-none">अ</span>;
    case "market":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M3 17l6-6 4 4 8-9 1.5 1.3-9.5 10.7-4-4L4.5 18.5 3 17z" />
        </svg>
      );
    case "horoscope":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2z" />
        </svg>
      );
    case "cinema":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M3 5h18v14H3V5zm4 2v2h2V7H7zm0 4v2h2v-2H7zm0 4v2h2v-2H7zm8-8v2h2V7h-2zm0 4v2h2v-2h-2zm0 4v2h2v-2h-2z" />
        </svg>
      );
    case "election":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M7 2h10v4H7V2zm-2 6h14v14H5V8zm4 3v8h2v-8H9zm4 0v8h2v-8h-2z" />
        </svg>
      );
    case "rate":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2l2.9 6.9L22 10l-5 4.4L18.2 22 12 18.3 5.8 22 7 14.4 2 10l7.1-1.1L12 2z" />
        </svg>
      );
  }
}

export function UtilityNav() {
  return (
    <div className="bg-[#f3f4f6] text-primary border-b border-line">
      <div className="container-xl overflow-x-auto">
        <ul className="flex items-center gap-1 min-w-max px-1 py-2 text-sm font-semibold">
          {utilityLinks.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:bg-white transition"
              >
                <span className="inline-grid place-items-center size-6 rounded-full bg-primary text-white">
                  <Icon kind={item.icon} />
                </span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
