import ITypographyProps from "../../../shared/ui/Typography/Types";
import {getSharedPageTitleConfig} from "./shared";

export const ANALYTE_PAGE_NAME = "Analytes";
export const ANALYTES_TITLE_CONFIG: ITypographyProps =
  getSharedPageTitleConfig(ANALYTE_PAGE_NAME);
export const ANALYTES_TABLE_HEADER_LABELS = [
  "Id",
  "Name",
  "Test type",
  "Actions",
];
export const CREATE_ANALYTE_TITLE_TEXT = "Create analyte";
export const ANALYTE_DETAILS_TITLE_TEXT = "Analyte details";

export const ANALYTE_CREATE_BUTTON_LABEL = "Create analyte";
export const EDIT_ANALYTE_BUTTON_LABEL = "Edit analyte";

export const ANALYTE_SUCCESSFULLY_CREATED_TEXT = "Analyte created successfully";
export const ANALYTE_SUCCESSFULLY_UPDATED_TEXT =
  "The analyte was updated successfully";
export const ANALYTE_SUCCESSFULLY_DELETED_TEXT =
  "The analyte was deleted successfully";

export const ANALYTE_DELETE_CONFIRMATION_TITLE =
  "You want to delete this analyte?";
export const ANALYTE_DELETE_CONFIRMATION_SUBTITLE =
  "You won't be able to revert this!";
export const ANALYTE_DELETE_CONFIRMATION_TEXT = "Yes, delete it!";
