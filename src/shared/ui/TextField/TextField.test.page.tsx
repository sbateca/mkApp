import {render, screen} from "@testing-library/react";
import {TextField} from "./TextField";
import {TexFieldProps} from "./Types";

export const mockTextFieldProps: TexFieldProps = {
  name: "test",
  label: "test",
  variant: "outlined",
  type: "text",
  value: "test",
  onChange: jest.fn(),
  onBlur: jest.fn(),
  isRequired: true,
  hasError: false,
};

export const renderTextField = async () => {
  render(<TextField {...mockTextFieldProps} />);
  return {
    textField:
      screen.getByDisplayValue(mockTextFieldProps.label).parentElement ||
      screen.getByDisplayValue(mockTextFieldProps.label),
  };
};
