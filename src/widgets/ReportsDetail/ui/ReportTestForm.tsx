import DeleteIcon from "@mui/icons-material/Delete";
import {Box, Grid, IconButton, Stack, TextField} from "@mui/material";
import {AutoComplete} from "../../../shared/ui";
import {AutoCompleteOption} from "../../../shared/ui/AutoComplete/types";
import {formSectionSx} from "../../../shared/commonStyles";
import {useInterfaceTranslation} from "../../../shared/i18n/useInterfaceTranslation";
import {
  REPORT_ANALYSIS_METHOD_LABEL_TEXT,
  REPORT_ANALYTE_LABEL_TEXT,
  REPORT_CRITERIA_LABEL_TEXT,
  REPORT_RESULT_LABEL_TEXT,
  REPORT_TEST_TYPE_LABEL_TEXT,
} from "../../../utils/constants";
import {
  ReportTestGroup,
  ReportTestRow,
  ReportTestRowField,
} from "../model/types";
import {getReportTestFieldError} from "../model/useReportTestGroups";

type Props = {
  group: ReportTestGroup;
  number: number;
  testTypes: AutoCompleteOption[];
  analytes: AutoCompleteOption[];
  methods: AutoCompleteOption[];
  criteria: AutoCompleteOption[];
  onChange: (group: ReportTestGroup) => void;
  onRemove: () => void;
};

export const ReportTestForm = ({
  group,
  number,
  testTypes,
  analytes,
  methods,
  criteria,
  onChange,
  onRemove,
}: Props) => {
  const {t} = useInterfaceTranslation();
  const hasAnalyte = Boolean(group.testTypeId && group.analyteId);

  const updateRow = (id: string, field: ReportTestRowField, value: string) => {
    onChange({
      ...group,
      rows: group.rows.map((row) =>
        row.id === id ? {...row, [field]: value} : row,
      ),
    });
  };

  const renderRowSelect = (
    row: ReportTestRow,
    field: "analysisMethodId" | "criteriaId",
    label: string,
    options: AutoCompleteOption[],
  ) => {
    const error = hasAnalyte ? getReportTestFieldError(row, field) : "";
    return (
      <AutoComplete
        name={field}
        label={t(label)}
        options={options}
        value={row[field]}
        variant="outlined"
        onChange={(_, option) => updateRow(row.id, field, option?.id ?? "")}
        readOnly={false}
        disabled={!hasAnalyte}
        required
        error={Boolean(error)}
        helperText={t(error)}
      />
    );
  };

  return (
    <Stack
      component="section"
      aria-label={`${t(REPORT_ANALYTE_LABEL_TEXT)} ${number}`}
      gap={2}
      sx={{...formSectionSx, borderLeft: 4, borderLeftColor: "primary.main"}}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <AutoComplete
            name="testTypeId"
            label={t(REPORT_TEST_TYPE_LABEL_TEXT)}
            options={testTypes}
            value={group.testTypeId}
            variant="outlined"
            onChange={(_, option) => {
              const testTypeId = option?.id ?? "";
              if (testTypeId !== group.testTypeId)
                onChange({...group, testTypeId, analyteId: ""});
            }}
            readOnly={false}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AutoComplete
            name="analyteId"
            label={t(REPORT_ANALYTE_LABEL_TEXT)}
            options={analytes}
            value={group.analyteId}
            variant="outlined"
            onChange={(_, option) =>
              onChange({...group, analyteId: option?.id ?? ""})
            }
            readOnly={false}
            disabled={!group.testTypeId}
            required
          />
        </Grid>
      </Grid>
      {group.rows.map((row) => {
        const error = hasAnalyte ? getReportTestFieldError(row, "result") : "";
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
                {renderRowSelect(
                  row,
                  "analysisMethodId",
                  REPORT_ANALYSIS_METHOD_LABEL_TEXT,
                  methods,
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label={t(REPORT_RESULT_LABEL_TEXT)}
                  name="result"
                  size="small"
                  value={row.result}
                  onChange={(event) =>
                    updateRow(row.id, "result", event.target.value)
                  }
                  disabled={!hasAnalyte}
                  error={Boolean(error)}
                  helperText={t(error)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderRowSelect(
                  row,
                  "criteriaId",
                  REPORT_CRITERIA_LABEL_TEXT,
                  criteria,
                )}
              </Grid>
              {group.rows.length > 1 && (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{display: "flex", justifyContent: "flex-end"}}
                >
                  <IconButton
                    aria-label={t("Remove result")}
                    size="small"
                    color="error"
                    onClick={() =>
                      onChange({
                        ...group,
                        rows: group.rows.filter(({id}) => id !== row.id),
                      })
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              )}
            </Grid>
          </Box>
        );
      })}
      <IconButton
        aria-label={t("Remove analyte")}
        color="error"
        onClick={onRemove}
        size="small"
        sx={{alignSelf: "flex-end"}}
      >
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
};
