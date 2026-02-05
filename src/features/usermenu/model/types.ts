export type UserMenuState = {
  username: string;
  anchorEl: null | HTMLElement;
};

export type UserMenuActions = {
  handleMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: () => void;
  handleLogout: () => void;
};

export type UserMenuStore = UserMenuState & UserMenuActions;
