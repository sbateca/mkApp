import {Drawer, List} from "@mui/material";

import {ListItemButton} from "../../../shared/ui";
import {MenuStyle} from "./MenuStyle";
import {MenuProps} from "./Types";
import {
  selectMenuOpen,
  selectToggleMenu,
  useMenuStore,
} from "../../../features/menu";

export const Menu = ({menuItems}: MenuProps): React.ReactElement => {
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
        {menuItems.map((item, index) => (
          <ListItemButton key={index} label={item.label} />
        ))}
      </List>
    </Drawer>
  );
};
