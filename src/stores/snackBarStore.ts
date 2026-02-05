import {create} from "zustand";
import {SnackBarSeverity} from "../utils/enums";
import {DEFAULT_CALLBACK_TIMEOUT} from "../utils/constants";

interface SnackBarStore {
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
}

let timer: ReturnType<typeof setTimeout> | undefined;

const useSnackBarStore = create<SnackBarStore>((set) => ({
  isSnackBarOpen: false,
  snackBarText: "",
  snackBarSeverity: SnackBarSeverity.SUCCESS,
  callbackFunction: undefined,

  showSnackBarMessage: (
    text,
    severity = SnackBarSeverity.SUCCESS,
    callback,
  ) => {
    if (callback !== undefined) {
      timer = setTimeout(() => {
        callback();
      }, DEFAULT_CALLBACK_TIMEOUT);
    }

    set({
      snackBarText: text,
      snackBarSeverity: severity,
      callbackFunction: callback,
      isSnackBarOpen: true,
    });
  },

  closeSnackBar: () => {
    if (timer) clearTimeout(timer);
    timer = undefined;
    set({isSnackBarOpen: false, callbackFunction: undefined});
  },
}));

export default useSnackBarStore;
