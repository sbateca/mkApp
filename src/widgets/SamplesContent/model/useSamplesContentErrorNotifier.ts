import {useEffect} from "react";
import {
  selectError,
  selectGetSamples,
  useSampleStore,
} from "../../../entities/sample";
import {
  selectShowSnackBarMessage,
  useSnackBarStore,
} from "../../../features/snackbar";
import {SnackBarSeverity} from "../../../utils/enums";

export const useSamplesContentErrorNotifier = () => {
  const error = useSampleStore(selectError);
  const getSamples = useSampleStore(selectGetSamples);
  const showSnackBarMessage = useSnackBarStore(selectShowSnackBarMessage);

  useEffect(() => {
    if (error) {
      showSnackBarMessage(error, SnackBarSeverity.ERROR, getSamples);
    }
  }, [error, getSamples, showSnackBarMessage]);
};
