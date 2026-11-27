import {useInterfaceTranslation} from "../../../shared/i18n/useInterfaceTranslation";
import {LocalizedDateProvider} from "../../../shared/i18n/LocalizedDateProvider";
import React from "react";
import {Box, Stack, TextField, Typography} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";

import {
  ANALYSIS_TITLE,
  DATEPICKER_VIEWS,
  getFormStringValue,
  REPORT_DATE_LABEL_TEXT,
  REPORT_NUMBER_LABEL_TEXT,
  REPORT_SAMPLE_LABEL_TEXT,
} from "../../../utils/constants";
import {
  ReportFormFields,
  SelectVariants,
  SharedButtonColors,
  SharedButtonSizes,
  SharedTextFieldVariants,
} from "../../../utils/enums";
import {AutoComplete} from "../../../shared/ui";
import {SampleReportDetails} from "../../../entities/sample";
import {ReportTestForm} from "./ReportTestForm";
import {ReportSideSectionButtons} from "./ReportsSideSectionButtons";
import {DetailFormProps} from "../model/types";
import {
  formActionsSx,
  formSectionSx,
  getStackContainerProps,
  getStackFieldProps,
  getStackRowProps,
} from "../../../shared/commonStyles";
import {useReadOnlyMode} from "../../../features/readOnlyMode";

export const ReportDetailForm = ({
  isLessThanMediumScreen,
  catalogs,
  detailForm,
  state,
  actions,
}: DetailFormProps): React.ReactElement => {
  const {t} = useInterfaceTranslation();
  const {
    analysisMethods,
    clients,
    criterias,
    sampleTypes,
    testTypes,
    sampleTypeOptionsFromSamples,
  } = catalogs;

  const {
    form,
    formFieldsErrors,
    handleChange,
    handleDateChange,
    handleAutoCompleteChange,
    getTextFieldHelperText,
    analytesByTestType,
    reportTestGroups,
    areReportTestsValid,
    hasCompleteReportTestRow,
    getReportTestRows,
    handleTestRowsChange,
  } = detailForm;

  const {isReadOnlyMode} = useReadOnlyMode();

  const {isLoadingSample, selectedReport, selectedSample} = state;
  const {onCreateReport, onEditReport, onApproveReport, onDownloadReport} =
    actions;
  const reportDate = getFormStringValue(form, ReportFormFields.REPORT_DATE);
  return (
    <>
      <Stack {...getStackContainerProps(isLessThanMediumScreen)}>
        <Stack component="section" gap={2} sx={formSectionSx}>
          <Typography component="h2" fontWeight={750}>
            {t("Report information")}
          </Typography>
          <Stack {...getStackRowProps(isLessThanMediumScreen)}>
            <Stack {...getStackFieldProps()}>
              <LocalizedDateProvider>
                <DatePicker
                  views={DATEPICKER_VIEWS}
                  label={t(REPORT_DATE_LABEL_TEXT)}
                  name={ReportFormFields.REPORT_DATE}
                  onChange={(value) =>
                    handleDateChange(value, ReportFormFields.REPORT_DATE)
                  }
                  slotProps={{
                    textField: {
                      required: true,
                      error: !!formFieldsErrors[ReportFormFields.REPORT_DATE],
                      helperText: t(
                        getTextFieldHelperText(ReportFormFields.REPORT_DATE),
                      ),
                      variant: SharedTextFieldVariants.OUTLINED,
                      size: "small",
                    },
                  }}
                  value={reportDate ? dayjs(reportDate) : null}
                  readOnly={isReadOnlyMode}
                />
              </LocalizedDateProvider>
            </Stack>

            <Stack {...getStackFieldProps()}>
              <TextField
                required
                error={!!formFieldsErrors[ReportFormFields.REPORT_NUMBER]}
                label={t(REPORT_NUMBER_LABEL_TEXT)}
                type="string"
                color={SharedButtonColors.PRIMARY}
                size={SharedButtonSizes.SMALL}
                onChange={handleChange}
                name={ReportFormFields.REPORT_NUMBER}
                helperText={t(
                  getTextFieldHelperText(ReportFormFields.REPORT_NUMBER),
                )}
                value={form[ReportFormFields.REPORT_NUMBER] ?? ""}
                variant={SharedTextFieldVariants.OUTLINED}
                fullWidth
                InputProps={{
                  readOnly: isReadOnlyMode,
                }}
              />
            </Stack>

            <Stack {...getStackFieldProps()}>
              <AutoComplete
                options={sampleTypeOptionsFromSamples}
                label={t(REPORT_SAMPLE_LABEL_TEXT)}
                value={`${form[ReportFormFields.SAMPLE_ID] ?? ""}`}
                variant={SelectVariants.OUTLINED}
                onChange={handleAutoCompleteChange}
                name={ReportFormFields.SAMPLE_ID}
                readOnly={isReadOnlyMode}
                required
                error={!!formFieldsErrors[ReportFormFields.SAMPLE_ID]}
                helperText={t(
                  getTextFieldHelperText(ReportFormFields.SAMPLE_ID),
                )}
              />
            </Stack>
          </Stack>
        </Stack>
        <Stack {...getStackRowProps(isLessThanMediumScreen)}>
          <Box {...getStackFieldProps()}>
            <SampleReportDetails
              sample={selectedSample}
              clients={clients || []}
              sampleTypes={sampleTypes || []}
              isLoadingSample={isLoadingSample}
            />
          </Box>
        </Stack>

        {Object.entries(analytesByTestType).map(
          ([testTypeId, analytes], index) => (
            <ReportTestForm
              key={testTypeId}
              analytes={analytes}
              criterias={criterias}
              analysisMethods={analysisMethods}
              hasCompleteReportTestRow={hasCompleteReportTestRow}
              title={
                testTypes?.find(({id}) => id === testTypeId)?.name ??
                `${t(ANALYSIS_TITLE)} ${index + 1}`
              }
              rows={getReportTestRows(testTypeId)}
              onRowsChange={(nextRows) =>
                handleTestRowsChange(testTypeId, nextRows)
              }
            />
          ),
        )}
        <Box sx={formActionsSx}>
          <ReportSideSectionButtons
            isNotValidForm={detailForm.isNotValidForm || !areReportTestsValid}
            report={selectedReport}
            handleCreateReport={() => onCreateReport(reportTestGroups)}
            handleEdit={() => onEditReport(reportTestGroups)}
            handleApprove={() => onApproveReport(selectedReport?.id || "")}
            handleDownload={() => onDownloadReport(selectedReport?.id || "")}
          />
        </Box>
      </Stack>
    </>
  );
};
