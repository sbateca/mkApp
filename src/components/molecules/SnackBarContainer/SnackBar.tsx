import {Alert, AlertColor, Snackbar as MuiSnackbar} from "@mui/material";
import {SnackBarSeverity} from "../../../utils/enums";

type Props = {
  isOpen: boolean;
  snackBarText: string;
  severity: SnackBarSeverity;
  onClose: () => void;
};

const toMuiSeverity = (s: SnackBarSeverity): AlertColor => {
  switch (s) {
    case SnackBarSeverity.SUCCESS:
      return "success";
    case SnackBarSeverity.ERROR:
      return "error";
    case SnackBarSeverity.WARNING:
      return "warning";
    case SnackBarSeverity.INFO:
      return "info";
    default:
      return "info";
  }
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
