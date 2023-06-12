import React from "react";
import { useController } from "react-hook-form";

const Input = ({
  name = "",
  type = "text",
  children,
  hasIcon = "false",
  control,
  defaultValue,
  error = "",
  className,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: defaultValue || "",
  });
  return (
    <div>
      <div className="relative">
        <input
          type={type}
          id={name}
          {...field}
          {...props}
          className={`w-full p-2 text-[16px] bg-transparent border-2 rounded-xl outline-none focus:border-[#FA58B6] border-[#7A0BC0] text-white ${
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
