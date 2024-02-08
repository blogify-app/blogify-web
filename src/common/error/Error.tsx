import {FC, ReactNode} from "react";

type ErrorProps = {
  others: ReactNode;
  children: ReactNode;
  message: string;
};

export const Error: FC<ErrorProps> = ({others, message, children}) => {
  return (
    <div>
      <div>{children}</div>
      <div data-testid="missing-post-message">{message}</div>
      <div>{others}</div>
    </div>
  );
};
