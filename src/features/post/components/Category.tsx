import {Badge} from "@/components/shadcn-ui/badge";
import { toHex } from "@/lib/string_to_color";
import {FC} from "react";

interface CategoryProps extends React.HTMLAttributes<HTMLElement> {
  "data-testid": string;
}

export const CategoryBadge: FC<CategoryProps> = ({
  children,
  className,
  ...props
}: CategoryProps) => {
  const categoryBackground = toHex(children as string);
  return <Badge {...props} className={`bg-${categoryBackground} ${className}`}>{children}</Badge>;
};
