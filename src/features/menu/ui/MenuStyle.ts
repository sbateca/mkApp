import {SxProps, Theme} from "@mui/material/styles";

export const MenuStyle: SxProps<Theme> = {
  width: "100%",
  backgroundColor: (theme: Theme) => theme.palette.background.default,
  color: (theme: Theme) => theme.palette.text.primary,
  "& .MuiListItemButton-root": {
    width: "100%",
    "&:hover": {
      backgroundColor: (theme: Theme) => theme.palette.primary.main,
      color: (theme: Theme) => theme.palette.primary.contrastText,
      "& .MuiListItemIcon-root": {
        color: (theme: Theme) => theme.palette.primary.contrastText,
      },
    },
  },
  "& .MuiListItemIcon-root": {
    color: (theme: Theme) => theme.palette.grey[600],
  },
};
