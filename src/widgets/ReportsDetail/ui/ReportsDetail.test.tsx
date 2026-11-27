import {setWorkspaceTestRole} from "../../../shared/test/setWorkspaceTestRole";
import {getClientsService} from "../../../entities/client/api/clientService";
import {
  createSampleService,
  getSamplesService,
} from "../../../entities/sample/api/sampleService";
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

jest.mock("../../../entities/sample/api/sampleService", () => ({
  ...jest.requireActual("../../../entities/sample/api/sampleService"),
  getSamplesService: jest.fn(),
  createSampleService: jest.fn(),
}));

jest.mock("../../../entities/client/api/clientService", () => ({
  ...jest.requireActual("../../../entities/client/api/clientService"),
  getClientsService: jest.fn(),
}));

describe("ReportDetail", () => {
  beforeEach(() => {
    setWorkspaceTestRole("Admin");
    jest.clearAllMocks();
    jest
      .mocked(getSamplesService)
      .mockResolvedValue(mockReportDetailData.samples.slice(1));
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
    expect(catalogRequests[0]).toHaveBeenCalledWith(false);

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

  it("omits the add-sample button for an analyst creating a report", async () => {
    setWorkspaceTestRole("Analyst");
    renderReportDetail({hasReport: false, readOnly: false, canCreate: true});

    expect(await screen.findByRole("combobox", {name: "Sample"})).toBeVisible();
    expect(
      screen.queryByRole("button", {name: "Add sample"}),
    ).not.toBeInTheDocument();
    expect(getClientsService).not.toHaveBeenCalled();
  });

  it("creates a sample inline and selects the saved sample without clearing the report", async () => {
    const {clients, sampleTypes, samples} = mockReportDetailData;
    const sample = {
      ...samples[0],
      id: "new-sample",
      sampleCode: "INLINE-01",
      sampleType: sampleTypes[0],
      client: clients[0],
    };
    jest.mocked(getClientsService).mockResolvedValue(clients);
    jest
      .mocked(createSampleService)
      .mockRejectedValueOnce(new Error("Sample already exists"))
      .mockResolvedValueOnce(sample);
    renderReportDetail({
      hasReport: false,
      readOnly: false,
      canCreate: true,
      useRealForm: true,
    });

    const reportNumber = await screen.findByRole("textbox", {
      name: "Report number",
    });
    fireEvent.change(reportNumber, {target: {value: "REPORT-01"}});
    fireEvent.click(screen.getByRole("button", {name: "Add sample"}));
    const inline = within(screen.getByRole("form", {name: "Add sample"}));
    for (const [label, value] of [
      ["Sample code", sample.sampleCode],
      ["Sample location", sample.sampleLocation],
      ["Responsible person", sample.responsable],
    ]) {
      fireEvent.change(await inline.findByRole("textbox", {name: label}), {
        target: {value},
      });
    }
    for (const [label, name] of [
      ["Client", sample.client.name],
      ["Sample type", sample.sampleType.name],
    ]) {
      fireEvent.keyDown(inline.getByRole("combobox", {name: label}), {
        key: "ArrowDown",
      });
      fireEvent.click(await screen.findByRole("option", {name}));
    }

    const saveSample = inline.getByRole("button", {name: "Save sample"});
    expect(saveSample).toBeEnabled();
    fireEvent.click(saveSample);
    expect(await inline.findByRole("alert")).toHaveTextContent(
      "Sample already exists",
    );
    expect(inline.getByRole("textbox", {name: "Sample code"})).toHaveValue(
      "INLINE-01",
    );
    fireEvent.click(saveSample);

    await waitFor(() =>
      expect(screen.getByRole("combobox", {name: "Sample"})).toHaveValue(
        `${sample.sampleCode} - ${sample.sampleType.name}`,
      ),
    );
    expect(
      screen.queryByRole("form", {name: "Add sample"}),
    ).not.toBeInTheDocument();
    expect(reportNumber).toHaveValue("REPORT-01");
    expect(screen.getByText(sample.sampleLocation)).toBeVisible();
    expect(getSamplesService).toHaveBeenCalledTimes(1);
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
    await waitFor(() => expect(catalogRequests[0]).toHaveBeenCalledWith(false));

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
