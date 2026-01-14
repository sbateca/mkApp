import {UserMenuStore} from "./types";

export const selectUsername = (s: UserMenuStore) => s.username;
export const selectAnchorEl = (s: UserMenuStore) => s.anchorEl;
export const selectHandleMenu = (s: UserMenuStore) => s.handleMenu;
export const selectHandleClose = (s: UserMenuStore) => s.handleClose;
export const selectHandleLogout = (s: UserMenuStore) => s.handleLogout;
