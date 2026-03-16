export interface SnackbarProps {
  isOpen: boolean;
  snackBarText: string;
  severity: "success" | "info" | "warning" | "error";
}
