import {Drawer, List} from "@mui/material";

import {useMenuStore} from "../model/store";
import {selectMenuOpen, selectToggleMenu} from "../model/selectors";
import {MenuStyle} from "./MenuStyle";
import {MenuProps} from "./MenuProps";
import {MenuItemButton} from "./MenuItemButton";

export const MenuDrawer = ({menuItems}: MenuProps): React.ReactElement => {
  const menuOpen = useMenuStore(selectMenuOpen);
  const toggleMenu = useMenuStore(selectToggleMenu);

  return (
    <Drawer
      anchor="left"
      open={menuOpen}
      onClose={toggleMenu}
      data-testid="mainMenu"
    >
      <List sx={MenuStyle} data-testid="menuList">
        {menuItems.map((item) => (
          <MenuItemButton key={item.label} item={item.label} />
        ))}
      </List>
    </Drawer>
  );
};
