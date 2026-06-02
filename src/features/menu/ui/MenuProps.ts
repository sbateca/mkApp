import {SharedMenuItemIcons, SharedMenuItems} from "../../../utils/enums";

type MenuItem = {
  label: SharedMenuItems;
  actionPath: string;
  icon?: SharedMenuItemIcons;
};
export interface MenuProps {
  menuItems: MenuItem[];
}
