import {useInterfaceTranslation} from "../../../shared/i18n/useInterfaceTranslation";
import {IconButton, Menu, MenuItem, Typography} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";

import {USER_MENU_LOGOUT} from "../../../utils/constants";
import {UserMenuStyle} from "./UserMenuStyle";
import {useUserMenuStore} from "../model/store";
import {
  selectHandleMenu,
  selectHandleClose,
  selectAnchorEl,
} from "../model/selectors";
import {useUserMenu} from "../model/useUserMenu";

type Props = {
  username: string;
};

export const UserMenu = ({username}: Props): React.ReactElement => {
  const {t} = useInterfaceTranslation();
  const handleUserMenu = useUserMenuStore(selectHandleMenu);
  const handleClose = useUserMenuStore(selectHandleClose);
  const anchorElement = useUserMenuStore(selectAnchorEl);

  const {handleLogout} = useUserMenu();

  return (
    <div style={UserMenuStyle}>
      <Typography noWrap>{username}</Typography>
      <IconButton
        size="large"
        aria-label={t("account of current user")}
        aria-controls={anchorElement ? "menu-appbar" : undefined}
        aria-haspopup="menu"
        aria-expanded={Boolean(anchorElement)}
        onClick={handleUserMenu}
        color="inherit"
        sx={{flexShrink: 0}}
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
        <MenuItem onClick={handleLogout}>{t(USER_MENU_LOGOUT)}</MenuItem>
      </Menu>
    </div>
  );
};
