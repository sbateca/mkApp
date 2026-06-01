import ITypographyProps from "../../../shared/ui/Typography/Types";
import {getSharedPageTitleConfig} from "./shared";

export const CLIENT_PAGE_NAME = "Clients";
export const CLIENTS_TITLE_CONFIG: ITypographyProps =
  getSharedPageTitleConfig(CLIENT_PAGE_NAME);
export const CLIENTS_TABLE_HEADER_LABELS = ["Id", "Name", "Actions"];
export const CREATE_CLIENT_TITLE_TEXT = "Create client";
export const CLIENT_DETAILS_TITLE_TEXT = "Client details";

export const CLIENT_CREATE_BUTTON_LABEL = "Create client";
export const EDIT_CLIENT_BUTTON_LABEL = "Edit client";

export const CLIENT_SUCCESSFULLY_CREATED_TEXT = "Client created successfully";
export const CLIENT_SUCCESSFULLY_UPDATED_TEXT =
  "The client was updated successfully";
export const CLIENT_SUCCESSFULLY_DELETED_TEXT =
  "The client was deleted successfully";

export const CLIENT_DELETE_CONFIRMATION_TITLE =
  "You want to delete this client?";
export const CLIENT_DELETE_CONFIRMATION_SUBTITLE =
  "You won't be able to revert this!";
export const CLIENT_DELETE_CONFIRMATION_TEXT = "Yes, delete it!";
