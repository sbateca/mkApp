import {useCallback} from "react";
import {
  ReportDetailDataProps,
  selectError,
  selectIsLoadingReport,
  selectSelectedReport,
  useReportStore,
} from "../../../entities/report";
import {ReportFormFields} from "../../../utils/enums";
import {
  useCreateReport,
  useEditReport,
  useLoadReportDetailData,
} from "../../../features/reports";
import {useSelectSampleForReport} from "../../../features/reports/selectSample/model/useSelectSampleForReport";
import {selectSideSectionTitle} from "../../../features/sideSection/model/selectors";
import {useSideSectionStore} from "../../../features/sideSection/model/store";
import {useSideSection} from "../../../features/sideSection/model/useSideSection";
import {ReportDetailControllerProps, ReportTestGroups} from "./types";
import {useReportDetailForm} from "./useReportDetailForm";
import {useReportErrorNotifier} from "./useReportErrorNotifier";
import {useApproveReport} from "../../../features/reports/approveReport/model/useApproveReport";
import {useDownloadReport} from "../../../features/reports/downloadReport/model/useDownloadReport";

export const useReportDetailController = ({
  setIsReadOnlyMode,
}: ReportDetailControllerProps) => {
  const selectedReport = useReportStore(selectSelectedReport);
  const isLoading = useReportStore(selectIsLoadingReport);
  const error = useReportStore(selectError);

  const reportDetailData = useLoadReportDetailData();

  const reportFormState = useReportDetailForm(
    selectedReport,
    reportDetailData.testTypes,
    reportDetailData.getAnalytesByTestTypeId,
  );
  const {form} = reportFormState;

  const sideSectionTitle = useSideSectionStore(selectSideSectionTitle);
  const {onCloseSideSection} = useSideSection(setIsReadOnlyMode);

  const {selectedSample, isLoadingSample} = useSelectSampleForReport(form);

  const {handleCreateReport} = useCreateReport(setIsReadOnlyMode);
  const {handleEditReport} = useEditReport(setIsReadOnlyMode);
  const {handleApproveReport} = useApproveReport();
  const {handleDownloadReport} = useDownloadReport();

  useReportErrorNotifier(error);

  const getReportDetail = useCallback((): ReportDetailDataProps => {
    return {
      clients: reportDetailData.clients || null,
      analysisMethods: reportDetailData.analysisMethods || null,
      analytes: reportDetailData.analytes || null,
      criterias: reportDetailData.criterias || null,
      sampleTypes: reportDetailData.sampleTypes || null,
      samples: reportDetailData.samples || null,
      tests: reportDetailData.tests || null,
      testTypes: reportDetailData.testTypes || null,
    };
  }, [reportDetailData]);

  const onCreateReport = useCallback(
    (reportTestGroups: ReportTestGroups) => {
      const reportDetail: ReportDetailDataProps = {
        clients: reportDetailData.clients || null,
        analysisMethods: reportDetailData.analysisMethods || null,
        analytes: reportDetailData.analytes || null,
        criterias: reportDetailData.criterias || null,
        sampleTypes: reportDetailData.sampleTypes || null,
        samples: reportDetailData.samples || null,
        tests: reportDetailData.tests || null,
        testTypes: reportDetailData.testTypes || null,
      };
      handleCreateReport(
        {...form, [ReportFormFields.REPORT_TEST_GROUPS]: reportTestGroups},
        reportDetail,
      );
    },
    [form, reportDetailData, handleCreateReport],
  );

  const onEditReport = useCallback(
    (reportTestGroups: ReportTestGroups) => {
      handleEditReport(
        {...form, [ReportFormFields.REPORT_TEST_GROUPS]: reportTestGroups},
        getReportDetail(),
      );
    },
    [form, getReportDetail, handleEditReport],
  );

  const onApproveReport = useCallback(
    (reportId: string) => {
      handleApproveReport(reportId);
    },
    [handleApproveReport],
  );

  const onDownloadReport = useCallback(
    (reportId: string) => {
      handleDownloadReport(reportId);
    },
    [handleDownloadReport],
  );

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
      onApproveReport,
      onDownloadReport,
    },
  };
};
