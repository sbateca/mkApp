import {SharedMenuItems} from "../../../utils/enums";

type MenuItem = {
  label: SharedMenuItems;
  actionPath: string;
};
export interface MenuProps {
  menuItems: MenuItem[];
}
