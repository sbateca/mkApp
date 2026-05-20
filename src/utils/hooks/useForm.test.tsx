import {useEffect} from "react";

import {fireEvent, render, screen} from "@testing-library/react";

import {useForm} from "./useForm";
import {getFormStringValue, isEmpty} from "../constants";

const TestComponent = () => {
  const {
    form,
    isNotValidForm,
    formFieldsErrors,
    setFormFieldsValidationFunctions,
    handleChange,
  } = useForm();
  useEffect(() => {
    setFormFieldsValidationFunctions({
      name: [isEmpty],
    });
  }, [setFormFieldsValidationFunctions]);
  return (
    <div>
      <span data-testid="form">{JSON.stringify(form)}</span>
      <span data-testid="formFieldsErrors">
        {JSON.stringify(formFieldsErrors)}
      </span>
      <span data-testid="isNotValidForm">{isNotValidForm}</span>
      <input
        data-testid="inputField"
        type="text"
        name="name"
        value={getFormStringValue(form, "name")}
        onChange={handleChange}
      />
    </div>
  );
};

describe("useForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should set the form input value", async () => {
    render(<TestComponent />);
    const formValues = {
      name: "John",
    };
    const inputField = screen.getByTestId("inputField");

    fireEvent.change(inputField, {
      target: {value: formValues.name},
    });

    const form = screen.getByTestId("form");
    expect(form).toHaveTextContent(JSON.stringify(formValues));
  });

  it("should set the form fields errors when required field is empty", async () => {
    const formValues = {
      name: "John",
    };
    render(<TestComponent />);

    let inputField = screen.getByTestId("inputField");
    fireEvent.change(inputField, {
      target: {value: formValues.name},
    });
    fireEvent.change(inputField, {
      target: {value: ""},
    });
    inputField = screen.getByTestId("inputField");
    const errors = screen.getByTestId("formFieldsErrors");

    expect(errors).toHaveTextContent(
      // eslint-disable-next-line prettier/prettier
      "{\"name\":[\"This field is required.\"]}",
    );
  });
});
