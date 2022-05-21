import classNames from "classnames";
import { ErrorMessage, Field, FieldAttributes } from "formik";
import React, { useState } from "react";
import { Eye } from "./icons/Eye";
import { EyeSlash } from "./icons/EyeSlash";

export const Input: React.FC<FieldAttributes<{}>> = ({
  className,
  type,
  ...props
}) => {
  const [hidden, setHidden] = useState(true);
  const isPassword = type === "password";

  return (
    <div className="w-full">
      <div className="before:border-default-foreground bg-input-background relative w-full overflow-hidden rounded-lg before:absolute before:inset-x-0 before:bottom-0 before:z-10 focus-within:before:border-b">
        <Field
          className={classNames(
            "w-full bg-transparent px-2.5 py-1.5 focus:outline-none",
            className,
            { "pr-8": isPassword },
          )}
          {...props}
          type={isPassword ? (hidden ? "password" : "text") : type}
        />

        {isPassword && (
          <button
            type="button"
            className="absolute top-1/2 right-2 -translate-y-1/2 transform"
            onClick={() => setHidden(!hidden)}
          >
            {hidden ? (
              <Eye className="w-4.5" />
            ) : (
              <EyeSlash className="w-4.5" />
            )}
          </button>
        )}
      </div>

      <ErrorMessage
        name={props.name}
        component="div"
        className="mt-1 text-center text-xs text-[#ff2c2c]"
      />
    </div>
  );
};
