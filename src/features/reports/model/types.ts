import {Report} from "../../../model";

export type ReportStore = {
  reports: Report[] | null;
  selectedReport: Report | null;
  isLoading: boolean;
  error: string | null;
  setReports: (reports: Report[] | null) => void;
  setSelectedReport: (report: Report | null) => void;
  getReports: () => Promise<Report[] | null>;
  getReportById: (reportId: string) => Promise<Report | null>;
  createReport: (report: Report) => Promise<Report | null>;
  editReport: (reportId?: string, report?: Report) => Promise<Report | null>;
  deleteReport: (reportId?: string) => Promise<Report | null>;
};
