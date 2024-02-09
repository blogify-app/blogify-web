import React from "react";
import {
  Button as _Button,
  ButtonProps as _ButtonProps,
} from "@/components/shadcn-ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {Icons} from "@/components/common/icons.tsx";

export interface ButtonProps extends _ButtonProps {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, isLoading, children, ...props}, ref) => {
    return (
      <_Button
        disabled={isLoading}
        className={cn(className, "relative")}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <Icons.spinner className="absolute bottom-0 left-0 right-0 top-0 m-auto h-6 w-6 animate-spin" />
        ) : (
          children
        )}
      </_Button>
    );
  }
);
Button.displayName = "Button";

export {Button};
