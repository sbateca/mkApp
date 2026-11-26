import {useInterfaceTranslation} from "../../../shared/i18n/useInterfaceTranslation";
import {List, useMediaQuery} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import {CSSObject, styled, Theme} from "@mui/material/styles";

import {MenuStyle} from "./MenuStyle";
import {MenuProps} from "./MenuProps";
import {MenuItemButton} from "./MenuItemButton";

import {MENU_WIDTH} from "../../../utils/constants/pages";
import {HeaderMenu} from "./StyleHeaderMenu";
import {useMenu} from "../model/useMenu";

const openedMixin = (theme: Theme): CSSObject => ({
  width: MENU_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({theme, open}) => ({
  width: MENU_WIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& > .MuiDrawer-paper": {
    top: 48,
    height: "calc(100% - 48px)",
    borderColor: theme.palette.divider,
  },
  ...(open && {
    ...openedMixin(theme),
    [theme.breakpoints.down("md")]: closedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const Menu = ({menuItems}: MenuProps): React.ReactElement => {
  const {t} = useInterfaceTranslation();
  const {menuOpen, closeMenu, isSelectedMenuItem, navigate} = useMenu();
  const isDesktop = useMediaQuery("(min-width:900px)");

  return (
    <Drawer
      anchor="left"
      open={menuOpen}
      variant="permanent"
      data-testid="mainMenu"
    >
      <HeaderMenu onClick={closeMenu} open={menuOpen} />
      <List
        component="nav"
        id="main-navigation"
        aria-label={t("Main navigation")}
        sx={MenuStyle}
        data-testid="menuList"
      >
        {menuItems.map((item) => (
          <MenuItemButton
            key={item.label}
            item={item.label}
            icon={item.icon}
            open={menuOpen}
            selected={isSelectedMenuItem(item.actionPath)}
            onClick={() => {
              navigate(item.actionPath);
              if (!isDesktop) closeMenu();
            }}
          />
        ))}
      </List>
    </Drawer>
  );
};
