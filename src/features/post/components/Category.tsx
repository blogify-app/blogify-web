import {Badge} from "@/components/shadcn-ui/badge";
import {FC} from "react";

interface CategoryProps extends React.HTMLAttributes<HTMLElement> {
  "data-testid": string;
}

export const Category: FC<CategoryProps> = ({
  children,
  ...props
}: CategoryProps) => {
  return <Badge {...props}>{children}</Badge>;
};
