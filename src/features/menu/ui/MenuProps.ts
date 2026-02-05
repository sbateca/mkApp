import {SharedMenuItems} from "../../../utils/enums";

export interface MenuItemProps {
  label: SharedMenuItems;
}

export interface MenuProps {
  menuItems: MenuItemProps[];
}
