import {Toolbar, IconButton, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import {HeaderProps} from "./Type";
import {UserMenu} from "../../../features/usermenu";

import {useHeaderUser} from "../model/useHeader";
import {
  selectMenuOpen,
  selectToggleMenu,
  useMenuStore,
} from "../../../features/menu";
import {StyledHeaderAppBar} from "./StyledHeaderAppBar";

export const Header = ({companyName}: HeaderProps): React.ReactElement => {
  const {username, showUserMenu} = useHeaderUser();
  const toggleMenu = useMenuStore(selectToggleMenu);
  const menuOpen = useMenuStore(selectMenuOpen);

  return (
    <StyledHeaderAppBar position="fixed" open={menuOpen} data-testid="header">
      <Toolbar data-testid="toolBar">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleMenu}
          data-testid="toggleMainMenu"
          sx={{mr: 2, ...(menuOpen && {display: "none"})}}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>
          {companyName}
        </Typography>

        {showUserMenu ? <UserMenu username={username} /> : null}
      </Toolbar>
    </StyledHeaderAppBar>
  );
};
