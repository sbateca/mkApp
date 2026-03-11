import {
  selectCloseSnackBar,
  selectIsSnackBarOpen,
  selectSnackBarSeverity,
  selectSnackBarText,
} from "../../../features/snackbar/model/selectors";
import {useSnackBarStore} from "../../../features/snackbar/model/store";
import {Snackbar} from "./SnackBar";

export const SnackBarContainer = () => {
  const isSnackBarOpen = useSnackBarStore(selectIsSnackBarOpen);
  const snackBarText = useSnackBarStore(selectSnackBarText);
  const snackBarSeverity = useSnackBarStore(selectSnackBarSeverity);
  const closeSnackBar = useSnackBarStore(selectCloseSnackBar);
  return (
    <Snackbar
      isOpen={isSnackBarOpen}
      snackBarText={snackBarText}
      severity={snackBarSeverity}
      onClose={closeSnackBar}
    />
  );
};
