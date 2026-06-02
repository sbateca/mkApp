import {useEffect} from "react";
import {
  selectTestTypeError,
  useTestTypeStore,
} from "../../../../entities/testType";
import {selectShowSnackBarMessage, useSnackBarStore} from "../../../snackbar";
import {SnackBarSeverity} from "../../../../utils/enums";

export const useTestTypeActionsErrorNotifier = () => {
  const error = useTestTypeStore(selectTestTypeError);
  const showSnackBarMessage = useSnackBarStore(selectShowSnackBarMessage);

  useEffect(() => {
    if (error) {
      showSnackBarMessage(error, SnackBarSeverity.ERROR);
    }
  }, [error, showSnackBarMessage]);
};
