import clsx from "clsx";
import { forwardRef } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { hasError, className, ...inputProps } = props;

  return (
    <input
      ref={ref}
      placeholder="Nome de usuário"
      className={clsx(
        `p-1 px-2 border rounded-md outline-0 text-lg disabled:opacity-60 ${
          hasError
            ? "border-red-400 placeholder:text-red-400 text-red-400"
            : "border-gray-400"
        }`,
        className
      )}
      {...inputProps}
    />
  );
});
