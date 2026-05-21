import {act, renderHook} from "@testing-library/react";

import {useDownloadReport} from "./useDownloadReport";
import {ReportStore} from "../../../../entities/report";
import {
  REPORT_FAILED_DOWNLOAD_TEXT,
  REPORT_SUCCESSFULLY_DOWNLOAD_START_TEXT,
} from "../../../../utils/constants";
import {SnackBarSeverity} from "../../../../utils/enums";
import {SnackBarStore} from "../../../snackbar/model/types";

let mockReportStoreState: ReportStore;
let mockSnackBarStoreState: SnackBarStore;

jest.mock("../../../../entities/report", () => ({
  selectDownloadReport: (store: ReportStore) => store.downloadReport,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useReportStore: (selector: any) => selector(mockReportStoreState),
}));

jest.mock("../../../snackbar", () => ({
  selectShowSnackBarMessage: (store: SnackBarStore) =>
    store.showSnackBarMessage,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSnackBarStore: (selector: any) => selector(mockSnackBarStoreState),
}));

describe("useDownloadReport", () => {
  const createObjectURL = jest.fn().mockReturnValue("blob:report");
  const revokeObjectURL = jest.fn();
  const linkClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // eslint-disable-next-line n/no-unsupported-features/node-builtins
    Object.defineProperty(URL, "createObjectURL", {
      configurable: true,
      value: createObjectURL,
    });
    // eslint-disable-next-line n/no-unsupported-features/node-builtins
    Object.defineProperty(URL, "revokeObjectURL", {
      configurable: true,
      value: revokeObjectURL,
    });
    mockReportStoreState = {
      reports: null,
      selectedReport: null,
      isLoading: false,
      error: null,
      setReports: jest.fn(),
      setSelectedReport: jest.fn(),
      getReports: jest.fn(),
      getReportById: jest.fn(),
      createReport: jest.fn(),
      editReport: jest.fn(),
      deleteReport: jest.fn(),
      approveReport: jest.fn(),
      downloadReport: jest.fn().mockResolvedValue({
        id: "attached-report-id",
        content: btoa("pdf content"),
        createdAt: "2026-05-21",
        createdBy: "Sergio",
      }),
    };

    mockSnackBarStoreState = {
      isSnackBarOpen: false,
      snackBarText: "",
      snackBarSeverity: SnackBarSeverity.INFO,
      callbackFunction: jest.fn(),
      showSnackBarMessage: jest.fn(),
      closeSnackBar: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should download the attached report and show a success message", async () => {
    const {result} = renderHook(() => useDownloadReport());
    jest.spyOn(document, "createElement").mockReturnValue({
      click: linkClick,
      download: "",
      href: "",
    } as unknown as HTMLAnchorElement);

    await act(async () => {
      await result.current.handleDownloadReport("report-id");
    });

    expect(mockReportStoreState.downloadReport).toHaveBeenCalledWith(
      "report-id",
    );
    expect(createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
    expect(linkClick).toHaveBeenCalledTimes(1);
    expect(revokeObjectURL).toHaveBeenCalledWith("blob:report");
    expect(mockSnackBarStoreState.showSnackBarMessage).toHaveBeenCalledWith(
      REPORT_SUCCESSFULLY_DOWNLOAD_START_TEXT,
      SnackBarSeverity.SUCCESS,
    );
  });

  it("should show an error message when there is no report content", async () => {
    mockReportStoreState.downloadReport = jest.fn().mockResolvedValue(null);
    const {result} = renderHook(() => useDownloadReport());

    await act(async () => {
      await result.current.handleDownloadReport("report-id");
    });

    expect(linkClick).not.toHaveBeenCalled();
    expect(mockSnackBarStoreState.showSnackBarMessage).toHaveBeenCalledWith(
      REPORT_FAILED_DOWNLOAD_TEXT,
      SnackBarSeverity.ERROR,
    );
  });
});
