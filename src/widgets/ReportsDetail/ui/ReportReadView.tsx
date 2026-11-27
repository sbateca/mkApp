import {Box, Stack, Typography} from "@mui/material";
import {Report} from "../../../entities/report";
import {SampleReportDetails} from "../../../entities/sample";
import {useApproveReport} from "../../../features/reports/approveReport/model/useApproveReport";
import {useDownloadReport} from "../../../features/reports/downloadReport/model/useDownloadReport";
import {
  formActionsSx,
  formSectionSx,
  getStackContainerProps,
} from "../../../shared/commonStyles";
import {formatInterfaceDate} from "../../../shared/i18n/formatInterfaceDate";
import {useInterfaceTranslation} from "../../../shared/i18n/useInterfaceTranslation";
import {
  ANALYSIS_TITLE,
  N_A,
  REPORT_ANALYSIS_METHOD_LABEL_TEXT,
  REPORT_ANALYTE_LABEL_TEXT,
  REPORT_CRITERIA_LABEL_TEXT,
  REPORT_DATE_LABEL_TEXT,
  REPORT_NUMBER_LABEL_TEXT,
  REPORT_RESULT_LABEL_TEXT,
  REPORT_TEST_TYPE_LABEL_TEXT,
} from "../../../utils/constants";
import {ReportSideSectionButtons} from "./ReportsSideSectionButtons";

const ReportFields = ({fields}: {fields: [string, string][]}) => (
  <Box
    component="dl"
    sx={{
      display: "grid",
      gridTemplateColumns: {
        xs: "minmax(0, 1fr)",
        sm: "repeat(2, minmax(0, 1fr))",
      },
      gap: 2,
      m: 0,
    }}
  >
    {fields.map(([label, value]) => (
      <Box key={label} sx={{overflowWrap: "anywhere"}}>
        <Typography component="dt" variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography component="dd" variant="body2" sx={{m: 0, mt: 0.5}}>
          {value}
        </Typography>
      </Box>
    ))}
  </Box>
);

type Props = {
  report: Report;
  isLessThanMediumScreen: boolean;
};

export const ReportReadView = ({report, isLessThanMediumScreen}: Props) => {
  const {t, language} = useInterfaceTranslation();
  const {handleApproveReport} = useApproveReport();
  const {handleDownloadReport} = useDownloadReport();
  const tests = report.tests ?? [];

  return (
    <Stack {...getStackContainerProps(isLessThanMediumScreen)}>
      <Stack component="section" gap={2} sx={formSectionSx}>
        <Typography component="h2" fontWeight={750}>
          {t("Report information")}
        </Typography>
        <ReportFields
          fields={[
            [t(REPORT_NUMBER_LABEL_TEXT), report.reportNumber],
            [
              t(REPORT_DATE_LABEL_TEXT),
              formatInterfaceDate(report.reportDate, language),
            ],
          ]}
        />
      </Stack>
      <SampleReportDetails sample={report.sample} />
      {tests.length > 0 && (
        <Stack component="section" gap={2} sx={formSectionSx}>
          <Typography component="h2" fontWeight={750}>
            {report.sample?.sampleType?.name || t(ANALYSIS_TITLE)}
          </Typography>
          {tests.map((test) => (
            <Box
              key={test.id}
              sx={{
                p: 2,
                bgcolor: "background.default",
                border: 1,
                borderColor: "divider",
                borderRadius: "12px",
              }}
            >
              <ReportFields
                fields={[
                  [
                    t(REPORT_TEST_TYPE_LABEL_TEXT),
                    test.testType?.name || t(N_A),
                  ],
                  [t(REPORT_ANALYTE_LABEL_TEXT), test.analyte?.name || t(N_A)],
                  [
                    t(REPORT_ANALYSIS_METHOD_LABEL_TEXT),
                    test.analysisMethod?.name || t(N_A),
                  ],
                  [t(REPORT_RESULT_LABEL_TEXT), test.result || t(N_A)],
                  [
                    t(REPORT_CRITERIA_LABEL_TEXT),
                    test.criteria?.name || t(N_A),
                  ],
                ]}
              />
            </Box>
          ))}
        </Stack>
      )}
      <Box sx={formActionsSx}>
        <ReportSideSectionButtons
          mode="read"
          report={report}
          handleApprove={handleApproveReport}
          handleDownload={handleDownloadReport}
        />
      </Box>
    </Stack>
  );
};
