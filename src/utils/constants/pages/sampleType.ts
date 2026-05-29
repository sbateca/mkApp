import ITypographyProps from "../../../shared/ui/Typography/Types";
import {getSharedPageTitleConfig} from "./shared";

export const SAMPLE_TYPE_PAGE_NAME = "Sample types";
export const SAMPLE_TYPE_NOT_PROVIDED = "Sample type not provided";
export const SAMPLE_TYPES_CONFIG: ITypographyProps = getSharedPageTitleConfig(
  SAMPLE_TYPE_PAGE_NAME,
);

export const SAMPLE_TYPES_TITLE_CONFIG: ITypographyProps =
  getSharedPageTitleConfig(SAMPLE_TYPE_PAGE_NAME);
export const SAMPLE_TYPES_TABLE_HEADER_LABELS = ["Id", "Name", "Actions"];
export const CREATE_SAMPLE_TYPE_TITLE_TEXT = "Create sample type";
export const EDIT_SAMPLE_TYPE_TITLE_TEXT = "Edit sample type";
export const SAMPLE_TYPE_DETAILS_TITLE_TEXT = "Sample type details";

export const SAMPLE_TYPE_CREATE_BUTTON_LABEL = "Create sample type";
export const EDIT_SAMPLE_TYPE_BUTTON_LABEL = "Edit sample type";

export const SAMPLE_TYPE_SUCCESSFULLY_CREATED_TEXT =
  "Sample type created successfully";
export const SAMPLE_TYPE_SUCCESSFULLY_UPDATED_TEXT =
  "The sample type was updated successfully";
export const SAMPLE_TYPE_SUCCESSFULLY_DELETED_TEXT =
  "The sample type was deleted successfully";

export const SAMPLE_TYPE_DELETE_CONFIRMATION_TITLE =
  "You want to delete this sample type?";
export const SAMPLE_TYPE_DELETE_CONFIRMATION_SUBTITLE =
  "You won't be able to revert this!";
export const SAMPLE_TYPE_DELETE_CONFIRMATION_TEXT = "Yes, delete it!";

export const SAMPLES_TYPE_PAGE_DETAIL_TITLE = "Sample type details";
