import {mockData, renderSampleDetail} from "./SampleDetail.test.page";

jest.mock("../../../Config/envManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

describe("SampleDetail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the sample detail successfully", async () => {
  const { screen } = renderSampleDetail();

  expect(screen.getByText("Mock title")).toBeInTheDocument();
  expect(screen.getByText("Close")).toBeInTheDocument();

  expect(
    screen.getByDisplayValue(mockData.expectedData.sampleCode),
  ).toBeInTheDocument();

  expect(
    screen.getByDisplayValue(mockData.expectedData.sampleLocation),
  ).toBeInTheDocument();
});

  it("should render the sample detail with default values when selectedSample is not provided", async () => {
  const { screen } = renderSampleDetail({
    selectedSample: null,
    form: mockData.defaulForm,
    isNotValidForm: true,
  });

  expect(screen.getByText("Mock title")).toBeInTheDocument();
  expect(screen.getByText("Close")).toBeInTheDocument();
});
});
