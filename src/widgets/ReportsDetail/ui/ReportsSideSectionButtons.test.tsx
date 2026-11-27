import {fireEvent, render, screen} from "@testing-library/react";

import {ReportSideSectionButtons} from "./ReportsSideSectionButtons";
import {buildReportData} from "../../../shared/test/builders";
import {ReportStatus} from "../../../utils/enums";

const mockSetIsReadOnlyMode = jest.fn();

jest.mock("../../../features/readOnlyMode", () => ({
  useReadOnlyMode: () => ({
    setIsReadOnlyMode: mockSetIsReadOnlyMode,
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
  });

  it("should render approval action enabled and download action disabled for draft reports", () => {
    const report = buildReportData({
      id: "draft-report-id",
      status: ReportStatus.DRATF,
      actions: {approve: {allowed: true}, download: {allowed: false}},
    });

    render(
      <ReportSideSectionButtons
        mode="read"
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
      actions: {approve: {allowed: false}, download: {allowed: true}},
    });

    render(
      <ReportSideSectionButtons
        mode="read"
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

  it("disables edit, approve and download when decisions are absent", () => {
    render(
      <ReportSideSectionButtons
        mode="read"
        report={buildReportData({status: ReportStatus.DRATF})}
        {...defaultActions}
      />,
    );

    for (const name of [/edit/i, /approve/i, /download/i]) {
      expect(screen.getByRole("button", {name})).toBeDisabled();
    }
  });

  it("should not render approval and download actions while editing", () => {
    const report = buildReportData({
      status: ReportStatus.DRATF,
    });

    render(
      <ReportSideSectionButtons
        mode="edit"
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
