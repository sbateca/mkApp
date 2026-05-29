import React from "react";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {Box} from "@mui/system";

import {AutoComplete} from "../../../shared/ui";
import {AnalysisMethod} from "../../../entities/analysisMethod";
import {Analyte} from "../../../entities/analyte";
import {Criteria} from "../../../entities/criteria";
import {testFormButtonProps} from "./ReportsDetailStyles";
import {getAutoCompleteOptionsFromModel} from "../../../utils/model";
import {
  ADD_MORE_TESTS_HINT_TEXT,
  BUTTON_LABELS,
  REPORT_ANALYSIS_METHOD_LABEL_TEXT,
  REPORT_ANALYTE_LABEL_TEXT,
  REPORT_CRITERIA_LABEL_TEXT,
  REPORT_RESULT_LABEL_TEXT,
  REPORT_TEST_LABELS,
} from "../../../utils/constants";
import {
  ReportFormFields,
  SelectVariants,
  SharedButtonColors,
  SharedButtonCommonLabels,
  SharedButtonSizes,
  SharedTextFieldVariants,
  SharedTypographyColors,
  SharedTypographyVariants,
} from "../../../utils/enums";
import {ReportTestRow, ReportTestRowField} from "../model/types";
import {
  addReportTestRow,
  getAutoCompleteValue,
  getRequiredReportTestFieldError,
  removeReportTestRow,
  updateReportTestRow,
} from "../model/useReportTestGroups";
import {getStackFieldProps} from "../../../shared/commonStyles";

type ReportTestFormProps = {
  isReadonly: boolean;
  hasCompleteReportTestRow: boolean;
  analytes: Analyte[] | null;
  criterias: Criteria[] | null;
  analysisMethods: AnalysisMethod[] | null;
  title: string;
  rows: ReportTestRow[];
  onRowsChange: (nextRows: ReportTestRow[]) => void;
};

export const ReportTestForm = ({
  isReadonly,
  hasCompleteReportTestRow,
  analytes,
  criterias,
  analysisMethods,
  title,
  rows,
  onRowsChange,
}: ReportTestFormProps): React.ReactElement => {
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
    <Card sx={{width: "100%"}}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>

        <Divider sx={{marginBottom: 2}} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant={SharedTypographyVariants.SUBTITLE2}>
              {REPORT_TEST_LABELS.TEST}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant={SharedTypographyVariants.SUBTITLE2}>
              {REPORT_TEST_LABELS.ANALYSIS_METHOD}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant={SharedTypographyVariants.SUBTITLE2}>
              {REPORT_TEST_LABELS.RESULT}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant={SharedTypographyVariants.SUBTITLE2}>
              {REPORT_TEST_LABELS.CRITERIA}
            </Typography>
          </Grid>

          <Grid item xs={12} md={1}>
            <Typography variant={SharedTypographyVariants.SUBTITLE2}>
              {REPORT_TEST_LABELS.ACTION}
            </Typography>
          </Grid>

          {rows.map((row) => {
            const analyteError = getRequiredReportTestFieldError(
              row,
              ReportFormFields.ANALYTE_ID,
              hasCompleteReportTestRow,
              isReadonly,
            );
            const analysisMethodError = getRequiredReportTestFieldError(
              row,
              ReportFormFields.ANALYSIS_METHOD_ID,
              hasCompleteReportTestRow,
              isReadonly,
            );
            const resultError = getRequiredReportTestFieldError(
              row,
              ReportFormFields.RESULT,
              hasCompleteReportTestRow,
              isReadonly,
            );
            const criteriaError = getRequiredReportTestFieldError(
              row,
              ReportFormFields.CRITERIA_ID,
              hasCompleteReportTestRow,
              isReadonly,
            );

            return (
              <React.Fragment key={row.id}>
                <Grid item xs={12} sm={6} md={3}>
                  <Stack {...getStackFieldProps()}>
                    <AutoComplete
                      options={analyteOptions}
                      label={REPORT_ANALYTE_LABEL_TEXT}
                      value={getAutoCompleteValue(
                        analyteOptions,
                        row.analyteId,
                      )}
                      variant={SelectVariants.STANDARD}
                      onChange={(_, newValue) =>
                        handleRowChange(
                          row.id,
                          ReportFormFields.ANALYTE_ID,
                          newValue?.id ?? "",
                        )
                      }
                      name={ReportFormFields.ANALYTE_ID}
                      readOnly={isReadonly}
                      required
                      error={!!analyteError}
                      helperText={analyteError}
                    />
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Stack {...getStackFieldProps()}>
                    <AutoComplete
                      options={analysisMethodOptions}
                      label={REPORT_ANALYSIS_METHOD_LABEL_TEXT}
                      value={getAutoCompleteValue(
                        analysisMethodOptions,
                        row.analysisMethodId,
                      )}
                      variant={SelectVariants.STANDARD}
                      onChange={(_, newValue) =>
                        handleRowChange(
                          row.id,
                          ReportFormFields.ANALYSIS_METHOD_ID,
                          newValue?.id ?? "",
                        )
                      }
                      name={ReportFormFields.ANALYSIS_METHOD_ID}
                      readOnly={isReadonly}
                      required
                      error={!!analysisMethodError}
                      helperText={analysisMethodError}
                    />
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <Stack {...getStackFieldProps()}>
                    <TextField
                      required
                      label={REPORT_RESULT_LABEL_TEXT}
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
                      variant={SharedTextFieldVariants.STANDARD}
                      fullWidth
                      error={!!resultError}
                      helperText={resultError}
                      InputProps={{
                        readOnly: isReadonly,
                      }}
                    />
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Stack {...getStackFieldProps()}>
                    <AutoComplete
                      options={criteriaOptions}
                      label={REPORT_CRITERIA_LABEL_TEXT}
                      value={getAutoCompleteValue(
                        criteriaOptions,
                        row.criteriaId,
                      )}
                      variant={SelectVariants.STANDARD}
                      onChange={(_, newValue) =>
                        handleRowChange(
                          row.id,
                          ReportFormFields.CRITERIA_ID,
                          newValue?.id ?? "",
                        )
                      }
                      name={ReportFormFields.CRITERIA_ID}
                      readOnly={isReadonly}
                      required
                      error={!!criteriaError}
                      helperText={criteriaError}
                    />
                  </Stack>
                </Grid>

                <Grid item xs={12} md={1}>
                  <Stack>
                    <IconButton
                      aria-label={SharedButtonCommonLabels.DELETE}
                      color={SharedButtonColors.ERROR}
                      size={SharedButtonSizes.SMALL}
                      disabled={isReadonly}
                      onClick={() => handleRemoveTestFields(row.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>

        <Box {...testFormButtonProps()}>
          <Typography
            variant={SharedTypographyVariants.CAPTION}
            color={SharedTypographyColors.TEXT_SECONDARY}
          >
            {ADD_MORE_TESTS_HINT_TEXT}
          </Typography>
        </Box>

        <Box {...testFormButtonProps()}>
          <Button
            variant="text"
            disabled={isReadonly}
            onClick={handleAddTestFields}
          >
            {BUTTON_LABELS.ADD_TEST}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
