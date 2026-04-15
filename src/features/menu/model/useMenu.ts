import {useLocation, useNavigate} from "react-router-dom";
import {selectMenuOpen, selectToggleMenu} from "./selectors";
import {useMenuStore} from "./store";
import {BaseRoutes} from "../../../utils/constants/baseRoutes";
import {SharedMenuItems} from "../../../utils/enums";

export const useMenu = () => {
  const menuOpen = useMenuStore(selectMenuOpen);
  const toggleMenu = useMenuStore(selectToggleMenu);

  const location = useLocation();
  const navigate = useNavigate();

  const getSelectedMenuItem = () => {
    const path = location.pathname;
    if (path.startsWith(BaseRoutes.SAMPLES)) {
      return SharedMenuItems.SAMPLES;
    }
    if (path.startsWith(BaseRoutes.REPORTS)) {
      return SharedMenuItems.REPORTS;
    }
    return "";
  };

  return {
    menuOpen,
    toggleMenu,
    getSelectedMenuItem,
    navigate,
  };
};
