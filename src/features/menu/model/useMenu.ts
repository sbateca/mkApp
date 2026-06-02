import {useLocation, useNavigate} from "react-router-dom";
import {selectMenuOpen, selectToggleMenu} from "./selectors";
import {useMenuStore} from "./store";

export const useMenu = () => {
  const menuOpen = useMenuStore(selectMenuOpen);
  const toggleMenu = useMenuStore(selectToggleMenu);

  const location = useLocation();
  const navigate = useNavigate();

  const isSelectedMenuItem = (actionPath: string) => {
    const path = location.pathname;
    return path === actionPath || path.startsWith(`${actionPath}/`);
  };

  return {
    menuOpen,
    toggleMenu,
    isSelectedMenuItem,
    navigate,
  };
};
