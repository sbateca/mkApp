import {useEffect} from "react";
import {selectError, useSampleTypeStore} from "../../../../entities/sampleType";
import {selectShowSnackBarMessage, useSnackBarStore} from "../../../snackbar";
import {SnackBarSeverity} from "../../../../utils/enums";

export const useSampleTypeActionsErrorNotifier = () => {
  const error = useSampleTypeStore(selectError);

  const showSnackBarMessage = useSnackBarStore(selectShowSnackBarMessage);

  useEffect(() => {
    if (error) {
      showSnackBarMessage(error, SnackBarSeverity.ERROR);
    }
  }, [error, showSnackBarMessage]);
};
