import {Alert, Snackbar as MuiSnackbar} from "@mui/material";
import {SnackBarSeverity} from "../../../utils/enums";
import {toMuiSeverity} from "../lib/severityMapper";

type Props = {
  isOpen: boolean;
  snackBarText: string;
  severity: SnackBarSeverity;
  onClose: () => void;
};

export const Snackbar = ({isOpen, snackBarText, severity, onClose}: Props) => (
  <MuiSnackbar
    open={isOpen}
    autoHideDuration={3000}
    onClose={onClose}
    anchorOrigin={{vertical: "bottom", horizontal: "center"}}
  >
    <Alert
      onClose={onClose}
      severity={toMuiSeverity(severity)}
      variant="filled"
      sx={{width: "100%"}}
    >
      {snackBarText}
    </Alert>
  </MuiSnackbar>
);
