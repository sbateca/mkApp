import Swal from "sweetalert2";
import {
  selectDeleteSample,
  selectGetSamples,
  useSampleStore,
} from "../../../../entities/sample";
import {
  SAMPLE_DELETE_CONFIRMATION_SUBTITLE,
  SAMPLE_DELETE_CONFIRMATION_TEXT,
  SAMPLE_DELETE_CONFIRMATION_TITLE,
  SAMPLE_SUCCESSFULLY_DELETED_TEXT,
} from "../../../../utils/constants";
import {SnackBarSeverity, SweetAlertIcon} from "../../../../utils/enums";
import {selectShowSnackBarMessage, useSnackBarStore} from "../../../snackbar";

export const useDeleteSample = () => {
  const getSamples = useSampleStore(selectGetSamples);
  const deleteSample = useSampleStore(selectDeleteSample);

  const showSnackBarMessage = useSnackBarStore(selectShowSnackBarMessage);

  const handleDelete = async (sampleId: string) => {
    Swal.fire({
      title: SAMPLE_DELETE_CONFIRMATION_TITLE,
      text: SAMPLE_DELETE_CONFIRMATION_SUBTITLE,
      icon: SweetAlertIcon.WARNING,
      showCancelButton: true,
      confirmButtonColor: "#1976d2",
      cancelButtonColor: "#d33",
      confirmButtonText: SAMPLE_DELETE_CONFIRMATION_TEXT,
    }).then((result) => {
      if (result.isConfirmed) {
        const result = deleteSample(sampleId);
        if (result !== null) {
          showSnackBarMessage(
            SAMPLE_SUCCESSFULLY_DELETED_TEXT,
            SnackBarSeverity.SUCCESS,
            getSamples,
          );
        }
      }
    });
  };

  return {handleDelete};
};
