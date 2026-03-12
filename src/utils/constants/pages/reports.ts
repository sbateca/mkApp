import ITypographyProps from "../../../shared/ui/Typography/Types";
import {getSharedPageTitleConfig} from "./shared";

export const REPORTS_PAGE_NAME = "Reports";
export const REPORTS_TITLE_CONFIG: ITypographyProps =
  getSharedPageTitleConfig(REPORTS_PAGE_NAME);
export const REPORTS_TABLE_HEADER_LABELS = [
  "Report Date",
  "Sample",
  "Analyte",
  "Result",
  "Actions",
];

export const REPORT_BUTTON_TEXTS = {
  create: "Create Report",
  edit: "Edit",
  delete: "Delete",
  detail: "Detail",
};

export const CREATE_REPORT_TITLE_TEXT = "Create Report";
export const EDIT_REPORT_TITLE_TEXT = "Edit Report";
export const REPORT_DETAILS_TITLE_TEXT = "Report details";

export const REPORT_CREATE_BUTTON_LABEL = "Create Report";
export const EDIT_REPORTS_BUTTON_LABEL = "Edit Report";

export const REPORT_SUCCESSFULLY_CREATED_TEXT = "Report created successfully";
export const REPORT_SUCCESSFULLY_UPDATED_TEXT =
  "The report was updated successfully";
export const REPORT_SUCCESSFULLY_DELETED_TEXT =
  "The report was deleted successfully";

export const REPORT_DELETE_CONFIRMATION_TITLE =
  "You want to delete this report?";
export const REPORT_DELETE_CONFIRMATION_SUBTITLE =
  "You won't be able to revert this!";
export const REPORT_DELETE_CONFIRMATION_TEXT = "Yes, delete it!";

export const REPORT_ID_OR_REPORTS_MISSING_TEXT =
  "Report Id or Report is missing";
export const REPORT_ID_MISSING_TEXT = "Report Id is missing";
export const REPORT_PAGE_DETAIL_TITLE = "Report details";
