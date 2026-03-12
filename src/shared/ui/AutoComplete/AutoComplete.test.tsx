import {act} from "@testing-library/react";
import {mockData, renderAutoComplete} from "./AutoComplete.test.page";

describe("AutoComplete", () => {
  it("should render the AutoComplete component", async () => {
    const {autoComplete} = await renderAutoComplete();

    expect(autoComplete.component).toBeInTheDocument();
  });

  it("should render the AutoComplete component with the correct label", async () => {
    const {autoComplete} = await renderAutoComplete();
    const label = autoComplete.component.querySelector("label");

    expect(label).toHaveTextContent("Test Label");
  });

  it("should call the onChange function when click in an option", async () => {
    const {autoComplete} = await renderAutoComplete();

    await act(async () => {
      autoComplete.options.update(mockData.options[1].optionLabel);
    });

    expect(mockData.onChange).toHaveBeenCalled();
  });
});
