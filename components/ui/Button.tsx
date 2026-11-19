import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "glass" | "solid-light" | "solid-white" | "solid-dark" | "outline-light";
export type ButtonSize = "md" | "nav" | "hero" | "cta";

const variantClasses: Record<ButtonVariant, string> = {
  /* Dark smoked glass — exact styles come from .glass-dark in globals.css */
  glass: "glass-dark",
  "solid-light": "bg-btn-light text-ink border border-line",
  /* White fill on a light panel: the closing CTA's second button. */
  "solid-white": "bg-surface text-ink border border-line",
  "solid-dark": "bg-ink text-bg",
  "outline-light": "border border-white/60 text-white bg-transparent",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "h-10 px-5 text-[13px]",
  /* Nav CTA: scales with viewport, same font size as the nav links. */
  nav: "h-[clamp(28px,2vw,38px)] px-[clamp(12px,1vw,18px)] text-[clamp(12px,0.9vw,14px)]",
  /* Hero CTAs: equal width, touching (no gap), radius stays 3px. */
  hero: "h-[clamp(42px,3.3vw,62px)] w-[clamp(150px,16vw,300px)] text-[clamp(14px,1vw,18px)] font-normal",
  /* Closing CTA: a quieter pair, equal width, separated by a small gap. */
  cta: "h-[clamp(42px,3vw,48px)] w-[clamp(148px,16vw,230px)] text-[clamp(13px,0.95vw,15px)] font-normal",
};

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

type ActionProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & { href?: undefined };

type LinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & { href: string };

type ButtonProps = ActionProps | LinkProps;

/**
 * Buttons are near-square: border-radius 3px (motion spec section 0 — overrides
 * the copy file's pills; pills stay reserved for tiny tags/badges).
 *
 * Pass `href` for navigation (renders an <a> — Cmd/Ctrl-click and middle-click
 * work); omit it for actions (renders a <button>).
 */
export default function Button(props: ButtonProps) {
  const { variant = "solid-light", size = "md", className = "", children } = props;
  const classes = `inline-flex items-center justify-center rounded-[3px] font-medium leading-none transition-colors duration-200 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (props.href !== undefined) {
    const { href, variant: _variant, size: _size, className: _className, ...rest } = props;
    void _variant;
    void _size;
    void _className;
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  const { variant: _variant, size: _size, className: _className, type = "button", ...rest } = props;
  void _variant;
  void _size;
  void _className;
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
