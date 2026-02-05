import {SharedMenuItems} from "../../../utils/enums";

export type MenuState = {
  menuOpen: boolean;
  selectedMenuItem: SharedMenuItems;
};

export type MenuActions = {
  toggleMenu: () => void;
  openMenu: () => void;
  closeMenu: () => void;
  setSelectedMenuItem: (item: SharedMenuItems) => void;
};

export type MenuStore = MenuState & MenuActions;
