import {useCallback} from "react";
import {
  selectSelectedMenuItem,
  selectSetSelectedMenuItem,
  selectToggleMenu,
} from "./selectors";
import {useMenuStore} from "./store";
import {SharedMenuItems} from "../../../utils/enums";

export const useMenuItemButton = (item: SharedMenuItems) => {
  const selected = useMenuStore(selectSelectedMenuItem);
  const setSelected = useMenuStore(selectSetSelectedMenuItem);
  const toggleMenu = useMenuStore(selectToggleMenu);

  const onClick = useCallback(() => {
    setSelected(item);
    toggleMenu();
  }, [item, setSelected, toggleMenu]);

  return {selected, onClick};
};
