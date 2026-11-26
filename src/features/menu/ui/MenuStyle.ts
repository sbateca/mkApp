import {SxProps, Theme} from "@mui/material/styles";

export const MenuStyle: SxProps<Theme> = {
  px: 1,
  display: "grid",
  gap: 0.5,
  "& .MuiListItemButton-root": {
    minHeight: 42,
    px: 1.5,
    borderRadius: "10px",
    color: "text.secondary",
    "&:hover": {bgcolor: "#edf4fa"},
    "&.Mui-selected, &.Mui-selected:hover": {
      bgcolor: "primary.main",
      color: "primary.contrastText",
    },
  },
  "& .MuiListItemIcon-root": {
    color: "inherit",
    "& .MuiSvgIcon-root": {fontSize: 20},
  },
  "& .MuiListItemText-primary": {fontSize: "0.875rem", fontWeight: 550},
};
