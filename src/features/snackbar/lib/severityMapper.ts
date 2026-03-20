import {AlertColor} from "@mui/material";
import {SnackBarSeverity} from "../../../utils/enums";

const severityMap: Record<SnackBarSeverity, AlertColor> = {
  [SnackBarSeverity.SUCCESS]: "success",
  [SnackBarSeverity.ERROR]: "error",
  [SnackBarSeverity.WARNING]: "warning",
  [SnackBarSeverity.INFO]: "info",
};

export const toMuiSeverity = (s: SnackBarSeverity): AlertColor =>
  severityMap[s] ?? "info";
