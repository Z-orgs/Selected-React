import React from "react";
import { useController } from "react-hook-form";

const Input = ({
  name = "",
  type = "text",
  children,
  hasIcon = "false",
  control,
  error = "",
  className,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <div>
      <div className="relative">
        <input
          type={type}
          id={name}
          {...field}
          {...props}
          className={`w-full p-2 text-[16px] bg-transparent border-2 rounded-xl outline-none ${
            children ? "pr-10" : ""
          } ${className}`}
        />
        {children && (
          <span className="absolute cursor-pointer select-none top-2/4 -translate-y-2/4 right-3">
            {children}
          </span>
        )}
      </div>
      <span className="text-sm text-red-500">{error}</span>
    </div>
  );
};

export default Input;
