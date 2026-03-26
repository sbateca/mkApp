import {
  BoxContainerProps,
  StackContainerProps,
  StackFieldProps,
  StackRowDirectionSpacingPropsProps,
} from "./Types";

export const ReportDetailStyles = {
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

export const SampleFormStyles = {
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
    height: "auto",
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
