import {useInterfaceTranslation} from "../../i18n/useInterfaceTranslation";
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
  const {t} = useInterfaceTranslation();
  return (
    <ListItem disablePadding sx={{display: "block"}}>
      <Tooltip title={t(label)} placement="right">
        <MuiListItemButton
          aria-label={t(label)}
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
                      mr: 1.5,
                    }
                  : {
                      mr: 0,
                    },
              ]}
            >
              {icon}
            </ListItemIcon>
          ) : null}
          <ListItemText
            primary={t(label)}
            sx={[
              open
                ? {
                    opacity: 1,
                  }
                : {
                    visibility: "hidden",
                    width: 0,
                    flex: "none",
                  },
            ]}
          />
        </MuiListItemButton>
      </Tooltip>
    </ListItem>
  );
};
