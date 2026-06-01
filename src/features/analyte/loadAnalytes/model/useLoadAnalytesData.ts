import {useEffect, useState} from "react";
import {TableRowProps} from "../../../../shared/ui";
import {useTableControls} from "../../../../shared/ui/Table/Table/useTableControls";
import {
  selectAnalytes,
  selectGetAnalytes,
  selectIsLoadingAnalytes,
  useAnalyteStore,
} from "../../../../entities/analyte";
import {analyteToTableRows} from "../lib/analyteMappers";

export const useLoadAnalytesData = () => {
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

  const analytes = useAnalyteStore(selectAnalytes);
  const getAnalytes = useAnalyteStore(selectGetAnalytes);
  const isLoading = useAnalyteStore(selectIsLoadingAnalytes);

  useEffect(() => {
    const loadAnalytes = async () => {
      const loadedAnalytes = await getAnalytes();
      setRows(analyteToTableRows(loadedAnalytes || []));
    };

    loadAnalytes();
  }, [getAnalytes]);

  useEffect(() => {
    setRows(analyteToTableRows(analytes || []));
  }, [analytes]);

  return {
    rows,
    visibleRows,
    rowsPerPage,
    isLoading,
    filteredRowsCount,
    page,
    order,
    orderBy,
    searchValue,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
    handleSearch,
  };
};
