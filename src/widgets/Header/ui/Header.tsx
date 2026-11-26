import {useInterfaceTranslation} from "../../../shared/i18n/useInterfaceTranslation";
import {Toolbar, IconButton, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import {HeaderProps} from "./Type";
import {LanguageSelect} from "../../../features/language/ui/LanguageSelect";
import {UserMenu} from "../../../features/usermenu";

import {useHeaderUser} from "../model/useHeader";
import {
  selectMenuOpen,
  selectToggleMenu,
  useMenuStore,
} from "../../../features/menu";
import {StyledHeaderAppBar} from "./StyledHeaderAppBar";

export const Header = ({companyName}: HeaderProps): React.ReactElement => {
  const {t} = useInterfaceTranslation();
  const {username, showUserMenu} = useHeaderUser();
  const toggleMenu = useMenuStore(selectToggleMenu);
  const menuOpen = useMenuStore(selectMenuOpen);

  return (
    <StyledHeaderAppBar position="fixed" data-testid="header">
      <Toolbar data-testid="toolBar">
        <IconButton
          edge="start"
          color="inherit"
          aria-label={t(menuOpen ? "Collapse menu" : "Expand menu")}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={toggleMenu}
          data-testid="toggleMainMenu"
          sx={{mr: {xs: 0.5, sm: 2}, flexShrink: 0}}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flex: "1 1 0",
            minWidth: 0,
            mr: 1,
            fontSize: "0.9rem",
            fontWeight: 700,
          }}
        >
          {companyName}
        </Typography>

        <LanguageSelect compact />
        {showUserMenu && <UserMenu username={username} />}
      </Toolbar>
    </StyledHeaderAppBar>
  );
};
