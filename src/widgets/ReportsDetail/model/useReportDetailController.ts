import {useCallback} from "react";
import {
  ReportDetailDataProps,
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
import {ReportTestGroups} from "./types";
import {useReportDetailForm} from "./useReportDetailForm";

export const useReportDetailController = () => {
  const selectedReport = useReportStore(selectSelectedReport);

  const reportDetailData = useLoadReportDetailData();

  const reportFormState = useReportDetailForm(selectedReport);
  const {form} = reportFormState;

  const {selectedSample, isLoadingSample} = useSelectSampleForReport(form);

  const {handleCreateReport} = useCreateReport();
  const {handleEditReport} = useEditReport();

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

  return {
    catalogs: reportDetailData,
    detailForm: reportFormState,
    state: {
      isLoadingSample,
      selectedReport,
      selectedSample,
    },
    actions: {
      onCreateReport,
      onEditReport,
    },
  };
};
