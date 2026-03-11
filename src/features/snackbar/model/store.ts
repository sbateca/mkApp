import {create} from "zustand";
import {SnackBarStore} from "./types";
import {SnackBarSeverity} from "../../../utils/enums";
import {DEFAULT_CALLBACK_TIMEOUT} from "../../../utils/constants";

let timer: ReturnType<typeof setTimeout> | undefined;

export const useSnackBarStore = create<SnackBarStore>((set) => ({
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
