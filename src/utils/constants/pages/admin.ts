import {SharedMenuItemIcons, SharedMenuItems} from "../../enums";
import {BaseRoutes} from "../baseRoutes";

export const COMPANY_NAME = "Microlab App";
export const MENU_ITEMS = [
  {
    label: SharedMenuItems.CLIENTS,
    actionPath: BaseRoutes.CLIENTS,
    icon: SharedMenuItemIcons.CLIENTS,
  },
  {
    label: SharedMenuItems.SAMPLE_TYPES,
    actionPath: BaseRoutes.SAMPLE_TYPES,
    icon: SharedMenuItemIcons.SAMPLE_TYPES,
  },
  {
    label: SharedMenuItems.ANALYTES,
    actionPath: BaseRoutes.ANALYTES,
    icon: SharedMenuItemIcons.ANALYTES,
  },
  {
    label: SharedMenuItems.ANALYSIS_METHODS,
    actionPath: BaseRoutes.ANALYSIS_METHODS,
    icon: SharedMenuItemIcons.ANALYSIS_METHODS,
  },
  {
    label: SharedMenuItems.CRITERIA,
    actionPath: BaseRoutes.CRITERIAS,
    icon: SharedMenuItemIcons.CRITERIA,
  },
  {
    label: SharedMenuItems.TEST_TYPES,
    actionPath: BaseRoutes.TEST_TYPES,
    icon: SharedMenuItemIcons.TEST_TYPES,
  },
  {
    label: SharedMenuItems.SAMPLES,
    actionPath: BaseRoutes.SAMPLES,
    icon: SharedMenuItemIcons.SAMPLES,
  },
  {
    label: SharedMenuItems.REPORTS,
    actionPath: BaseRoutes.REPORTS,
    icon: SharedMenuItemIcons.REPORTS,
  },
];
export const USER_MENU_LOGOUT = "Logout";
export const MENU_WIDTH = 240;
