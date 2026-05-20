export const DEFAULT_CALLBACK_TIMEOUT = 1000;
export const UNEXPECTED_SERVER_ERROR = "Unexpected server error";
export const UNEXPECTED_APPLICATION_ERROR = "Unexpected application error";
export const UNEXPECTED_ERROR = "Unexpected error";
export const ELEMENT_NOT_FOUND_MESSAGE = "Element not found";
export const N_A = "N/A";

export const REPORT_FORM_FIELDS = {
  SAMPLE_CODE: "sampleCode",
  SAMPLE_TYPE: "sampleType",
  CLIENT: "client",
  GET_SAMPLE_DATE: "getSampleDate",
  RECEPTION_DATE: "receptionDate",
  ANALYSIS_DATE: "analysisDate",
  SAMPLE_LOCATION: "sampleLocation",
  RESPONSABLE: "responsable",
} as const;

export const REPORT_FORM_LABELS = {
  [REPORT_FORM_FIELDS.SAMPLE_CODE]: "Sample Code",
  [REPORT_FORM_FIELDS.SAMPLE_TYPE]: "Sample Type",
  [REPORT_FORM_FIELDS.CLIENT]: "Client",
  [REPORT_FORM_FIELDS.GET_SAMPLE_DATE]: "Get Sample Date",
  [REPORT_FORM_FIELDS.RECEPTION_DATE]: "Reception Date",
  [REPORT_FORM_FIELDS.ANALYSIS_DATE]: "Analysis Date",
  [REPORT_FORM_FIELDS.SAMPLE_LOCATION]: "Sample Location",
  [REPORT_FORM_FIELDS.RESPONSABLE]: "Responsable",
} as const;

export const ADD_MORE_TESTS_HINT_TEXT =
  "*You can add more than one test by selecting the 'Add Test' button below.";
