import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "danger";

interface BaseButtonProps {
  variant?: ButtonVariant;
  as?: "button" | "a";
  disabled?: boolean;
}

type ButtonAsButtonProps = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
  };

type ButtonAsAnchorProps = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: "a";
    href: string;
  };

type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

export function Button({
  children,
  variant = "primary",
  as = "button",
  className: propClassName,
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = "px-4 py-2 rounded-md transition-colors duration-200";
  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "bg-amber-500 hover:bg-amber-600 text-amber-950 dark:bg-amber-600 dark:hover:bg-amber-700 dark:text-amber-50",
    secondary:
      "bg-sapphire_blue-200 hover:bg-sapphire_blue-300 text-sapphire_blue-800 dark:bg-sapphire_blue-700 dark:hover:bg-sapphire_blue-600 dark:text-sapphire_blue-50",
    danger:
      "bg-fuschia-500 hover:bg-fuschia-600 text-white dark:bg-fuschia-600 dark:hover:bg-fuschia-700",
  };

  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";
  const className = `${baseClasses} ${variantClasses[variant]} ${disabledClass} ${propClassName || ""}`;

  if (as === "a") {
    const { href, ...restProps } = props as ButtonAsAnchorProps;
    return disabled ? (
      <span className={className} {...restProps}>
        {children}
      </span>
    ) : (
      <Link href={href} className={className} {...restProps}>
        {children}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled}
      className={className}
      {...(props as ButtonAsButtonProps)}
    >
      {children}
    </button>
  );
}
