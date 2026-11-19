"use client";

import { useId, useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import { site } from "@/content/site";

const { footer, microcopy } = site;

type Status = "idle" | "success" | "error";

/**
 * Newsletter block — the real `#newsletter` target for the nav, the Sunday
 * Brief card and the closing CTA. The surrounding card belongs to the footer;
 * this component owns only the label, heading, field, button and status line.
 *
 * No endpoint exists yet (copy file section 14 needed item 6), so the submit is
 * client-side only: it validates the address and shows the copy file's success
 * or error line. Wire `handleSubmit` to the newsletter tool when one is chosen.
 */
export default function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const inputId = useId();
  const statusId = useId();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    setStatus(valid ? "success" : "error");
  }

  const message =
    status === "success"
      ? microcopy.subscribeSuccess
      : status === "error"
        ? microcopy.subscribeError
        : "";

  return (
    <section id="newsletter" aria-labelledby="footer-newsletter-title">
      <div className="flex flex-col gap-[clamp(18px,2vw,28px)] md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-footer-link">
            {footer.newsletter.label}
          </p>
          <h2
            id="footer-newsletter-title"
            className="mt-[6px] font-serif text-[clamp(20px,1.7vw,26px)] leading-[1.15] text-ink"
          >
            {footer.newsletter.title}
          </h2>
        </div>

        <form onSubmit={handleSubmit} noValidate className="w-full md:w-auto">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <label htmlFor={inputId} className="sr-only">
              Email address
            </label>
            <input
              id={inputId}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder={microcopy.subscribePlaceholder}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (status !== "idle") setStatus("idle");
              }}
              aria-describedby={statusId}
              className="h-11 w-full min-w-0 rounded-[3px] border border-muted bg-surface px-4 text-[13px] text-ink transition-colors duration-200 placeholder:text-quiet focus-visible:border-quiet sm:flex-1 md:w-[clamp(210px,24vw,300px)] md:flex-none"
            />
            <Button
              type="submit"
              variant="solid-dark"
              className="h-11 w-full shrink-0 px-5 text-[12.5px] hover:bg-ink/90 sm:w-auto"
            >
              {microcopy.subscribeButton}
            </Button>
          </div>
          {/* Reserved line so the card never jumps when the message appears. */}
          <p
            id={statusId}
            role="status"
            aria-live="polite"
            className={`mt-2 min-h-4 text-[12px] leading-4 ${
              status === "error" ? "text-ink" : "text-quiet"
            }`}
          >
            {message}
          </p>
        </form>
      </div>
    </section>
  );
}
