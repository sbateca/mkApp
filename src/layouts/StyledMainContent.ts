import {styled, Theme} from "@mui/material/styles";
import {MENU_WIDTH} from "../utils/constants";

interface MainProps {
  open?: boolean;
}

export const getMainContentContainerStyle = (theme: Theme, open: boolean) => ({
  flexGrow: 1,
  padding: theme.spacing(1),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${MENU_WIDTH}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
});

export const StyledMainContent = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<MainProps>(({theme, open}) =>
  getMainContentContainerStyle(theme, Boolean(open)),
);
