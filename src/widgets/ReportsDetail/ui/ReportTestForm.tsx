import {useInterfaceTranslation} from "../../../shared/i18n/useInterfaceTranslation";
import React from "react";
import {
  Button,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddOutlined from "@mui/icons-material/AddOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import {Box} from "@mui/system";

import {AutoComplete} from "../../../shared/ui";
import {AnalysisMethod} from "../../../entities/analysisMethod";
import {Analyte} from "../../../entities/analyte";
import {Criteria} from "../../../entities/criteria";
import {getAutoCompleteOptionsFromModel} from "../../../utils/model";
import {
  ADD_MORE_TESTS_HINT_TEXT,
  BUTTON_LABELS,
  REPORT_ANALYSIS_METHOD_LABEL_TEXT,
  REPORT_ANALYTE_LABEL_TEXT,
  REPORT_CRITERIA_LABEL_TEXT,
  REPORT_RESULT_LABEL_TEXT,
} from "../../../utils/constants";
import {
  ReportFormFields,
  SelectVariants,
  SharedButtonColors,
  SharedButtonCommonLabels,
  SharedButtonSizes,
  SharedTextFieldVariants,
} from "../../../utils/enums";
import {ReportTestRow, ReportTestRowField} from "../model/types";
import {
  addReportTestRow,
  getAutoCompleteValue,
  getRequiredReportTestFieldError,
  removeReportTestRow,
  updateReportTestRow,
} from "../model/useReportTestGroups";
import {formSectionSx, getStackFieldProps} from "../../../shared/commonStyles";
import {useReadOnlyMode} from "../../../features/readOnlyMode";

type ReportTestFormProps = {
  hasCompleteReportTestRow: boolean;
  analytes: Analyte[] | null;
  criterias: Criteria[] | null;
  analysisMethods: AnalysisMethod[] | null;
  title: string;
  rows: ReportTestRow[];
  onRowsChange: (nextRows: ReportTestRow[]) => void;
};

export const ReportTestForm = ({
  hasCompleteReportTestRow,
  analytes,
  criterias,
  analysisMethods,
  title,
  rows,
  onRowsChange,
}: ReportTestFormProps): React.ReactElement => {
  const {t} = useInterfaceTranslation();
  const {isReadOnlyMode} = useReadOnlyMode();

  const handleAddTestFields = () => {
    onRowsChange(addReportTestRow(rows));
  };

  const handleRemoveTestFields = (rowId: string) => {
    onRowsChange(removeReportTestRow(rows, rowId));
  };

  const handleRowChange = (
    rowId: string,
    fieldName: ReportTestRowField,
    value: string,
  ) => {
    onRowsChange(updateReportTestRow(rows, rowId, fieldName, value));
  };

  const analyteOptions = getAutoCompleteOptionsFromModel(analytes);
  const analysisMethodOptions =
    getAutoCompleteOptionsFromModel(analysisMethods);
  const criteriaOptions = getAutoCompleteOptionsFromModel(criterias);

  return (
    <Stack component="section" gap={2} sx={formSectionSx}>
      <Stack
        direction="row"
        flexWrap="wrap"
        gap={1}
        justifyContent="space-between"
      >
        <Box>
          <Typography component="h2" fontWeight={750}>
            {title}
          </Typography>
          {!isReadOnlyMode && (
            <Typography variant="body2" color="text.secondary">
              {t(ADD_MORE_TESTS_HINT_TEXT)}
            </Typography>
          )}
        </Box>
        {!isReadOnlyMode && (
          <Button
            variant="outlined"
            size="small"
            startIcon={<AddOutlined />}
            onClick={handleAddTestFields}
            sx={{alignSelf: "flex-start"}}
          >
            {t(BUTTON_LABELS.ADD_TEST)}
          </Button>
        )}
      </Stack>
      {rows.map((row) => {
        const analyteError = getRequiredReportTestFieldError(
          row,
          ReportFormFields.ANALYTE_ID,
          hasCompleteReportTestRow,
          isReadOnlyMode,
        );
        const analysisMethodError = getRequiredReportTestFieldError(
          row,
          ReportFormFields.ANALYSIS_METHOD_ID,
          hasCompleteReportTestRow,
          isReadOnlyMode,
        );
        const resultError = getRequiredReportTestFieldError(
          row,
          ReportFormFields.RESULT,
          hasCompleteReportTestRow,
          isReadOnlyMode,
        );
        const criteriaError = getRequiredReportTestFieldError(
          row,
          ReportFormFields.CRITERIA_ID,
          hasCompleteReportTestRow,
          isReadOnlyMode,
        );

        return (
          <Box
            key={row.id}
            sx={{
              p: 2,
              bgcolor: "background.default",
              border: 1,
              borderColor: "divider",
              borderRadius: "12px",
            }}
          >
            <Grid container spacing={2} alignItems="flex-start">
              <Grid item xs={12} sm={6}>
                <Stack {...getStackFieldProps()}>
                  <AutoComplete
                    options={analyteOptions}
                    label={t(REPORT_ANALYTE_LABEL_TEXT)}
                    value={getAutoCompleteValue(analyteOptions, row.analyteId)}
                    variant={SelectVariants.OUTLINED}
                    onChange={(_, newValue) =>
                      handleRowChange(
                        row.id,
                        ReportFormFields.ANALYTE_ID,
                        newValue?.id ?? "",
                      )
                    }
                    name={ReportFormFields.ANALYTE_ID}
                    readOnly={isReadOnlyMode}
                    required
                    error={!!analyteError}
                    helperText={t(analyteError)}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack {...getStackFieldProps()}>
                  <AutoComplete
                    options={analysisMethodOptions}
                    label={t(REPORT_ANALYSIS_METHOD_LABEL_TEXT)}
                    value={getAutoCompleteValue(
                      analysisMethodOptions,
                      row.analysisMethodId,
                    )}
                    variant={SelectVariants.OUTLINED}
                    onChange={(_, newValue) =>
                      handleRowChange(
                        row.id,
                        ReportFormFields.ANALYSIS_METHOD_ID,
                        newValue?.id ?? "",
                      )
                    }
                    name={ReportFormFields.ANALYSIS_METHOD_ID}
                    readOnly={isReadOnlyMode}
                    required
                    error={!!analysisMethodError}
                    helperText={t(analysisMethodError)}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack {...getStackFieldProps()}>
                  <TextField
                    required
                    label={t(REPORT_RESULT_LABEL_TEXT)}
                    type="text"
                    color={SharedButtonColors.PRIMARY}
                    size={SharedButtonSizes.SMALL}
                    onChange={(event) =>
                      handleRowChange(
                        row.id,
                        ReportFormFields.RESULT,
                        event.target.value,
                      )
                    }
                    name={ReportFormFields.RESULT}
                    value={row.result}
                    variant={SharedTextFieldVariants.OUTLINED}
                    fullWidth
                    error={!!resultError}
                    helperText={t(resultError)}
                    InputProps={{
                      readOnly: isReadOnlyMode,
                    }}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack {...getStackFieldProps()}>
                  <AutoComplete
                    options={criteriaOptions}
                    label={t(REPORT_CRITERIA_LABEL_TEXT)}
                    value={getAutoCompleteValue(
                      criteriaOptions,
                      row.criteriaId,
                    )}
                    variant={SelectVariants.OUTLINED}
                    onChange={(_, newValue) =>
                      handleRowChange(
                        row.id,
                        ReportFormFields.CRITERIA_ID,
                        newValue?.id ?? "",
                      )
                    }
                    name={ReportFormFields.CRITERIA_ID}
                    readOnly={isReadOnlyMode}
                    required
                    error={!!criteriaError}
                    helperText={t(criteriaError)}
                  />
                </Stack>
              </Grid>

              <Grid
                item
                xs={12}
                sx={{display: "flex", justifyContent: "flex-end"}}
              >
                <Stack>
                  <IconButton
                    aria-label={t(SharedButtonCommonLabels.DELETE)}
                    color={SharedButtonColors.ERROR}
                    size={SharedButtonSizes.SMALL}
                    disabled={isReadOnlyMode}
                    onClick={() => handleRemoveTestFields(row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        );
      })}
    </Stack>
  );
};
