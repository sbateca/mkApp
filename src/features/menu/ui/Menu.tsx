import {Divider, Drawer, List} from "@mui/material";

import {MenuStyle} from "./MenuStyle";
import {MenuProps} from "./MenuProps";
import {MenuItemButton} from "./MenuItemButton";

import {MENU_WIDTH} from "../../../utils/constants/pages";
import {HeaderMenu} from "./StyleHeaderMenu";
import {useMenu} from "../model/useMenu";

export const Menu = ({menuItems}: MenuProps): React.ReactElement => {
  const {menuOpen, toggleMenu, getSelectedMenuItem, navigate} = useMenu();

  return (
    <Drawer
      anchor="left"
      open={menuOpen}
      onClose={toggleMenu}
      variant="persistent"
      data-testid="mainMenu"
      sx={{
        width: MENU_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: MENU_WIDTH,
          boxSizing: "border-box",
        },
      }}
    >
      <HeaderMenu onClick={toggleMenu} />
      <Divider />
      <List sx={MenuStyle} data-testid="menuList">
        {menuItems.map((item) => (
          <MenuItemButton
            key={item.label}
            item={item.label}
            selected={getSelectedMenuItem() === item.label}
            onClick={() => {
              navigate(item.actionPath);
            }}
          />
        ))}
      </List>
    </Drawer>
  );
};
