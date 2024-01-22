import {FC} from "react";

type InlineMenuProps = {
  action: Function;
};

export const InlineMenu: FC<InlineMenuProps> = ({action}) => {
  return (
    <div className="px-24">
      <ul className="flex justify-between p-2 text-sm font-bold">
        <li onClick={() => action()}>Publications</li>
        <li>Abonne(e)s</li>
        <li>Favoris(s)</li>
        <li>Badge(s)</li>
      </ul>
    </div>
  );
};
