import {IconButton, Menu, MenuItem, Typography} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";

import {USER_MENU_LOGOUT} from "../../../utils/constants";
import {UserMenuStyle} from "./UserMenuStyle";

type Props = {
  username: string;
  handleMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: () => void;
  handleLogout: () => void;
  anchorEl: null | HTMLElement;
};

export const UserMenu = ({
  username,
  anchorEl,
  handleMenu,
  handleClose,
  handleLogout,
}: Props): React.ReactElement => {
  return (
    <div style={UserMenuStyle}>
      <Typography>{username}</Typography>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        <MenuItem onClick={handleLogout}>{USER_MENU_LOGOUT}</MenuItem>
      </Menu>
    </div>
  );
};
