import styles from "./Input.module.scss";
import classNames from "classnames";
import React from "react";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  /** Значение поля */
  value?: string;
  className?: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
};

export function Input({
  value,
  className,
  onChange,
  ...rest
}: InputProps): JSX.Element {
  const { disabled } = rest;
  const inputClass = classNames(
    styles.input,
    className,
    `${disabled ?? false ? "input_disabled" : ""}`
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    onChange(e.target.value);
  }

  return (
    <input
      value={value}
      type="text"
      onChange={handleChange}
      className={inputClass}
      placeholder="Search Cryptocurrency"
      {...rest}
    />
  );
}
