import React from "react";

import {cn} from "@/lib/utils";

export interface TitleInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const TitleInput = React.forwardRef<HTMLInputElement, TitleInputProps>(
  ({className, type, ...props}, ref) => {
    return (
      <input
        {...props}
        type="text"
        spellCheck={false}
        className={cn(
          "flex h-10 w-1/2 rounded-md px-3 py-2 text-xl text-muted-foreground placeholder:text-muted-foreground focus-visible:border focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
      />
    );
  }
);
TitleInput.displayName = "TitleInput";

export {TitleInput};
