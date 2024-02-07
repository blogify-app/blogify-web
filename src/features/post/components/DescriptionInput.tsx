import * as React from "react";

import {cn} from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const DescriptionInput = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({className, ...props}, ref) => {
    return (
      <textarea
        className={cn(
          "text-md flex min-h-[80px] w-full rounded-md border bg-background px-3 py-2 placeholder:text-muted-foreground focus-visible:border focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
DescriptionInput.displayName = "DescriptionInput";

export {DescriptionInput};
