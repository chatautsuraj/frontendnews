"use client";

export function BackToTop() {
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-5 right-5 z-50 size-11 rounded-full bg-primary text-white shadow-lg hover:bg-secondary transition grid place-items-center"
    >
      <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 5l7 7h-4v7h-6v-7H5l7-7zm0-3l-2 2h4l-2-2z" />
      </svg>
    </button>
  );
}
