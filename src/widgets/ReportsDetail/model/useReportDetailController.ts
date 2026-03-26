import {useCallback} from "react";
import {
  selectError,
  selectIsLoadingReport,
  selectSelectedReport,
  useReportStore,
} from "../../../entities/report";
import {
  useCreateReport,
  useEditReport,
  useLoadReportDetailData,
} from "../../../features/reports";
import {useSelectSampleForReport} from "../../../features/reports/selectSample/model/useSelectSampleForReport";
import {selectSideSectionTitle} from "../../../features/sideSection/model/selectors";
import {useSideSectionStore} from "../../../features/sideSection/model/store";
import {useSideSection} from "../../../features/sideSection/model/useSideSection";
import {ReportDetailControllerProps} from "./types";
import {useReportDetailForm} from "./useReportDetailForm";
import {useReportErrorNotifier} from "./useReportErrorNotifier";

export const useReportDetailController = ({
  setIsReadOnlyMode,
}: ReportDetailControllerProps) => {
  const selectedReport = useReportStore(selectSelectedReport);
  const isLoading = useReportStore(selectIsLoadingReport);
  const error = useReportStore(selectError);

  const reportDetailData = useLoadReportDetailData();

  const reportFormState = useReportDetailForm(selectedReport);
  const {form} = reportFormState;

  const sideSectionTitle = useSideSectionStore(selectSideSectionTitle);
  const {onCloseSideSection} = useSideSection(setIsReadOnlyMode);

  const {selectedSample, isLoadingSample} = useSelectSampleForReport(form);

  const {handleCreateReport} = useCreateReport(setIsReadOnlyMode);
  const {handleEditReport} = useEditReport(setIsReadOnlyMode);

  useReportErrorNotifier(error);

  const onCreateReport = useCallback(() => {
    handleCreateReport(form);
  }, [form, handleCreateReport]);

  const onEditReport = useCallback(() => {
    handleEditReport(form);
  }, [form, handleEditReport]);

  return {
    catalogs: reportDetailData,
    detailForm: reportFormState,
    state: {
      isLoading,
      isLoadingSample,
      selectedReport,
      selectedSample,
      sideSectionTitle,
    },
    actions: {
      onCloseSideSection,
      onCreateReport,
      onEditReport,
    },
  };
};
