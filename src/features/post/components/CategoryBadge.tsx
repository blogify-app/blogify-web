import {Badge} from "@/components/shadcn-ui/badge";
import {toHex} from "@/lib/string_to_color";
import {FC} from "react";

interface CategoryProps extends React.HTMLAttributes<HTMLElement> {
  "data-testid": string;
}

export const CategoryBadge: FC<CategoryProps> = ({
  className,
  children,
  ...props
}: CategoryProps) => {
  const backgroundColor = toHex(children as string);
  return (
    <Badge {...props} className={`bg-${backgroundColor} ${className}`}>
      {children}
    </Badge>
  );
};
