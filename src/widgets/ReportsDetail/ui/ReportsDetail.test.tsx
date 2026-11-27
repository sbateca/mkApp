import {fireEvent, screen, waitFor, within} from "@testing-library/react";
import {
  mockReportDetailData,
  renderReportDetail,
} from "./ReportsDetail.test.page";

jest.mock("../../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://example.com/api",
  },
}));

describe("ReportDetail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the report and its relations without requesting samples or catalogs", () => {
    const {report, catalogRequests, titleNode, closeButton} =
      renderReportDetail();
    const [test] = report.tests;

    expect(titleNode).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();

    for (const value of [
      report.reportNumber,
      report.sample.sampleCode,
      test.testType.name,
      report.sample.client.name,
      test.analyte.name,
      test.analysisMethod.name,
      test.criteria.name,
      test.result,
    ]) {
      expect(screen.getByText(value)).toBeInTheDocument();
    }

    expect(
      screen.getByRole("heading", {name: report.sample.sampleType.name}),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Edit Report"})).toBeDisabled();
    catalogRequests.forEach((request) =>
      expect(request).not.toHaveBeenCalled(),
    );
  });

  it("loads catalogs only after switching an authorized report to edit mode", async () => {
    const {rerender, catalogRequests} = renderReportDetail({canUpdate: true});
    catalogRequests.forEach((request) =>
      expect(request).not.toHaveBeenCalled(),
    );

    fireEvent.click(screen.getByRole("button", {name: "Edit Report"}));
    rerender();

    const {sampleId, result} = mockReportDetailData.expectedData;
    expect(await screen.findByDisplayValue(sampleId)).toBeInTheDocument();
    expect(await screen.findByDisplayValue(result)).toBeInTheDocument();
    expect(catalogRequests[0]).toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", {name: "Cancel"}));
    rerender();
    expect(screen.getByText(result)).toBeInTheDocument();
  });

  it("stays in read mode when the report denies updates, even if edit mode is requested", () => {
    const {report, catalogRequests} = renderReportDetail({readOnly: false});
    expect(screen.getByText(report.reportNumber)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", {name: "Save"}),
    ).not.toBeInTheDocument();
    catalogRequests.forEach((request) =>
      expect(request).not.toHaveBeenCalled(),
    );
  });

  it("filters the analyte options and clears the selected analyte when the test type changes", async () => {
    const {testTypes, analytes} = renderReportDetail({
      hasReport: false,
      readOnly: false,
      canCreate: true,
    });

    const testType = await screen.findByRole("combobox", {name: /test type/i});
    const analyte = screen.getByRole("combobox", {name: "Analyte"});
    expect(analyte).toBeDisabled();

    fireEvent.keyDown(testType, {key: "ArrowDown"});
    fireEvent.click(
      await screen.findByRole("option", {name: testTypes[0].name}),
    );
    fireEvent.keyDown(analyte, {key: "ArrowDown"});
    expect(
      await screen.findByRole("option", {name: analytes[0].name}),
    ).toBeVisible();
    expect(
      screen.queryByRole("option", {name: analytes[1].name}),
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("option", {name: analytes[0].name}));
    expect(analyte).toHaveValue(analytes[0].name);

    fireEvent.change(testType, {target: {value: ""}});
    fireEvent.keyDown(testType, {key: "ArrowDown"});
    fireEvent.click(
      await screen.findByRole("option", {name: testTypes[1].name}),
    );
    expect(analyte).toHaveValue("");
    fireEvent.keyDown(analyte, {key: "ArrowDown"});
    expect(
      await screen.findByRole("option", {name: analytes[1].name}),
    ).toBeVisible();
    expect(
      screen.queryByRole("option", {name: analytes[0].name}),
    ).not.toBeInTheDocument();
  });

  it("loads catalogs for a new report only with create permission", async () => {
    const {catalogRequests} = renderReportDetail({
      hasReport: false,
      readOnly: false,
      canCreate: true,
    });

    expect(
      await screen.findByRole("button", {name: "Save"}),
    ).toBeInTheDocument();
    await waitFor(() => expect(catalogRequests[0]).toHaveBeenCalled());

    fireEvent.click(screen.getByRole("button", {name: "Add analyte"}));
    for (const name of ["Analyte 1", "Analyte 2"]) {
      const card = within(screen.getByRole("region", {name}));
      expect(card.getByRole("combobox", {name: "Test type"})).toBeVisible();
      expect(card.getAllByRole("textbox", {name: /result/i})).toHaveLength(1);
      expect(
        card.queryByRole("button", {name: "Add result"}),
      ).not.toBeInTheDocument();
    }
  });
});
