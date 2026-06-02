import {ListItemButton} from "../../../shared/ui";
import {SharedMenuItemIcons, SharedMenuItems} from "../../../utils/enums";
import {getMenuIcon} from "../../../utils/icons";

type MenuItemButtonProps = {
  item: SharedMenuItems;
  icon?: SharedMenuItemIcons;
  selected: boolean;
  onClick?: () => void;
};

export const MenuItemButton = ({
  item,
  icon,
  selected,
  onClick,
}: MenuItemButtonProps) => {
  return (
    <ListItemButton
      label={item}
      icon={getMenuIcon(icon)}
      selected={selected}
      onClick={onClick}
    />
  );
};
