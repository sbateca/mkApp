import {styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";

export const StyledHeaderAppBar = styled(MuiAppBar)(({theme}) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: "#131d4e",
  boxShadow: "none",
  "& .MuiToolbar-root": {
    minHeight: 48,
  },
}));
