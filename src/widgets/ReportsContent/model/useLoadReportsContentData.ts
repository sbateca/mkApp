import {useEffect, useState} from "react";
import {
  reportsToTableRows,
  selectGetReports,
  selectIsLoadingReport,
  selectReports,
  useReportStore,
} from "../../../entities/report";
import {TableRowProps} from "../../../shared/ui/Table/TableRow";
import {useTableControls} from "../../../shared/ui/Table/Table/useTableControls";

export const useLoadRepostsContentData = () => {
  const [rows, setRows] = useState<TableRowProps[]>([]);
  const {
    page,
    rowsPerPage,
    order,
    orderBy,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
    handleSearch,
    visibleRows,
    searchValue,
    filteredRowsCount,
  } = useTableControls(rows);

  const reports = useReportStore(selectReports);
  const getReports = useReportStore(selectGetReports);
  const isLoading = useReportStore(selectIsLoadingReport);
  useEffect(() => {
    const loadData = async () => {
      await getReports();
    };

    loadData();
  }, [getReports]);

  useEffect(() => {
    if (!reports) {
      setRows([]);
      return;
    }
    const tableRows = reportsToTableRows(reports);
    setRows(tableRows);
  }, [reports]);

  return {
    rows,
    isLoading,
    page,
    rowsPerPage,
    order,
    orderBy,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
    handleSearch,
    visibleRows,
    filteredRowsCount,
    searchValue,
  };
};
