import ITypographyProps from "../../../shared/ui/Typography/Types";
import {getSharedPageTitleConfig} from "./shared";

export const SAMPLES_PAGE_NAME = "Samples";
export const SAMPLES_TITLE_CONFIG: ITypographyProps =
  getSharedPageTitleConfig(SAMPLES_PAGE_NAME);
export const SAMPLES_TABLE_HEADER_LABELS = [
  "Sample Name",
  "Client",
  "Get Date",
  "Reception Date",
  "Actions",
];
export const CREATE_SAMPLE_TITLE_TEXT = "Create sample";
export const EDIT_SAMPLE_TITLE_TEXT = "Edit sample";
export const SAMPLE_DETAILS_TITLE_TEXT = "Sample details";

export const SAMPLES_CREATE_BUTTON_LABEL = "Create sample";
export const EDIT_SAMPLE_BUTTON_LABEL = "Edit sample";

export const SAMPLE_SUCCESSFULLY_CREATED_TEXT = "Sample created successfully";
export const SAMPLE_SUCCESSFULLY_UPDATED_TEXT =
  "The sample was updated successfully";
export const SAMPLE_SUCCESSFULLY_DELETED_TEXT =
  "The sample was deleted successfully";

export const SAMPLE_DELETE_CONFIRMATION_TITLE =
  "You want to delete this sample?";
export const SAMPLE_DELETE_CONFIRMATION_SUBTITLE =
  "You won't be able to revert this!";
export const SAMPLE_DELETE_CONFIRMATION_TEXT = "Yes, delete it!";

export const SAMPLE_ID_OR_SAMPLE_MISSING_TEXT =
  "Sample Id or Sample is missing";
export const SAMPLE_ID_MISSING_TEXT = "Sample Id is missing";
export const SAMPLES_PAGE_DETAIL_TITLE = "Sample details";
