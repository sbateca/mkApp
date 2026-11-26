import {useInterfaceTranslation} from "../../../shared/i18n/useInterfaceTranslation";
import {
  selectCloseSnackBar,
  selectIsSnackBarOpen,
  selectSnackBarSeverity,
  selectSnackBarText,
} from "../model/selectors";
import {useSnackBarStore} from "../model/store";
import {Snackbar} from "./SnackBar";

export const SnackBarContainer = () => {
  const {t} = useInterfaceTranslation();
  const isSnackBarOpen = useSnackBarStore(selectIsSnackBarOpen);
  const snackBarText = useSnackBarStore(selectSnackBarText);
  const snackBarSeverity = useSnackBarStore(selectSnackBarSeverity);
  const closeSnackBar = useSnackBarStore(selectCloseSnackBar);
  return (
    <Snackbar
      isOpen={isSnackBarOpen}
      snackBarText={t(snackBarText)}
      severity={snackBarSeverity}
      onClose={closeSnackBar}
    />
  );
};
