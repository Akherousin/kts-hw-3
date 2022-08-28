import React from "react";
import "./Button.css";
import classNames from "classnames";
import { Loader } from "../Loader/Loader";

export enum ButtonColor {
  primary = "primary",
  secondary = "secondary",
}

export type ButtonProps = React.PropsWithChildren<{
  loading?: boolean;
  color?: ButtonColor;
  className?: string;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  loading = false,
  color = ButtonColor.primary,
  children,
  className,
  ...rest
}: ButtonProps): JSX.Element {
  let { disabled } = rest;
  if (loading) disabled = true;

  const buttonClass = classNames(
    "button",
    className,
    `button_color-${color}`,
    `${(disabled ?? false) || loading ? "button_disabled" : ""}`
  );

  return (
    <button disabled={disabled} className={buttonClass} {...rest}>
      {loading && <Loader />}
      {children}
    </button>
  );
}
