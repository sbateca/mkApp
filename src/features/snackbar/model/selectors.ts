import {SnackBarStore} from "./types";

export const selectIsSnackBarOpen = (store: SnackBarStore) =>
  store.isSnackBarOpen;
export const selectSnackBarText = (store: SnackBarStore) => store.snackBarText;
export const selectSnackBarSeverity = (store: SnackBarStore) =>
  store.snackBarSeverity;
export const selectSnackBarFunction = (store: SnackBarStore) =>
  store.callbackFunction;
export const selectShowSnackBarMessage = (store: SnackBarStore) =>
  store.showSnackBarMessage;
export const selectCloseSnackBar = (store: SnackBarStore) =>
  store.closeSnackBar;
