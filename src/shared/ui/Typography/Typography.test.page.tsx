import {render, screen} from "@testing-library/react";
import {Typography} from "./Typography";
import ITypographyProps from "./Types";

export const mockTypographyProps: ITypographyProps = {
  text: "Mock text",
  size: "medium",
  padding: "10px",
  variant: "h1",
  align: "right",
};

export const mockTypographyDefaultProps: ITypographyProps = {
  text: "Mock text",
  variant: "h1",
};

export const renderTypography = async (props: ITypographyProps) => {
  render(<Typography {...props} />);
  return {
    typography: screen.getByText(mockTypographyProps.text),
  };
};
