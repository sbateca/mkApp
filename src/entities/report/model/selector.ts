import {ReportStore} from "./types";

export const selectReports = (store: ReportStore) => store.reports;
export const selectSelectedReport = (store: ReportStore) =>
  store.selectedReport;
export const selectSetSelectedReport = (store: ReportStore) =>
  store.setSelectedReport;
export const selectSetReports = (store: ReportStore) => store.setReports;
export const selectGetReports = (store: ReportStore) => store.getReports;
export const selectGetReportById = (store: ReportStore) => store.getReportById;
export const selectCreateReport = (store: ReportStore) => store.createReport;
export const selectEditReport = (store: ReportStore) => store.editReport;
export const selectDeleteReport = (store: ReportStore) => store.deleteReport;
export const selectIsLoadingReport = (store: ReportStore) => store.isLoading;
export const selectError = (store: ReportStore) => store.error;
