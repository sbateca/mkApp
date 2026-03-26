import {
  reportFormToReport,
  selectEditReport,
  selectGetReports,
  selectSelectedReport,
  useReportStore,
} from "../../../../entities/report";
import {
  FormProps,
  SAMPLE_SUCCESSFULLY_UPDATED_TEXT,
} from "../../../../utils/constants";
import {SnackBarSeverity} from "../../../../utils/enums";
import {useSideSection} from "../../../sideSection/model/useSideSection";
import {selectShowSnackBarMessage, useSnackBarStore} from "../../../snackbar";

export const useEditReport = (
  setIsReadOnlyMode: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const getReports = useReportStore(selectGetReports);
  const editReport = useReportStore(selectEditReport);
  const selectedReport = useReportStore(selectSelectedReport);
  const {onCloseSideSection} = useSideSection(setIsReadOnlyMode);
  const showSnackBarMessage = useSnackBarStore(selectShowSnackBarMessage);

  const handleEditReport = async (form: FormProps) => {
    const parsedReport = reportFormToReport(form, selectedReport?.id ?? "");
    const updatedReport = await editReport(selectedReport?.id, parsedReport);
    if (updatedReport !== null) {
      onCloseSideSection();
      showSnackBarMessage(
        SAMPLE_SUCCESSFULLY_UPDATED_TEXT,
        SnackBarSeverity.SUCCESS,
        getReports,
      );
    }
  };

  return {handleEditReport};
};
