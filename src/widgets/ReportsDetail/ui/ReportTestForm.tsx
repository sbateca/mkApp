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

import {AutoComplete} from "../../../shared/ui";
import {AnalysisMethod} from "../../../entities/analysisMethod";
import {Analyte} from "../../../entities/analyte";
import {getStackFieldProps} from "./ReportsDetailStyles";
import {getAutoCompleteOptionsFromModel} from "../../../utils/model";
import {
  ADD_MORE_TESTS_HINT_TEXT,
  BUTTON_LABELS,
  FormProps,
  isEmpty,
  REPORT_ANALYSIS_METHOD_LABEL_TEXT,
  REPORT_ANALYTE_LABEL_TEXT,
  REPORT_CRITERIA_LABEL_TEXT,
  REPORT_RESULT_LABEL_TEXT,
} from "../../../utils/constants";
import {
  ReportFormFields,
  SelectVariants,
  SharedButtonColors,
  SharedButtonSizes,
  SharedTextFieldVariants,
} from "../../../utils/enums";
import {AutoCompleteOption} from "../../../shared/ui/AutoComplete/types";
import {FieldValidations, FormError} from "../../../utils/hooks";
import React, {SyntheticEvent, useEffect, useState} from "react";
import {Box} from "@mui/system";
import {Criteria} from "../../../entities/criteria";

type ReportTestFormProps = {
  form: FormProps;
  setForm: React.Dispatch<React.SetStateAction<FormProps>>;
  isReadonly: boolean;
  analytes: Analyte[] | null;
  criterias: Criteria[] | null;
  analysisMethods: AnalysisMethod[] | null;
  formIndex: number;
  formFieldsErrors: FormError;
  setFormFieldsValidationFunctions: React.Dispatch<
    React.SetStateAction<FieldValidations>
  >;
  handleAutoCompleteChange: (
    _: SyntheticEvent,
    newValue: AutoCompleteOption | null,
    name: string,
  ) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  getTextFieldHelperText: (fieldName: string) => string;
  title: string;
};

