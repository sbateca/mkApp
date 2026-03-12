import {fireEvent, render, screen} from "@testing-library/react";
import {AutoComplete} from "./AutoComplete";
import {AutoCompleteProps} from "./types";

export const mockData: AutoCompleteProps = {
  options: [
    {id: "1", optionLabel: "Option 1"},
    {id: "2", optionLabel: "Option 2"},
    {id: "3", optionLabel: "Option 3"},
  ],
  label: "Test Label",
  value: "Option 1",
  variant: "outlined",
  onChange: jest.fn(),
  name: "test",
  readOnly: false,
  required: true,
  error: false,
  helperText: "Test Helper Text",
};

export const renderAutoComplete = async () => {
  render(<AutoComplete {...mockData} />);
  return {
    autoComplete: {
      component: screen.getByTestId("auto-complete"),
      options: {
        update: async (optionLabel: string) => {
          const input = screen.getByRole("combobox");
          input.focus();
          fireEvent.change(input, {target: {value: optionLabel}});
          fireEvent.keyDown(input, {key: "ArrowDown"});
          fireEvent.keyDown(input, {key: "Enter"});
        },
      },
    },
  };
};
