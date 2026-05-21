import {act, renderHook} from "@testing-library/react";

import {useApproveReport} from "./useApproveReport";
import {ReportStore} from "../../../../entities/report";
import {REPORT_SUCCESSFULLY_APPROVED_TEXT} from "../../../../utils/constants";
import {ReportStatus, SnackBarSeverity} from "../../../../utils/enums";
import {SnackBarStore} from "../../../snackbar/model/types";
import {buildReportData} from "../../../../shared/test/builders";

let mockReportStoreState: ReportStore;
let mockSnackBarStoreState: SnackBarStore;

jest.mock("../../../../entities/report", () => ({
  selectApproveReport: (store: ReportStore) => store.approveReport,
  selectSelectedReport: (store: ReportStore) => store.selectedReport,
  selectSetSelectedReport: (store: ReportStore) => store.setSelectedReport,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useReportStore: (selector: any) => selector(mockReportStoreState),
}));

jest.mock("../../../snackbar", () => ({
  selectShowSnackBarMessage: (store: SnackBarStore) =>
    store.showSnackBarMessage,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSnackBarStore: (selector: any) => selector(mockSnackBarStoreState),
}));

describe("useApproveReport", () => {
  const selectedReport = buildReportData({
    id: "report-id",
    status: ReportStatus.DRATF,
  });

  beforeEach(() => {
    jest.clearAllMocks();

    mockReportStoreState = {
      reports: [selectedReport],
      selectedReport,
      isLoading: false,
      error: null,
      setReports: jest.fn(),
      setSelectedReport: jest.fn(),
      getReports: jest.fn(),
      getReportById: jest.fn(),
      createReport: jest.fn(),
      editReport: jest.fn(),
      deleteReport: jest.fn(),
      approveReport: jest.fn().mockResolvedValue(ReportStatus.APPROVED),
      downloadReport: jest.fn(),
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

  it("should approve the selected report and show a success message", async () => {
    const {result} = renderHook(() => useApproveReport());

    await act(async () => {
      await result.current.handleApproveReport(selectedReport.id);
    });

    expect(mockReportStoreState.approveReport).toHaveBeenCalledWith(
      selectedReport.id,
    );
    expect(mockReportStoreState.setSelectedReport).toHaveBeenCalledWith({
      ...selectedReport,
      status: ReportStatus.APPROVED,
    });
    expect(mockSnackBarStoreState.showSnackBarMessage).toHaveBeenCalledWith(
      REPORT_SUCCESSFULLY_APPROVED_TEXT,
      SnackBarSeverity.SUCCESS,
    );
  });

  it("should not update report or notify when approval does not return approved", async () => {
    mockReportStoreState.approveReport = jest
      .fn()
      .mockResolvedValue(ReportStatus.DRATF);
    const {result} = renderHook(() => useApproveReport());

    await act(async () => {
      await result.current.handleApproveReport(selectedReport.id);
    });

    expect(mockReportStoreState.setSelectedReport).not.toHaveBeenCalled();
    expect(mockSnackBarStoreState.showSnackBarMessage).not.toHaveBeenCalled();
  });
});