export const ReportTestForm = ({
  form,
  setForm,
  isReadonly,
  analytes,
  criterias,
  analysisMethods,
  formIndex,
  formFieldsErrors,
  setFormFieldsValidationFunctions,
  handleAutoCompleteChange,
  handleChange,
  getTextFieldHelperText,
  title,
}: ReportTestFormProps) => {
  const defaultRowId = `${formIndex}-0`;
  const [rowsIds, setRowsIds] = useState<string[]>([defaultRowId]);
  const defaultValidations = [isEmpty];

  const getRowFields = (rowId: string): FormProps => ({
    [`${ReportFormFields.ANALYTE}-${rowId}`]: "",
    [`${ReportFormFields.ANALYSIS_METHOD}-${rowId}`]: "",
    [`${ReportFormFields.RESULT}-${rowId}`]: "",
    [`${ReportFormFields.CRITERIA}-${rowId}`]: "",
  });

  const getRowValidations = (rowFields: FormProps): FieldValidations =>
    Object.keys(rowFields).reduce<FieldValidations>((acc, key) => {
      acc[key] = [...defaultValidations];
      return acc;
    }, {});

  const handleAddTestFields = () => {
    const newRowId = `${formIndex}-${crypto.randomUUID()}`;
    const fieldsToAdd = getRowFields(newRowId);

    setRowsIds((prev) => [...prev, newRowId]);

    setForm((prevForm) => ({
      ...prevForm,
      ...fieldsToAdd,
    }));

    setFormFieldsValidationFunctions((prevValidations) => ({
      ...prevValidations,
      ...getRowValidations(fieldsToAdd),
    }));
  };

  const handleRemoveTestFields = (rowId: string) => {
    setRowsIds((prev) => prev.filter((id) => id !== rowId));

    const fieldsToRemove = Object.keys(getRowFields(rowId));

    setForm((prevForm) => {
      const newForm = {...prevForm};

      fieldsToRemove.forEach((fieldName) => {
        delete newForm[fieldName];
      });

      return newForm;
    });

    setFormFieldsValidationFunctions((prevValidations) => {
      const newValidations = {...prevValidations};

      fieldsToRemove.forEach((fieldName) => {
        delete newValidations[fieldName];
      });

      return newValidations;
    });
  };

  useEffect(() => {
    const defaultFields = getRowFields(defaultRowId);

    setForm((prevForm) => ({
      ...defaultFields,
      ...prevForm,
    }));

    setFormFieldsValidationFunctions((prevValidations) => ({
      ...prevValidations,
      ...getRowValidations(defaultFields),
    }));
  }, [
    defaultRowId,
    setForm,
    setFormFieldsValidationFunctions,
    getRowValidations,
  ]);

  return (
    <Card sx={{width: "100%"}}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>

        <Divider sx={{marginBottom: 2}} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2">Test</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2">Analysis Method</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle2">Result</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2">Criteria</Typography>
          </Grid>
          <Grid item xs={12} md={1}>
            <Typography variant="subtitle2">Action</Typography>
          </Grid>

          {rowsIds.map((rowId) => {
            const analyteFieldName = `${ReportFormFields.ANALYTE}-${rowId}`;
            const analysisMethodFieldName = `${ReportFormFields.ANALYSIS_METHOD}-${rowId}`;
            const resultFieldName = `${ReportFormFields.RESULT}-${rowId}`;
            const criteriaFieldName = `${ReportFormFields.CRITERIA}-${rowId}`;

            return (
              <React.Fragment key={rowId}>
                <Grid item xs={12} sm={6} md={3}>
                  <Stack {...getStackFieldProps()}>
                    <AutoComplete
                      options={getAutoCompleteOptionsFromModel(analytes)}
                      label={REPORT_ANALYTE_LABEL_TEXT}
                      value={`${form[analyteFieldName]}`}
                      variant={SelectVariants.STANDARD}
                      onChange={handleAutoCompleteChange}
                      name={analyteFieldName}
                      readOnly={isReadonly}
                      required
                      error={!!formFieldsErrors[analyteFieldName]}
                      helperText={getTextFieldHelperText(analyteFieldName)}
                    />
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Stack {...getStackFieldProps()}>
                    <AutoComplete
                      options={getAutoCompleteOptionsFromModel(analysisMethods)}
                      label={REPORT_ANALYSIS_METHOD_LABEL_TEXT}
                      value={`${form[analysisMethodFieldName]}`}
                      variant={SelectVariants.STANDARD}
                      onChange={handleAutoCompleteChange}
                      name={analysisMethodFieldName}
                      readOnly={isReadonly}
                      required
                      error={!!formFieldsErrors[analysisMethodFieldName]}
                      helperText={getTextFieldHelperText(
                        analysisMethodFieldName,
                      )}
                    />
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <Stack {...getStackFieldProps()}>
                    <TextField
                      required
                      error={!!formFieldsErrors[resultFieldName]}
                      label={REPORT_RESULT_LABEL_TEXT}
                      type="text"
                      color={SharedButtonColors.PRIMARY}
                      size={SharedButtonSizes.SMALL}
                      onChange={handleChange}
                      name={resultFieldName}
                      helperText={getTextFieldHelperText(resultFieldName)}
                      value={form[resultFieldName] ?? ""}
                      variant={SharedTextFieldVariants.STANDARD}
                      fullWidth
                      InputProps={{
                        readOnly: isReadonly,
                      }}
                    />
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Stack {...getStackFieldProps()}>
                    <AutoComplete
                      options={getAutoCompleteOptionsFromModel(criterias)}
                      label={REPORT_CRITERIA_LABEL_TEXT}
                      value={`${form[criteriaFieldName]}`}
                      variant={SelectVariants.STANDARD}
                      onChange={handleAutoCompleteChange}
                      name={criteriaFieldName}
                      readOnly={isReadonly}
                      required
                      error={!!formFieldsErrors[criteriaFieldName]}
                      helperText={getTextFieldHelperText(criteriaFieldName)}
                    />
                  </Stack>
                </Grid>

                <Grid item xs={12} md={1}>
                  <Stack>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      size="small"
                      onClick={() => handleRemoveTestFields(rowId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
        <Box sx={{display: "flex", justifyContent: "flex-end", marginTop: 2}}>
          <Typography variant="caption" color="text.secondary">
            {ADD_MORE_TESTS_HINT_TEXT}
          </Typography>
        </Box>
        <Box sx={{display: "flex", justifyContent: "flex-end", marginTop: 2}}>
          <Button variant="text" onClick={handleAddTestFields}>
            {BUTTON_LABELS.ADD_TEST}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
