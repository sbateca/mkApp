import {IconButton, Menu, MenuItem, Typography} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";

import {USER_MENU_LOGOUT} from "../../../utils/constants";
import {UserMenuStyle} from "./UserMenuStyle";
import {useUserMenuStore} from "../model/store";
import {
  selectHandleMenu,
  selectHandleClose,
  selectHandleLogout,
  selectAnchorEl,
} from "../model/selectors";

type Props = {
  username: string;
};

export const UserMenu = ({username}: Props): React.ReactElement => {
  const handleUserMenu = useUserMenuStore(selectHandleMenu);
  const handleClose = useUserMenuStore(selectHandleClose);
  const handleLogout = useUserMenuStore(selectHandleLogout);
  const anchorElement = useUserMenuStore(selectAnchorEl);

  return (
    <div style={UserMenuStyle}>
      <Typography>{username}</Typography>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        onClick={handleUserMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElement}
        open={Boolean(anchorElement)}
        onClose={handleClose}
        keepMounted
      >
        <MenuItem onClick={handleLogout}>{USER_MENU_LOGOUT}</MenuItem>
      </Menu>
    </div>
  );
};
