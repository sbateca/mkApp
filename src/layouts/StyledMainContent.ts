import {styled, Theme} from "@mui/material/styles";
import {MENU_WIDTH} from "../utils/constants";

interface MainProps {
  open?: boolean;
}

export const getMainContentContainerStyle = (theme: Theme, open: boolean) => ({
  flexGrow: 1,
  padding: theme.spacing(1),
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: `calc(100% - calc(${theme.spacing(7)} + 1px))`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(100% - calc(${theme.spacing(8)} + 1px))`,
  },
  ...(open && {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    width: `calc(100% - ${MENU_WIDTH}px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${MENU_WIDTH}px)`,
    },
  }),
});

export const StyledMainContent = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<MainProps>(({theme, open}) =>
  getMainContentContainerStyle(theme, Boolean(open)),
);
