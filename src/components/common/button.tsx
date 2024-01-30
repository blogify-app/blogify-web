import React from "react";
import {ReloadIcon} from "@radix-ui/react-icons";
import {
  Button as _Button,
  ButtonProps as _ButtonProps,
} from "@/components/shadcn-ui/button.tsx";

export interface ButtonProps extends _ButtonProps {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, isLoading, children, ...props}, ref) => {
    return (
      <_Button disabled={isLoading} ref={ref} {...props}>
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        {children}
      </_Button>
    );
  }
);
Button.displayName = "Button";

export {Button};
