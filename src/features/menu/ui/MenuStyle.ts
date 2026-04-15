import {SxProps, Theme} from "@mui/material/styles";
import {MENU_WIDTH} from "../../../utils/constants";

export const MenuStyle: SxProps<Theme> = {
  width: MENU_WIDTH,
  backgroundColor: (theme: Theme) => theme.palette.background.default,
  color: (theme: Theme) => theme.palette.text.primary,
  "& .MuiListItemButton-root": {
    width: "100%",
    "&:hover": {
      backgroundColor: (theme: Theme) => theme.palette.primary.main,
      color: (theme: Theme) => theme.palette.primary.contrastText,
    },
  },
};
