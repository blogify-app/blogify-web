import {FC, ReactNode} from "react";

type ButtonProps = {
  label: string;
  children: ReactNode;
  classNameAttr: string;
};

export const Button: FC<ButtonProps> = ({children, classNameAttr, label}) => {
  return (
    <button className={classNameAttr}>
      {children}
      <span>{label}</span>
    </button>
  );
};
