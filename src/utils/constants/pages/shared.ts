import {DateView} from "@mui/x-date-pickers";
import ITypographyProps from "../../../shared/ui/Typography/Types";
import {SideSectionButtonsProps} from "../../../widgets/ReportsDetail/ui/Types";

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

export const CommonDetailStyles = {
  container: {
    width: "50vw",
    padding: "20px",
  },
  stackContainer: {
    spacing: 2,
    marginTop: "20px",
    padding: "20px",
  },
  stackField: {
    width: "100%",
  },
  closeButton: {
    marginLeft: "auto",
    alignSelf: "start",
    fontSize: "9px",
  },
  sampleDetailsContainer: {
    height: "100%",
    marginTop: "20px",
  },
};

export const CommonDetailFormStyles = {
  mainBox: {
    "& .MuiFormControl-root": {m: 0.4, width: "100%"},
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  texfield: {
    width: "100%",
  },
  datePicker: {
    "& .MuiInputBase-root.MuiOutlinedInput-root": {
      height: "2.5em",
      width: "100%",
    },
  },
};

export const getSideSectionButtonsProps = (): SideSectionButtonsProps => {
  return {
    display: "flex",
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    marginTop: "10px",
  };
};

export const TABLE_ACTIONS_COLUMN_HEADER = "Actions";
export const LOCAL_STORAGE_USER_KEY = "userData";
export const NO_RECORDS_MESSAGE = "No records to display";

export const DATEPICKER_VIEWS: DateView[] = ["year", "month", "day"];
export const DATEPICKER_FORMAT = "YYYY-MM-DD";
