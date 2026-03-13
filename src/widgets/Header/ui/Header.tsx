import {AppBar, Toolbar, IconButton, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import {HeaderProps} from "./Type";
import {UserMenu} from "../../../features/usermenu";

import {useHeaderUser} from "../model/useHeader";
import {selectToggleMenu, useMenuStore} from "../../../features/menu";

export const Header = ({companyName}: HeaderProps): React.ReactElement => {
  const {username, userMenu} = useHeaderUser();
  const toggleMenu = useMenuStore(selectToggleMenu);
  return (
    <AppBar position="fixed" data-testid="header">
      <Toolbar data-testid="toolBar">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleMenu}
          data-testid="toggleMainMenu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">{companyName}</Typography>
        {userMenu ? <UserMenu username={username} /> : null}
      </Toolbar>
    </AppBar>
  );
};
