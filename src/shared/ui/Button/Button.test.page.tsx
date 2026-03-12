import {render, screen} from "@testing-library/react";
import {Button} from "./Button";
import {ButtonConfig} from "./Types";

export const mockButtonConfig: ButtonConfig = {
  sx: {fontSize: "20px"},
  label: "Mock Button",
  disabled: false,
  color: "primary",
  variant: "contained",
  size: "small",
  onClick: jest.fn(),
};

export const renderListItemButton = async () => {
  render(<Button {...mockButtonConfig} />);
  return {
    button: screen.getByText(mockButtonConfig.label),
  };
};
