import {useLocation, useNavigate} from "react-router-dom";
import {selectCloseMenu, selectMenuOpen, selectToggleMenu} from "./selectors";
import {useMenuStore} from "./store";

export const useMenu = () => {
  const menuOpen = useMenuStore(selectMenuOpen);
  const toggleMenu = useMenuStore(selectToggleMenu);
  const closeMenu = useMenuStore(selectCloseMenu);

  const location = useLocation();
  const navigate = useNavigate();

  const isSelectedMenuItem = (actionPath: string) => {
    const path = location.pathname;
    return path === actionPath || path.startsWith(`${actionPath}/`);
  };

  return {
    menuOpen,
    toggleMenu,
    closeMenu,
    isSelectedMenuItem,
    navigate,
  };
};
