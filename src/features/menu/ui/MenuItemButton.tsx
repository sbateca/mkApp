import {ListItemButton} from "../../../shared/ui";
import {SharedMenuItemIcons, SharedMenuItems} from "../../../utils/enums";
import {getMenuIcon} from "../../../utils/icons";

type MenuItemButtonProps = {
  item: SharedMenuItems;
  icon?: SharedMenuItemIcons;
  open: boolean;
  selected: boolean;
  onClick?: () => void;
};

export const MenuItemButton = ({
  item,
  icon,
  open,
  selected,
  onClick,
}: MenuItemButtonProps) => {
  return (
    <ListItemButton
      label={item}
      icon={getMenuIcon(icon)}
      open={open}
      selected={selected}
      onClick={onClick}
    />
  );
};
