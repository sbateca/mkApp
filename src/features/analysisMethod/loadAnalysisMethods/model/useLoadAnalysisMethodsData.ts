import {useEffect, useState} from "react";
import {TableRowProps} from "../../../../shared/ui";
import {useTableControls} from "../../../../shared/ui/Table/Table/useTableControls";
import {
  selectAnalysisMethods,
  selectGetAnalysisMethods,
  selectIsLoadingAnalysisMethods,
  useAnalysisMethodsStore,
} from "../../../../entities/analysisMethod";
import {analysisMethodToTableRows} from "../lib/analysisMethodMappers";

export const useLoadAnalysisMethodsData = () => {
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

  const analysisMethods = useAnalysisMethodsStore(selectAnalysisMethods);
  const getAnalysisMethods = useAnalysisMethodsStore(selectGetAnalysisMethods);
  const isLoading = useAnalysisMethodsStore(selectIsLoadingAnalysisMethods);

  useEffect(() => {
    const loadAnalysisMethods = async () => {
      const loadedAnalysisMethods = await getAnalysisMethods();
      setRows(analysisMethodToTableRows(loadedAnalysisMethods || []));
    };

    loadAnalysisMethods();
  }, [getAnalysisMethods]);

  useEffect(() => {
    setRows(analysisMethodToTableRows(analysisMethods || []));
  }, [analysisMethods]);

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
