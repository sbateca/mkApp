import {SxProps, Theme} from "@mui/material";
import {
  BoxContainerProps,
  StackContainerProps,
  StackFieldProps,
  StackRowDirectionSpacingPropsProps,
} from "./commonProps";

export const getBoxContainerProps = (
  isLessThanMediumScreen: boolean,
): BoxContainerProps => {
  return {
    display: "flex",
    flexDirection: "column",
    padding: isLessThanMediumScreen ? "16px" : "24px",
    width: isLessThanMediumScreen ? "100vw" : "min(92vw, 960px)",
    minHeight: "100%",
    boxSizing: "border-box",
    backgroundColor: "background.default",
  };
};

export const getStackContainerProps = (
  isLessThanMediumScreen: boolean,
): StackContainerProps => {
  return {
    gap: "16px",
    marginTop: isLessThanMediumScreen ? "16px" : "20px",
    flexGrow: 1,
  };
};

export const getStackRowProps = (
  isMediumScreen: boolean,
): StackRowDirectionSpacingPropsProps => {
  return {
    gap: "16px",
    direction: isMediumScreen ? "column" : "row",
    spacing: 0,
  };
};

export const getStackFieldProps = (): StackFieldProps => {
  return {
    width: "100%",
    minWidth: 0,
  };
};

export const CommonContentStyles = {
  titleContentContainer: {
    display: "flex",
    flexDirection: "row",
  },
  titleContentActions: {
    marginLeft: "auto",
  },
};

export const formSectionSx: SxProps<Theme> = {
  p: {xs: 2, sm: 3},
  minWidth: 0,
  bgcolor: "background.paper",
  border: 1,
  borderColor: "divider",
  borderRadius: "16px",
  boxShadow: "0 3px 14px rgba(23, 46, 91, 0.05)",
};

export const formActionsSx: SxProps<Theme> = {
  position: "sticky",
  bottom: 0,
  zIndex: 1,
  display: "flex",
  justifyContent: "flex-end",
  mt: "auto",
  p: 1.5,
  border: 1,
  borderColor: "divider",
  borderRadius: "12px",
  bgcolor: "background.paper",
  boxShadow: "0 -4px 16px rgba(23, 46, 91, 0.06)",
  "& > .MuiBox-root": {display: "flex", flexWrap: "wrap", gap: 1},
  "& .MuiButton-root": {fontSize: "0.875rem", minHeight: 40, m: 0, px: 1.5},
};
