import {useEffect, useState} from "react";

import {AppBar, Toolbar, IconButton, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import {localStorageToUser} from "../../../adapters/user";
import {UserMenu} from "../UserMenu";
import {HeaderProps} from "./Type";
import {LOCAL_STORAGE_USER_KEY} from "../../../utils/constants";
import {useMenuStore} from "../../../features/menu/model/store";
import {selectToggleMenu} from "../../../features/menu/model/selectors";

export const Header = ({companyName}: HeaderProps): React.ReactElement => {
  const toogleMenu = useMenuStore(selectToggleMenu);
  const [username, setUsername] = useState("");
  const [userMenu, setUserMenu] = useState(false);

  useEffect(() => {
    const user = localStorageToUser(
      localStorage.getItem(LOCAL_STORAGE_USER_KEY),
    );
    if (user) {
      setUsername(user?.name);
      setUserMenu(true);
    }
  }, []);

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
        {userMenu ? <UserMenu username={username} /> : null}
      </Toolbar>
    </AppBar>
  );
};
