import React from "react";

import {
  ListItemButton as MuiListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {SharedMenuItems} from "../../../utils/enums";

type Props = {
  label: SharedMenuItems;
  icon?: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
};

export const ListItemButton = ({
  label = SharedMenuItems.SAMPLES,
  icon,
  selected = false,
  onClick,
}: Props): React.ReactElement => {
  return (
    <MuiListItemButton selected={selected} onClick={onClick}>
      {icon ? <ListItemIcon sx={{minWidth: 36}}>{icon}</ListItemIcon> : null}
      <ListItemText primary={label} />
    </MuiListItemButton>
  );
};
