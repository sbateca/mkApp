// Menu
export enum SharedMenuItems {
  CLIENTS = "Clients",
  SAMPLE_TYPES = "Sample types",
  ANALYTES = "Analytes",
  ANALYSIS_METHODS = "Analysis methods",
  CRITERIA = "Criteria",
  SAMPLES = "Samples",
  REPORTS = "Reports",
}
// Button
export enum SharedButtonColors {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  ERROR = "error",
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
  DEFAULT = "default",
}

export enum SharedButtonIcons {
  VIEW = "view",
  EDIT = "edit",
  CREATE = "create",
  DELETE = "delete",
}

export enum SharedButtonSizes {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

export enum SharedButtonVariants {
  TEXT = "text",
  OUTLINED = "outlined",
  CONTAINED = "contained",
}

export enum SharedButtonCommonLabels {
  CANCEL = "Cancel",
  SAVE = "Save",
  EDIT = "Edit",
  DELETE = "Delete",
  CLOSE = "Close",
  VIEW = "View",
  ADD = "Add",
  APPROVE = "Approve",
  DOWNLOAD = "Download",
}

// Chip
export enum SharedChipColors {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  ERROR = "error",
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
  DEFAULT = "default",
}

export enum SharedChipSizes {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

// Typography
export enum SharedTypographyVariants {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
  SUBTITLE1 = "subtitle1",
  SUBTITLE2 = "subtitle2",
  BODY1 = "body1",
  BODY2 = "body2",
  CAPTION = "caption",
}

export enum SharedTypographyColors {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  TEXT_PRIMARY = "textPrimary",
  TEXT_SECONDARY = "textSecondary",
}

export enum SharedTypographyAlign {
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center",
  JUSTIFY = "justify",
}

// Snackbar
export enum SnackBarSeverity {
  ERROR = "error",
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
}

// SweetAlert
export enum SweetAlertIcon {
  ERROR = "error",
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
}

export enum SampleDetailsFields {
  SAMPLE_CODE = "Sample Code",
  CLIENT = "Client",
  GET_SAMPLE_DATE = "Get sample date",
  RECEPTION_DATE = "Reception date",
  ANALYSIS_DATE = "Analysis date",
  SAMPLE_LOCATION = "Location",
  RESPONSABLE = "Responsable",
}

// TextField
export enum SharedTextFieldVariants {
  STANDARD = "standard",
  FILLED = "filled",
  OUTLINED = "outlined",
}

export enum SelectVariants {
  STANDARD = "standard",
  FILLED = "filled",
  OUTLINED = "outlined",
}

export enum TextFieldSizes {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

// Icons
export enum IconNames {
  VIEW = "view",
  EDIT = "edit",
  CREATE = "create",
  DELETE = "delete",
  CLOSE = "close",
  SAVE = "save",
  SEARCH = "search",
  ADD = "add",
  APPROVED = "approved",
  DOWNLOAD = "download",
}

// Reports
export enum ReportFormFields {
  REPORT_DATE = "reportDate",
  REPORT_NUMBER = "reportNumber",
  REPORT_TEST_GROUPS = "reportTestGroups",
  TEST_TYPE = "testType",
  SAMPLE_ID = "sampleId",
  SAMPLE_TYPE = "sampleType",
  ANALYTE_ID = "analyteId",
  ANALYSIS_METHOD_ID = "analysisMethodId",
  CRITERIA_ID = "criteriaId",
  RESULT = "result",
}

export enum ReportStatus {
  APPROVED = "approved",
  DRATF = "draft",
  ISSUED = "issued",
}

// Samples
export enum SamplesFormFields {
  SAMPLE_CODE = "sampleCode",
  SAMPLE_TYPE = "sampleType",
  CLIENT = "client",
  GET_SAMPLE_DATE = "getSampleDate",
  RECEPTION_DATE = "receptionDate",
  ANALYSIS_DATE = "analysisDate",
  SAMPLE_LOCATION = "sampleLocation",
  RESPONSABLE = "responsable",
}

// Sample types
export enum SampleTypeFormFields {
  NAME = "name",
}

export enum SampleTypeFormFieldLabels {
  NAME = "Name",
}

// Clients
export enum ClientFormFields {
  NAME = "name",
}

export enum ClientFormFieldLabels {
  NAME = "Name",
}

// Analytes
export enum AnalyteFormFields {
  NAME = "name",
  TEST_TYPE = "testType",
}

export enum AnalyteFormFieldLabels {
  NAME = "Name",
  TEST_TYPE = "Test type",
}

// Analysis methods
export enum AnalysisMethodFormFields {
  NAME = "name",
}

export enum AnalysisMethodFormFieldLabels {
  NAME = "Name",
}

// Criteria
export enum CriteriaFormFields {
  NAME = "name",
}

export enum CriteriaFormFieldLabels {
  NAME = "Name",
}

// Test types
export enum TestType {
  PHYSICAL = "Physical",
  MICROBIOLOGICAL = "Microbiological",
}

// Auth
export enum SignInFormFields {
  USERNAME = "username",
  PASSWORD = "password",
}

// HTTP
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
