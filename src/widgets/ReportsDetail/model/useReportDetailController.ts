import {useCallback} from "react";
import {
  ReportDetailDataProps,
  selectSelectedReport,
  useReportStore,
} from "../../../entities/report";
import {getFormStringValue} from "../../../utils/constants";
import {ReportFormFields} from "../../../utils/enums";
import {
  useCreateReport,
  useEditReport,
  useLoadReportDetailData,
} from "../../../features/reports";
import {Sample} from "../../../entities/sample";
import {ReportTestGroups} from "./types";
import {useReportDetailForm} from "./useReportDetailForm";
import {useReportErrorNotifier} from "./useReportErrorNotifier";

export const useReportDetailController = () => {
  const selectedReport = useReportStore(selectSelectedReport);

  const reportDetailData = useLoadReportDetailData(selectedReport?.sample);
  useReportErrorNotifier(reportDetailData.samplesError);

  const reportFormState = useReportDetailForm(selectedReport);
  const {form, setFieldValue} = reportFormState;

  const sampleId = getFormStringValue(form, ReportFormFields.SAMPLE_ID);
  const selectedSample =
    reportDetailData.samples.find(({id}) => id === sampleId) ?? null;

  const onSampleCreated = (sample: Sample) => {
    reportDetailData.addAvailableSample(sample);
    setFieldValue(ReportFormFields.SAMPLE_ID, sample.id);
  };

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
      selectedReport,
      selectedSample,
    },
    actions: {
      onCreateReport,
      onSampleCreated,
      onEditReport,
    },
  };
};
