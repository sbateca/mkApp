import ITypographyProps from "../../../shared/ui/Typography/Types";
import {getSharedPageTitleConfig} from "./shared";

export const ANALYSIS_METHOD_PAGE_NAME = "Analysis methods";
export const ANALYSIS_METHODS_TITLE_CONFIG: ITypographyProps =
  getSharedPageTitleConfig(ANALYSIS_METHOD_PAGE_NAME);
export const ANALYSIS_METHODS_TABLE_HEADER_LABELS = ["Id", "Name", "Actions"];
export const CREATE_ANALYSIS_METHOD_TITLE_TEXT = "Create analysis method";
export const ANALYSIS_METHOD_DETAILS_TITLE_TEXT = "Analysis method details";

export const ANALYSIS_METHOD_CREATE_BUTTON_LABEL = "Create analysis method";
export const EDIT_ANALYSIS_METHOD_BUTTON_LABEL = "Edit analysis method";

export const ANALYSIS_METHOD_SUCCESSFULLY_CREATED_TEXT =
  "Analysis method created successfully";
export const ANALYSIS_METHOD_SUCCESSFULLY_UPDATED_TEXT =
  "The analysis method was updated successfully";
export const ANALYSIS_METHOD_SUCCESSFULLY_DELETED_TEXT =
  "The analysis method was deleted successfully";

export const ANALYSIS_METHOD_DELETE_CONFIRMATION_TITLE =
  "You want to delete this analysis method?";
export const ANALYSIS_METHOD_DELETE_CONFIRMATION_SUBTITLE =
  "You won't be able to revert this!";
export const ANALYSIS_METHOD_DELETE_CONFIRMATION_TEXT = "Yes, delete it!";
