import {AppBar, Toolbar, IconButton, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import {HeaderProps} from "./Type";
import {selectToggleMenu, useMenuStore} from "../../../features/menu";
import {
  selectAnchorEl,
  selectHandleClose,
  selectHandleLogout,
  selectHandleMenu,
  useUserMenuStore,
} from "../../../features/usermenu";

import {UserMenu} from "../../../components/molecules";
import {useHeaderUser} from "../model/useHeader";

export const Header = ({companyName}: HeaderProps): React.ReactElement => {
  const toogleMenu = useMenuStore(selectToggleMenu);
  const handleUserMenu = useUserMenuStore(selectHandleMenu);
  const handleClose = useUserMenuStore(selectHandleClose);
  const handleLogout = useUserMenuStore(selectHandleLogout);
  const anchorElement = useUserMenuStore(selectAnchorEl);

  const {username, userMenu} = useHeaderUser();

  return (
    <AppBar position="fixed" data-testid="header">
      <Toolbar data-testid="toolBar">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toogleMenu}
          data-testid="toggleMainMenu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">{companyName}</Typography>
        {userMenu ? (
          <UserMenu
            username={username}
            anchorEl={anchorElement}
            handleMenu={handleUserMenu}
            handleClose={handleClose}
            handleLogout={handleLogout}
          />
        ) : null}
      </Toolbar>
    </AppBar>
  );
};
