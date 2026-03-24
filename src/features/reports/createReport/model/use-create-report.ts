import React from "react";
import {reportFormToReport} from "../../../../adapters";
import {
  FormProps,
  REPORT_SUCCESSFULLY_CREATED_TEXT,
} from "../../../../utils/constants";
import {SnackBarSeverity} from "../../../../utils/enums";
import {selectShowSnackBarMessage, useSnackBarStore} from "../../../snackbar";
import {selectCreateReport, selectGetReports} from "../../model/selector";
import {useReportStore} from "../../model/store";
import {useSideSection} from "../../../sideSection/model/useSideSection";

export const useCreateReport = (
  setIsReadOnlyMode: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const createReport = useReportStore(selectCreateReport);
  const showSnackBarMessage = useSnackBarStore(selectShowSnackBarMessage);
  const getReports = useReportStore(selectGetReports);
  const {handleCloseSideSection} = useSideSection(setIsReadOnlyMode);

  const handleCreateReport = async (form: FormProps) => {
    const newReport = await createReport(reportFormToReport(form, ""));
    if (newReport !== null) {
      showSnackBarMessage(
        REPORT_SUCCESSFULLY_CREATED_TEXT,
        SnackBarSeverity.SUCCESS,
        getReports,
      );
      handleCloseSideSection();
    }
  };

  return {handleCreateReport};
};
