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
    padding: "20px",
    width: isLessThanMediumScreen ? "80vw" : "60vw",
    height: "100%",
  };
};

export const getStackContainerProps = (
  isLessThanMediumScreen: boolean,
): StackContainerProps => {
  return {
    spacing: 2,
    marginTop: "20px",
    padding: isLessThanMediumScreen ? "5px" : "10px",
    height: "100%",
    minWidth: "600px",
  };
};

export const getStackRowProps = (
  isMediumScreen: boolean,
): StackRowDirectionSpacingPropsProps => {
  return {
    gap: isMediumScreen ? "5px" : "10px",
    direction: isMediumScreen ? "column" : "row",
    spacing: isMediumScreen ? 2 : 0,
  };
};

export const getStackFieldProps = (): StackFieldProps => {
  return {
    width: "100%",
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
