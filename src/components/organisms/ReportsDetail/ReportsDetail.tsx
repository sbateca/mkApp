import React, {useEffect, useState} from "react";

import {
  Box,
  Chip,
  Divider,
  Stack,
  TextField,
  Theme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {SxProps} from "@mui/material/styles";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import {Typography, Button, Spinner} from "../../atoms";
import {AutoComplete} from "../../molecules";
import {ReportSideSectionButtons} from "./ReportsSideSectionButtons";
import {SampleReportDetails} from "./SampleReportDetails";
import {AutoCompleteOption} from "../../molecules/AutoComplete/types";
import {
  ReportFormFields,
  SelectVariants,
  SharedButtonColors,
  SharedButtonCommonLabels,
  SharedButtonSizes,
  SharedButtonVariants,
  SharedChipColors,
  SharedChipSizes,
  SharedTextFieldVariants,
  SharedTypographyAlign,
  SharedTypographyColors,
  SharedTypographyVariants,
  SnackBarSeverity,
} from "../../../utils/enums";
import {
  REPORT_SAMPLE_LABEL_TEXT,
  REPORT_ANALYTE_LABEL_TEXT,
  REPORT_ANALYSIS_METHOD_LABEL_TEXT,
  REPORT_CRITERIA_LABEL_TEXT,
  REPORT_DATE_LABEL_TEXT,
  REPORT_RESULT_LABEL_TEXT,
  SAMPLE_SUCCESSFULLY_UPDATED_TEXT,
  REPORT_SUCCESSFULLY_CREATED_TEXT,
  DATEPICKER_FORMAT,
  DATEPICKER_VIEWS,
  isEmpty,
  isNotValidDate,
  FormProps,
} from "../../../utils/constants";

import {
  reportFormToReport,
  reportToReportForm,
} from "../../../adapters/reports";
import {getAutoCompleteOptionsFromModel} from "../../../utils/model";
import {
  useSample,
  useSampleType,
  useAnalysisMethod,
  useAnalyte,
  useCriteria,
  useClient,
  useReports,
  useSideSection,
  useForm,
  useSnackBar,
} from "../../../utils/hooks";
import {
  BoxContainerProps,
  ReportDetailProps,
  StackContainerProps,
  StackFieldProps,
  StackRowDirectionSpacingPropsProps,
} from "./Types";
import {ReportDetailStyles, SampleFormStyles} from "./ReportsDetailStyles";

export const ReportDetail = ({
  isReadOnlyMode,
  setIsReadOnlyMode,
}: ReportDetailProps): React.ReactElement => {
  const today = dayjs();
  const theme = useTheme<Theme>();
  const isLessThanMediumScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    getReports,
    createReport,
    editReport,
    selectedReport,
    isLoading,
    error,
  } = useReports();
  const {
    samples,
    selectedSample,
    isLoading: isLoadingSample,
    getSampleById,
    setSelectedSample,
  } = useSample();
  const {clients, isLoading: isLoadingClients} = useClient();
  const {sampleTypes, isLoading: isLoadingSampleTypes} = useSampleType();
  const {analysisMethods, isLoading: isLoadingAnalysisMethods} =
    useAnalysisMethod();
  const {analytes, isLoading: isLoadingAnalytes} = useAnalyte();
  const {criterias, isLoading: isLoadingCriterias} = useCriteria();
  const {setIsSideSectionOpen, sideSectionTitle} = useSideSection();
  const {showSnackBarMessage} = useSnackBar();
  const [loadingState, setLoadingState] = useState(false);

  const defaultFormValue: FormProps = {
    reportDate: today.format(DATEPICKER_FORMAT),
    sampleId: selectedReport?.sampleId ?? "",
    analyte: "",
    analysisMethod: "",
    criteria: "",
    result: "",
  };
  const {
    isNotValidForm,
    form,
    setForm,
    formFieldsErrors,
    handleChange,
    handleDateChange,
    handleAutoCompleteChange,
    getTextFieldHelperText,
    setFormFieldsValidationFunctions,
    cleanForm,
  } = useForm();

  const handleCloseSideSection = () => {
    if (setIsSideSectionOpen) {
      setIsSideSectionOpen(false);
      setIsReadOnlyMode(true);
    }
  };

  const handleCreateReport = async () => {
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

  const handleEdit = async () => {
    const parsedReport = reportFormToReport(form, selectedReport?.id ?? "");
    const updatedReport = await editReport(selectedReport?.id, parsedReport);
    if (updatedReport !== null) {
      handleCloseSideSection();
      showSnackBarMessage(
        SAMPLE_SUCCESSFULLY_UPDATED_TEXT,
        SnackBarSeverity.SUCCESS,
        getReports,
      );
    }
  };

  const getBoxContainerProps = (
    isLessThanMediumScreen: boolean,
  ): BoxContainerProps => {
    return {
      display: "flex",
      flexDirection: "column",
      padding: "20px",
      width: isLessThanMediumScreen ? "80vw" : "60vw",
      height: "100%",
    };
  };

  const getStackContainerProps = (
    isLessThanMediumScreen: boolean,
  ): StackContainerProps => {
    return {
      spacing: 2,
      marginTop: "20px",
      padding: isLessThanMediumScreen ? "5px" : "10px",
      height: "auto",
    };
  };

  const getStackRowProps = (
    isMediumScreen: boolean,
  ): StackRowDirectionSpacingPropsProps => {
    return {
      gap: isMediumScreen ? "5px" : "10px",
      direction: isMediumScreen ? "column" : "row",
      spacing: isMediumScreen ? 2 : 0,
    };
  };

  const getStackFieldProps = (): StackFieldProps => {
    return {
      width: "100%",
    };
  };

  const getEditModeChip = (): React.ReactNode => {
    if (selectedReport) {
      return (
        <Stack direction={"row"} spacing={1} sx={{marginLeft: "10px"}}>
          <Typography
            text={"Edit mode"}
            variant={SharedTypographyVariants.CAPTION}
            align={SharedTypographyAlign.LEFT}
            color={SharedTypographyColors.TEXT_SECONDARY}
            padding="0 0 5px 0"
            sx={{alignSelf: "center"}}
          />
          {isReadOnlyMode ? (
            <Chip
              label="OFF"
              size={SharedChipSizes.SMALL}
              color={SharedChipColors.DEFAULT}
            />
          ) : (
            <Chip
              label="ON"
              size={SharedChipSizes.SMALL}
              color={SharedChipColors.SUCCESS}
            />
          )}
        </Stack>
      );
    }
    return null;
  };

  const getSampleTypeAutoCompleteOptionsFromSamples =
    (): AutoCompleteOption[] => {
      return (
        samples?.map((sample) => {
          const sampleTypeFound = sampleTypes?.find(
            (sampleType) => sampleType.id === sample.sampleTypeId,
          );
          return {
            id: sample.id,
            optionLabel:
              `${sample.sampleCode} - ${sampleTypeFound?.name}` ?? "",
          };
        }) ?? []
      );
    };

  useEffect(() => {
    setFormFieldsValidationFunctions({
      reportDate: [isEmpty, isNotValidDate],
      sampleId: [isEmpty],
      analyte: [isEmpty],
      analysisMethod: [isEmpty],
      criteria: [isEmpty],
      result: [isEmpty],
    });
    cleanForm(defaultFormValue);
  }, []);

  useEffect(() => {
    if (selectedReport) {
      setForm(reportToReportForm(selectedReport));
    }
  }, []);

  useEffect(() => {
    if (error) {
      showSnackBarMessage(error, SnackBarSeverity.ERROR);
    }
  }, [error]);

  useEffect(() => {
    if (
      isLoadingClients ||
      isLoadingSampleTypes ||
      isLoadingAnalysisMethods ||
      isLoadingAnalytes ||
      isLoadingCriterias
    ) {
      setLoadingState(true);
    }
  }, [
    isLoadingClients,
    isLoadingSampleTypes,
    isLoadingAnalysisMethods,
    isLoadingAnalytes,
    isLoadingCriterias,
  ]);

  useEffect(() => {
    const getSample = async () => {
      const selectedSample = await getSampleById(form?.sampleId || "");
      if (form.sampleId === "") {
        setSelectedSample(null);
      } else {
        setSelectedSample(selectedSample);
      }
    };
    getSample();
  }, [selectedReport, form.sampleId]);

  return (
    <Box sx={getBoxContainerProps(isLessThanMediumScreen) as SxProps}>
      <Stack direction="row">
        <Stack direction={"row"}>
          <Typography
            text={sideSectionTitle}
            variant={SharedTypographyVariants.H6}
            align={SharedTypographyAlign.LEFT}
            color={SharedTypographyColors.PRIMARY}
            padding="0 0 5px 0"
          />
          {getEditModeChip()}
        </Stack>
        <Button
          disabled={isLoading}
          label={SharedButtonCommonLabels.CLOSE}
          variant={SharedButtonVariants.OUTLINED}
          size={SharedButtonSizes.SMALL}
          color={SharedButtonColors.ERROR}
          icon="close"
          onClick={handleCloseSideSection}
          sx={ReportDetailStyles.closeButton}
        />
      </Stack>
      <Divider />
      {loadingState ? (
        <Spinner />
      ) : (
        <Stack {...getStackContainerProps(isLessThanMediumScreen)}>
          <Stack {...getStackRowProps(isLessThanMediumScreen)}>
            <Stack {...getStackFieldProps()}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={SampleFormStyles.datePicker}
                  disableFuture
                  defaultValue={today}
                  views={DATEPICKER_VIEWS}
                  label={REPORT_DATE_LABEL_TEXT}
                  name={ReportFormFields.REPORT_DATE}
                  onChange={(value) =>
                    handleDateChange(value, ReportFormFields.REPORT_DATE)
                  }
                  slotProps={{
                    textField: {
                      error: !!formFieldsErrors[ReportFormFields.REPORT_DATE],
                      helperText: getTextFieldHelperText(
                        ReportFormFields.REPORT_DATE,
                      ),
                      variant: SharedTextFieldVariants.STANDARD,
                    },
                  }}
                  value={dayjs(form.reportDate) ?? null}
                  readOnly={isReadOnlyMode}
                />
              </LocalizationProvider>
            </Stack>
            <Stack {...getStackFieldProps()}>
              <AutoComplete
                options={getSampleTypeAutoCompleteOptionsFromSamples()}
                label={REPORT_SAMPLE_LABEL_TEXT}
                value={form.sampleId}
                variant={SelectVariants.STANDARD}
                onChange={handleAutoCompleteChange}
                name={ReportFormFields.SAMPLE_ID}
                readOnly={isReadOnlyMode}
                required
                error={!!formFieldsErrors[ReportFormFields.SAMPLE_ID]}
                helperText={getTextFieldHelperText(ReportFormFields.SAMPLE_ID)}
              />
            </Stack>
          </Stack>
          <Stack {...getStackRowProps(isLessThanMediumScreen)}>
            <Stack {...getStackFieldProps()}>
              <AutoComplete
                options={getAutoCompleteOptionsFromModel(analytes)}
                label={REPORT_ANALYTE_LABEL_TEXT}
                value={form.analyte}
                variant={SelectVariants.STANDARD}
                onChange={handleAutoCompleteChange}
                name={ReportFormFields.ANALYTE}
                readOnly={isReadOnlyMode}
                required
                error={!!formFieldsErrors[ReportFormFields.ANALYTE]}
                helperText={getTextFieldHelperText(ReportFormFields.ANALYTE)}
              />
            </Stack>
            <Stack {...getStackFieldProps()}>
              <AutoComplete
                options={getAutoCompleteOptionsFromModel(analysisMethods)}
                label={REPORT_ANALYSIS_METHOD_LABEL_TEXT}
                value={form.analysisMethod}
                variant={SelectVariants.STANDARD}
                onChange={handleAutoCompleteChange}
                name={ReportFormFields.ANALYSIS_METHOD}
                readOnly={isReadOnlyMode}
                required
                error={!!formFieldsErrors[ReportFormFields.ANALYSIS_METHOD]}
                helperText={getTextFieldHelperText(
                  ReportFormFields.ANALYSIS_METHOD,
                )}
              />
            </Stack>
          </Stack>
          <Stack {...getStackRowProps(isLessThanMediumScreen)}>
            <Stack {...getStackFieldProps()}>
              <AutoComplete
                options={getAutoCompleteOptionsFromModel(criterias)}
                label={REPORT_CRITERIA_LABEL_TEXT}
                value={form.criteria}
                variant={SelectVariants.STANDARD}
                onChange={handleAutoCompleteChange}
                name={ReportFormFields.CRITERIA}
                readOnly={isReadOnlyMode}
                required
                error={!!formFieldsErrors[ReportFormFields.CRITERIA]}
                helperText={getTextFieldHelperText(ReportFormFields.CRITERIA)}
              />
            </Stack>
            <Stack {...getStackFieldProps()}>
              <TextField
                required
                error={!!formFieldsErrors[ReportFormFields.RESULT]}
                label={REPORT_RESULT_LABEL_TEXT}
                type="string"
                color={SharedButtonColors.PRIMARY}
                size={SharedButtonSizes.SMALL}
                onChange={handleChange}
                name={ReportFormFields.RESULT}
                helperText={getTextFieldHelperText(ReportFormFields.RESULT)}
                value={form.result ?? ""}
                variant={SharedTextFieldVariants.STANDARD}
                fullWidth={true}
                InputProps={{
                  readOnly: isReadOnlyMode,
                }}
              />
            </Stack>
          </Stack>
        </Stack>
      )}
      <Box sx={ReportDetailStyles.sampleDetailsContainer}>
        <SampleReportDetails
          sample={selectedSample}
          clients={clients || []}
          sampleTypes={sampleTypes || []}
          isLoadingSample={isLoadingSample}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignSelf: "flex-end",
          justifyContent: "flex-end",
          marginTop: "10px",
        }}
      >
        <ReportSideSectionButtons
          isNotValidForm={isNotValidForm}
          report={selectedReport}
          isReadOnlyMode={isReadOnlyMode}
          setIsReadOnlyMode={setIsReadOnlyMode}
          handleCreateReport={handleCreateReport}
          handleEdit={handleEdit}
        />
      </Box>
    </Box>
  );
};
