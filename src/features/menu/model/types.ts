export type MenuState = {
  menuOpen: boolean;
};

export type MenuActions = {
  toggleMenu: () => void;
  openMenu: () => void;
  closeMenu: () => void;
};

export type MenuStore = MenuState & MenuActions;
