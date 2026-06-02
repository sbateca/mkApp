import ITypographyProps from "../../../shared/ui/Typography/Types";
import {getSharedPageTitleConfig} from "./shared";

export const CRITERIA_PAGE_NAME = "Criteria";
export const CRITERIA_TITLE_CONFIG: ITypographyProps =
  getSharedPageTitleConfig(CRITERIA_PAGE_NAME);
export const CRITERIA_TABLE_HEADER_LABELS = ["Id", "Name", "Actions"];
export const CREATE_CRITERIA_TITLE_TEXT = "Create criteria";
export const CRITERIA_DETAILS_TITLE_TEXT = "Criteria details";

export const CRITERIA_CREATE_BUTTON_LABEL = "Create criteria";
export const EDIT_CRITERIA_BUTTON_LABEL = "Edit criteria";

export const CRITERIA_SUCCESSFULLY_CREATED_TEXT =
  "Criteria created successfully";
export const CRITERIA_SUCCESSFULLY_UPDATED_TEXT =
  "The criteria was updated successfully";
export const CRITERIA_SUCCESSFULLY_DELETED_TEXT =
  "The criteria was deleted successfully";

export const CRITERIA_DELETE_CONFIRMATION_TITLE =
  "You want to delete this criteria?";
export const CRITERIA_DELETE_CONFIRMATION_SUBTITLE =
  "You won't be able to revert this!";
export const CRITERIA_DELETE_CONFIRMATION_TEXT = "Yes, delete it!";
