import useSnackBarStore from "../../../stores/snackBarStore";
import {Snackbar} from "./SnackBar";

export const SnackBarContainer = () => {
  const {isSnackBarOpen, snackBarText, snackBarSeverity, closeSnackBar} =
    useSnackBarStore();
  return (
    <Snackbar
      isOpen={isSnackBarOpen}
      snackBarText={snackBarText}
      severity={snackBarSeverity}
      onClose={closeSnackBar}
    />
  );
};
