import {MenuStore} from "./types";

export const selectMenuOpen = (s: MenuStore) => s.menuOpen;
export const selectToggleMenu = (s: MenuStore) => s.toggleMenu;

export const selectSelectedMenuItem = (s: MenuStore) => s.selectedMenuItem;
export const selectSetSelectedMenuItem = (s: MenuStore) =>
  s.setSelectedMenuItem;
