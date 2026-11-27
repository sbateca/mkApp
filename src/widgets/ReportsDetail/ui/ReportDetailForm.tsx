import {useWorkspacePermissions} from "../../../entities/auth/model/workspacePermissions";
import {useInterfaceTranslation} from "../../../shared/i18n/useInterfaceTranslation";
import {LocalizedDateProvider} from "../../../shared/i18n/LocalizedDateProvider";
import React, {useId, useState} from "react";
import AddOutlined from "@mui/icons-material/AddOutlined";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  TextField,
  Typography,
} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";

import {
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
import {InlineSampleForm} from "./InlineSampleForm";
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
import {
  createReportTestGroup,
  toReportTestGroups,
} from "../model/useReportTestGroups";
import {getAutoCompleteOptionsFromModel} from "../../../utils/model";
import {useReadOnlyMode} from "../../../features/readOnlyMode";

export const ReportDetailForm = ({
  isLessThanMediumScreen,
  catalogs,
  detailForm,
  state,
  actions,
}: DetailFormProps): React.ReactElement => {
  const {t} = useInterfaceTranslation();
  const {canCreateSample} = useWorkspacePermissions();
  const inlineSampleFormId = useId();
  const [showSampleForm, setShowSampleForm] = useState(false);
  const {
    analysisMethods,
    analytes,
    criterias,
    testTypes,
    sampleTypeOptionsFromSamples,
    sampleTypes,
  } = catalogs;

  const {
    form,
    formFieldsErrors,
    handleChange,
    handleDateChange,
    handleAutoCompleteChange,
    getTextFieldHelperText,
    groups,
    setGroups,
    areReportTestsValid,
  } = detailForm;

  const {isReadOnlyMode} = useReadOnlyMode();

  const {selectedReport, selectedSample} = state;
  const {onCreateReport, onEditReport, onSampleCreated} = actions;
  const testTypeOptions = getAutoCompleteOptionsFromModel(testTypes);
  const methodOptions = getAutoCompleteOptionsFromModel(analysisMethods);
  const criteriaOptions = getAutoCompleteOptionsFromModel(criterias);

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

            <Stack
              {...getStackFieldProps()}
              direction="row"
              alignItems="flex-start"
              gap={0.5}
            >
              <AutoComplete
                sx={{flex: 1, minWidth: 0}}
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
              {!selectedReport && canCreateSample && (
                <Tooltip title={t("Add sample")}>
                  <IconButton
                    color="primary"
                    aria-label={t("Add sample")}
                    aria-expanded={showSampleForm}
                    aria-controls={
                      showSampleForm ? inlineSampleFormId : undefined
                    }
                    onClick={() => setShowSampleForm(true)}
                  >
                    <AddOutlined fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          </Stack>
        </Stack>
        {showSampleForm && canCreateSample ? (
          <InlineSampleForm
            id={inlineSampleFormId}
            sampleTypes={sampleTypes}
            isLessThanMediumScreen={isLessThanMediumScreen}
            onCancel={() => setShowSampleForm(false)}
            onCreated={(sample) => {
              onSampleCreated(sample);
              setShowSampleForm(false);
            }}
          />
        ) : (
          <SampleReportDetails sample={selectedSample} />
        )}

        <Stack component="section" gap={2}>
          <Stack
            direction="row"
            gap={1}
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography component="h2" fontWeight={750}>
              {t("Analytes")}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AddOutlined />}
              onClick={() =>
                setGroups((current) => [...current, createReportTestGroup()])
              }
            >
              {t("Add analyte")}
            </Button>
          </Stack>
          {groups.map((group, index) => {
            const usedAnalytes = new Set(
              groups
                .filter(
                  ({id, testTypeId}) =>
                    id !== group.id && testTypeId === group.testTypeId,
                )
                .map(({analyteId}) => analyteId),
            );
            const matchingAnalytes = (analytes ?? []).filter(
              ({id, testType}) =>
                id === group.analyteId ||
                (testType.id === group.testTypeId && !usedAnalytes.has(id)),
            );
            const savedTest = selectedReport?.tests.find(
              (test) =>
                test.testType.id === group.testTypeId &&
                test.analyte.id === group.analyteId,
            );
            if (
              savedTest &&
              !matchingAnalytes.some(({id}) => id === group.analyteId)
            ) {
              matchingAnalytes.push(savedTest.analyte);
            }
            const savedTestType = savedTest?.testType;
            const groupTestTypes =
              savedTestType &&
              !testTypeOptions.some(({id}) => id === savedTestType.id)
                ? [
                    ...testTypeOptions,
                    {id: savedTestType.id, optionLabel: savedTestType.name},
                  ]
                : testTypeOptions;

            return (
              <ReportTestForm
                key={group.id}
                group={group}
                number={index + 1}
                testTypes={groupTestTypes}
                analytes={getAutoCompleteOptionsFromModel(matchingAnalytes)}
                methods={methodOptions}
                criteria={criteriaOptions}
                onChange={(nextGroup) =>
                  setGroups((current) =>
                    current.map((item) =>
                      item.id === nextGroup.id ? nextGroup : item,
                    ),
                  )
                }
                onRemove={() =>
                  setGroups((current) =>
                    current.filter(({id}) => id !== group.id),
                  )
                }
              />
            );
          })}
        </Stack>
        <Box sx={formActionsSx}>
          <ReportSideSectionButtons
            mode="edit"
            isNotValidForm={
              (showSampleForm && canCreateSample) ||
              detailForm.isNotValidForm ||
              !areReportTestsValid
            }
            report={selectedReport}
            handleCreateReport={() =>
              onCreateReport(toReportTestGroups(groups))
            }
            handleEdit={() => onEditReport(toReportTestGroups(groups))}
          />
        </Box>
      </Stack>
    </>
  );
};
