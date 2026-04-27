import {create} from "zustand";
import {Report} from "./Report";
import {
  REPORT_ID_MISSING_TEXT,
  REPORT_ID_OR_REPORTS_MISSING_TEXT,
  UNEXPECTED_ERROR,
} from "../../../utils/constants";
import {
  createReportService,
  deleteReportService,
  editReportService,
  getReportByIdService,
  getReportsService,
} from "..";
import {ReportStore} from "./types";

export const useReportStore = create<ReportStore>((set) => ({
  reports: null,
  selectedReport: null,
  isLoading: false,
  error: null,

  setSelectedReport: (report: Report | null) => set({selectedReport: report}),
  setReports: (reports: Report[] | null) => set({reports: reports}),

  getReports: async () => {
    set({isLoading: true, error: null});
    try {
      const reports = await getReportsService();
      set({reports: reports});
      return reports;
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },

  getReportById: async (reportId: string) => {
    set({isLoading: true, error: null});
    try {
      return await getReportByIdService(reportId);
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },

  createReport: async (report: Report) => {
    set({isLoading: true, error: null});
    try {
      return await createReportService(report);
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },

  editReport: async (reportId?: string, report?: Report) => {
    try {
      set({isLoading: true, error: null});
      if (reportId && report) {
        return await editReportService(reportId, report);
      } else {
        set({error: REPORT_ID_OR_REPORTS_MISSING_TEXT});
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
    } finally {
      set({isLoading: false});
    }
    return null;
  },

  deleteReport: async (reportId?: string) => {
    try {
      set({isLoading: true, error: null});
      if (reportId) {
        return await deleteReportService(reportId);
      } else {
        set({error: REPORT_ID_MISSING_TEXT});
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
    } finally {
      set({isLoading: false});
    }
    return null;
  },
}));
