import React from "react";

import {ListItemButton as MuiListItemButton, ListItemText} from "@mui/material";
import {SharedMenuItems} from "../../../utils/enums";

type Props = {
  label: SharedMenuItems;
  selected?: boolean;
  onClick?: () => void;
};

export const ListItemButton = ({
  label = SharedMenuItems.SAMPLES,
  selected = false,
  onClick,
}: Props): React.ReactElement => {
  return (
    <MuiListItemButton selected={selected} onClick={onClick}>
      <ListItemText primary={label} />
    </MuiListItemButton>
  );
};
