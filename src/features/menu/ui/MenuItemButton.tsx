import {useCallback} from "react";
import {ListItemButton} from "../../../components/atoms";
import {SharedMenuItems} from "../../../utils/enums";
import {useMenuStore} from "../model/store";
import {
  selectSelectedMenuItem,
  selectSetSelectedMenuItem,
  selectToggleMenu,
} from "../model/selectors";

type Props = {item: SharedMenuItems};

export const MenuItemButton = ({item}: Props) => {
  const selected = useMenuStore(selectSelectedMenuItem);
  const setSelected = useMenuStore(selectSetSelectedMenuItem);
  const toggleMenu = useMenuStore(selectToggleMenu);

  const onClick = useCallback(() => {
    setSelected(item);
    toggleMenu();
  }, [item, setSelected, toggleMenu]);

  return (
    <ListItemButton
      label={item}
      selected={selected === item}
      onClick={onClick}
    />
  );
};
