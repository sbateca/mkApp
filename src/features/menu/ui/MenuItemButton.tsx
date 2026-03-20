import {ListItemButton} from "../../../shared/ui";
import {useMenuItemButton} from "../model/useMenuItemButton";
import {MenuItemButtonProps} from "./MenuItemButtonProps";

export const MenuItemButton = ({item}: MenuItemButtonProps) => {
  const {selected, onClick} = useMenuItemButton(item);
  return (
    <ListItemButton
      label={item}
      selected={selected === item}
      onClick={onClick}
    />
  );
};
