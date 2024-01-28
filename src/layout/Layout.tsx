import {FC, PropsWithChildren, ReactNode} from "react";
import {NavBar} from "@/layout";
import {clsx} from "clsx";

type LayoutComponent = PropsWithChildren<{
  fixed: boolean;
}>;

const HeaderWrapper: FC<LayoutComponent> = ({children, fixed}) => {
  return (
    <div
      className={clsx("h-[4.5rem] w-full border-b border-b-gray-200", {
        "fixed left-0 top-0": fixed,
      })}
    >
      {children}
    </div>
  );
};

const MainWrapper: FC<LayoutComponent> = ({children, fixed}) => {
  return (
    <div
      className={clsx({
        "mt-[4.5rem]": fixed,
      })}
      style={{
        height: "calc(100vh - 4.5rem)",
      }}
    >
      {children}
    </div>
  );
};

export interface LayoutProps {
  header?: ReactNode;
  // main panel
  children: ReactNode;
  /**
   * Should header be "fixed" or not.
   *
   * default to true
   */
  fixed?: boolean;
}

export const Layout: FC<LayoutProps> = ({
  children,
  fixed = true,
  header = <NavBar />,
}) => {
  return (
    <>
      <HeaderWrapper fixed={fixed}>{header}</HeaderWrapper>
      <MainWrapper fixed={fixed}>{children}</MainWrapper>
    </>
  );
};
