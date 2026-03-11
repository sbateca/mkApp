import {SnackBarSeverity} from "../../../utils/enums";

export type SnackBarStore = {
  isSnackBarOpen: boolean;
  snackBarText: string;
  snackBarSeverity: SnackBarSeverity;
  callbackFunction?: () => void;

  showSnackBarMessage: (
    text: string,
    severity?: SnackBarSeverity,
    callback?: () => void,
  ) => void;

  closeSnackBar: () => void;
};
