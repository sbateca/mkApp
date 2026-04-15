import {MenuStore} from "./types";

export const selectMenuOpen = (s: MenuStore) => s.menuOpen;
export const selectToggleMenu = (s: MenuStore) => s.toggleMenu;
export const selectOpenMenu = (s: MenuStore) => s.openMenu;
