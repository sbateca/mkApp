import {useEffect} from "react";
import {selectError, useCriteriaStore} from "../../../../entities/criteria";
import {selectShowSnackBarMessage, useSnackBarStore} from "../../../snackbar";
import {SnackBarSeverity} from "../../../../utils/enums";

export const useCriteriaActionsErrorNotifier = () => {
  const error = useCriteriaStore(selectError);
  const showSnackBarMessage = useSnackBarStore(selectShowSnackBarMessage);

  useEffect(() => {
    if (error) {
      showSnackBarMessage(error, SnackBarSeverity.ERROR);
    }
  }, [error, showSnackBarMessage]);
};
