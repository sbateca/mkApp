import {useInterfaceTranslation} from "../../../../shared/i18n/useInterfaceTranslation";
import Swal from "sweetalert2";
import {
  selectDeleteSampleType,
  selectGetSampleTypes,
  useSampleTypeStore,
} from "../../../../entities/sampleType";
import {selectShowSnackBarMessage, useSnackBarStore} from "../../../snackbar";
import {
  SAMPLE_TYPE_DELETE_CONFIRMATION_SUBTITLE,
  SAMPLE_TYPE_DELETE_CONFIRMATION_TEXT,
  SAMPLE_TYPE_DELETE_CONFIRMATION_TITLE,
  SAMPLE_TYPE_SUCCESSFULLY_DELETED_TEXT,
  SWEET_ALERT_PARAMS,
} from "../../../../utils/constants";
import {SnackBarSeverity, SweetAlertIcon} from "../../../../utils/enums";

export const useDeleteSampleType = () => {
  const {t} = useInterfaceTranslation();
  const getSampleTypes = useSampleTypeStore(selectGetSampleTypes);
  const deleteSample = useSampleTypeStore(selectDeleteSampleType);

  const showSnackBarMessage = useSnackBarStore(selectShowSnackBarMessage);

  const handleDelete = async (sampleId: string) => {
    Swal.fire({
      title: t(SAMPLE_TYPE_DELETE_CONFIRMATION_TITLE),
      text: t(SAMPLE_TYPE_DELETE_CONFIRMATION_SUBTITLE),
      icon: SweetAlertIcon.WARNING,
      showCancelButton: true,
      cancelButtonText: t("Cancel"),
      confirmButtonColor: SWEET_ALERT_PARAMS.CONFIRM_BUTTON_COLOR,
      cancelButtonColor: SWEET_ALERT_PARAMS.CANCEL_BUTTON_COLOR,
      confirmButtonText: t(SAMPLE_TYPE_DELETE_CONFIRMATION_TEXT),
    }).then((result) => {
      if (result.isConfirmed) {
        const result = deleteSample(sampleId);
        if (result !== null) {
          showSnackBarMessage(
            SAMPLE_TYPE_SUCCESSFULLY_DELETED_TEXT,
            SnackBarSeverity.SUCCESS,
            getSampleTypes,
          );
        }
      }
    });
  };

  return {handleDelete};
};
