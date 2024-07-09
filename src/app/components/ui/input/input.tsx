import { forwardRef } from "react";
import styles from "./input.module.scss";
import classNames from "classnames";

type InputProps = {
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
  width: number | string;
  height: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
};

const Input = forwardRef(function Input(
  {
    disabled = false,
    readOnly = false,
    error,
    width,
    height,
    onChange,
    onKeyDown,
    onMouseDown,
    onBlur,
    ...rest
  }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof onChange === "function") {
      onChange(e);
    }
  };

  return (
    <div
      className={classNames(
        styles.Input,
        error ? styles[`${error}`] : "",
        readOnly ? `${styles.readOnly}` : ""
      )}
      style={{ width: `${width}`, height: `${height}` }}
    >
      <input
        ref={ref}
        disabled={disabled}
        readOnly={readOnly}
        onChange={handleChangeValue}
        {...rest}
      />
    </div>
  );
});

export default Input;
