import {SharedMenuItems} from "../../enums";
import {BaseRoutes} from "../baseRoutes";

export const COMPANY_NAME = "Microlab App";
export const MENU_ITEMS = [
  {label: SharedMenuItems.SAMPLES, actionPath: BaseRoutes.SAMPLES},
  {label: SharedMenuItems.REPORTS, actionPath: BaseRoutes.REPORTS},
];
export const USER_MENU_LOGOUT = "Logout";
export const MENU_WIDTH = 250;
