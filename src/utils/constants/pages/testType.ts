import ITypographyProps from "../../../shared/ui/Typography/Types";
import {getSharedPageTitleConfig} from "./shared";

export const TEST_TYPE_PAGE_NAME = "Test types";
export const TEST_TYPES_TITLE_CONFIG: ITypographyProps =
  getSharedPageTitleConfig(TEST_TYPE_PAGE_NAME);
export const TEST_TYPES_TABLE_HEADER_LABELS = ["Id", "Name", "Actions"];
export const CREATE_TEST_TYPE_TITLE_TEXT = "Create test type";
export const TEST_TYPE_DETAILS_TITLE_TEXT = "Test type details";

export const TEST_TYPE_CREATE_BUTTON_LABEL = "Create test type";
export const EDIT_TEST_TYPE_BUTTON_LABEL = "Edit test type";

export const TEST_TYPE_SUCCESSFULLY_CREATED_TEXT =
  "Test type created successfully";
export const TEST_TYPE_SUCCESSFULLY_UPDATED_TEXT =
  "The test type was updated successfully";
export const TEST_TYPE_SUCCESSFULLY_DELETED_TEXT =
  "The test type was deleted successfully";

export const TEST_TYPE_DELETE_CONFIRMATION_TITLE =
  "You want to delete this test type?";
export const TEST_TYPE_DELETE_CONFIRMATION_SUBTITLE =
  "You won't be able to revert this!";
export const TEST_TYPE_DELETE_CONFIRMATION_TEXT = "Yes, delete it!";
