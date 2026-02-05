import {mockData, renderReportDetail} from "./ReportsDetail.test.page";
import * as hooks from "../../../utils/hooks";

describe("SampleDetail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the report detail successfully", async () => {
    const expectedData = {...mockData.expectedData};

    const {titleNode, closeButton, screen} = await renderReportDetail();

    expect(titleNode).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();

    const sampleField = screen.getByLabelText(/sample/i) as HTMLInputElement;
    expect(sampleField).toBeInTheDocument();
    expect(sampleField.value).toBe(expectedData.sampleId);

    const datePickers = screen.getAllByPlaceholderText("MM/DD/YYYY");
    expect((datePickers[0] as HTMLInputElement).value).toBe(
      expectedData.reportDate,
    );

    expect(
      (screen.getByDisplayValue(expectedData.result) as HTMLInputElement).value,
    ).toBe(expectedData.result);
  });

  it("should render the report detail with default values when selectedReport is not provided", async () => {
    jest.spyOn(hooks, "useForm").mockReturnValue({
      form: mockData.defaulForm,
      setForm: jest.fn().mockReturnValue(mockData.defaulForm),
      handleChange: jest.fn(),
      handleDateChange: jest.fn(),
      cleanForm: jest.fn(),
      formFieldsErrors: {},
      handleSelectChange: jest.fn(),
      handleAutoCompleteChange: jest.fn(),
      getTextFieldHelperText: jest.fn(),
      setFormFieldsValidationFunctions: jest.fn(),
      setDefaultFormFieldsValues: jest.fn(),
      isNotValidForm: true,
    });
    const expectedData = {
      ...mockData.expectedData,
    };

    const {titleNode: title, closeButton, screen} = await renderReportDetail();
    const sampleValue = screen.getByDisplayValue(
      expectedData.sampleId,
    ) as HTMLInputElement;
    const analyteValue = screen.getByDisplayValue(
      expectedData.analyte,
    ) as HTMLInputElement;
    const analysisMethodValue = screen.getByDisplayValue(
      expectedData.analysisMethod,
    ) as HTMLInputElement;
    const criteriaValue = screen.getByDisplayValue(
      expectedData.criteria,
    ) as HTMLInputElement;
    const resultValue = screen.getByDisplayValue(
      expectedData.result,
    ) as HTMLInputElement;
    const datePickers = screen.getAllByPlaceholderText("MM/DD/YYYY");
    const reportDateValue = datePickers[0] as HTMLInputElement;

    expect(title).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
    expect(reportDateValue.value).toBe(expectedData.reportDate);
    expect(sampleValue.value).toBe(expectedData.sampleId);
    expect(analyteValue.value).toBe(expectedData.analyte);
    expect(analysisMethodValue.value).toBe(expectedData.analysisMethod);
    expect(criteriaValue.value).toBe(expectedData.criteria);
    expect(resultValue.value).toBe(expectedData.result);
  });
});
