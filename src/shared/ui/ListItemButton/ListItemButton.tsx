import React from "react";

import {
  ListItemButton as MuiListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem,
  Tooltip,
} from "@mui/material";
import {SharedMenuItems} from "../../../utils/enums";

type Props = {
  label: SharedMenuItems;
  icon?: React.ReactNode;
  open?: boolean;
  selected?: boolean;
  onClick?: () => void;
};

export const ListItemButton = ({
  label = SharedMenuItems.SAMPLES,
  icon,
  open = true,
  selected = false,
  onClick,
}: Props): React.ReactElement => {
  return (
    <ListItem disablePadding sx={{display: "block"}}>
      <Tooltip title={label} placement="right">
        <MuiListItemButton
          selected={selected}
          onClick={onClick}
          sx={[
            {
              minHeight: 48,
              px: 2.5,
            },
            open
              ? {
                  justifyContent: "initial",
                }
              : {
                  justifyContent: "center",
                },
          ]}
        >
          {icon ? (
            <ListItemIcon
              sx={[
                {
                  minWidth: 0,
                  justifyContent: "center",
                },
                open
                  ? {
                      mr: 3,
                    }
                  : {
                      mr: "auto",
                    },
              ]}
            >
              {icon}
            </ListItemIcon>
          ) : null}
          <ListItemText
            primary={label}
            sx={[
              open
                ? {
                    opacity: 1,
                  }
                : {
                    opacity: 0,
                  },
            ]}
          />
        </MuiListItemButton>
      </Tooltip>
    </ListItem>
  );
};
