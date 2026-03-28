import {useEffect} from "react";
import {selectError, useSampleStore} from "../../../entities/sample";
import {useSnackBarStore} from "../../../features/snackbar";
import {SnackBarSeverity} from "../../../utils/enums";

export const useSampleErrorNotifier = () => {
  const error = useSampleStore(selectError);
  const {showSnackBarMessage} = useSnackBarStore();

  useEffect(() => {
    if (error) {
      showSnackBarMessage(error, SnackBarSeverity.ERROR);
    }
  }, [error, showSnackBarMessage]);
};
