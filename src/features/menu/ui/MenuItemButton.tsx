import {ListItemButton} from "../../../shared/ui";
import {SharedMenuItems} from "../../../utils/enums";

type MenuItemButtonProps = {
  item: SharedMenuItems;
  selected: boolean;
  onClick?: () => void;
};

export const MenuItemButton = ({
  item,
  selected,
  onClick,
}: MenuItemButtonProps) => {
  return <ListItemButton label={item} selected={selected} onClick={onClick} />;
};
