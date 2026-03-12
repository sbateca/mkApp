import {DateView} from "@mui/x-date-pickers";
import ITypographyProps from "../../../shared/ui/Typography/Types";

export const getSharedPageTitleConfig = (
  pageName: string,
): ITypographyProps => {
  return {
    text: pageName,
    size: "20px",
    variant: "h1",
    padding: "10px 0px",
  };
};

export const TABLE_ACTIONS_COLUMN_HEADER = "Actions";
export const LOCAL_STORAGE_USER_KEY = "userData";
export const NO_RECORDS_MESSAGE = "No records to display";

export const DATEPICKER_VIEWS: DateView[] = ["year", "month", "day"];
export const DATEPICKER_FORMAT = "YYYY-MM-DD";
