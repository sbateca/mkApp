import {fireEvent, render, screen} from "@testing-library/react";

import {ReportSideSectionButtons} from "./ReportsSideSectionButtons";
import {buildReportData} from "../../../shared/test/builders";
import {ReportStatus} from "../../../utils/enums";

let mockIsReadOnlyMode = true;
const mockHandleSwitchReadOnlyMode = jest.fn();

jest.mock("../../../features/readOnlyMode", () => ({
  useReadOnlyMode: () => ({
    isReadOnlyMode: mockIsReadOnlyMode,
    handleSwitchReadOnlyMode: mockHandleSwitchReadOnlyMode,
  }),
}));

describe("ReportSideSectionButtons", () => {
  const defaultActions = {
    handleCreateReport: jest.fn(),
    handleEdit: jest.fn(),
    handleApprove: jest.fn(),
    handleDownload: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockIsReadOnlyMode = true;
  });

  it("should render approval action enabled and download action disabled for draft reports", () => {
    const report = buildReportData({
      id: "draft-report-id",
      status: ReportStatus.DRATF,
    });

    render(
      <ReportSideSectionButtons
        isNotValidForm={false}
        report={report}
        {...defaultActions}
      />,
    );

    const approveButton = screen.getByRole("button", {name: /approve/i});
    const downloadButton = screen.getByRole("button", {name: /download/i});

    expect(approveButton).toBeEnabled();
    expect(downloadButton).toBeDisabled();

    fireEvent.click(approveButton);

    expect(defaultActions.handleApprove).toHaveBeenCalledWith(report.id);
  });

  it("should render download action enabled and approval action disabled for approved reports", () => {
    const report = buildReportData({
      id: "approved-report-id",
      status: ReportStatus.APPROVED,
    });

    render(
      <ReportSideSectionButtons
        isNotValidForm={false}
        report={report}
        {...defaultActions}
      />,
    );

    const approveButton = screen.getByRole("button", {name: /approve/i});
    const downloadButton = screen.getByRole("button", {name: /download/i});

    expect(approveButton).toBeDisabled();
    expect(downloadButton).toBeEnabled();

    fireEvent.click(downloadButton);

    expect(defaultActions.handleDownload).toHaveBeenCalledWith(report.id);
  });

  it("should not render approval and download actions while editing", () => {
    mockIsReadOnlyMode = false;
    const report = buildReportData({
      status: ReportStatus.DRATF,
    });

    render(
      <ReportSideSectionButtons
        isNotValidForm={false}
        report={report}
        {...defaultActions}
      />,
    );

    expect(
      screen.queryByRole("button", {name: /approve/i}),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", {name: /download/i}),
    ).not.toBeInTheDocument();
  });
});
