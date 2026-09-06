'use client';

/** Skip link — focuses the main landmark and returns to the top, as in the source site. */
export function SkipLink() {
  return (
    <button
      className="skip"
      id="skip"
      onClick={(e) => {
        e.preventDefault();
        const app = document.getElementById('app');
        app?.focus();
        window.scrollTo(0, 0);
      }}
    >
      Skip to content
    </button>
  );
}
