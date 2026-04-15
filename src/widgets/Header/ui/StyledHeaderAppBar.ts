import {styled, Theme} from "@mui/material/styles";
import {MENU_WIDTH} from "../../../utils/constants";

import MuiAppBar, {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export const getHeaderAppBarStyle = (theme: Theme, open: boolean) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: MENU_WIDTH,
    width: `calc(100% - ${MENU_WIDTH}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
});

export const StyledHeaderAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({theme, open}) => getHeaderAppBarStyle(theme, Boolean(open)));
