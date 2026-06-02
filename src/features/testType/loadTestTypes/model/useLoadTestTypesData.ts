import {useEffect, useState} from "react";
import {TableRowProps} from "../../../../shared/ui";
import {useTableControls} from "../../../../shared/ui/Table/Table/useTableControls";
import {
  selectGetTestTypes,
  selectIsLoadingTestTypes,
  selectTestTypes,
  useTestTypeStore,
} from "../../../../entities/testType";
import {testTypeToTableRows} from "../lib/testTypeMappers";

export const useLoadTestTypesData = () => {
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

  const testTypes = useTestTypeStore(selectTestTypes);
  const getTestTypes = useTestTypeStore(selectGetTestTypes);
  const isLoading = useTestTypeStore(selectIsLoadingTestTypes);

  useEffect(() => {
    const loadTestTypes = async () => {
      const loadedTestTypes = await getTestTypes();
      setRows(testTypeToTableRows(loadedTestTypes || []));
    };

    loadTestTypes();
  }, [getTestTypes]);

  useEffect(() => {
    setRows(testTypeToTableRows(testTypes || []));
  }, [testTypes]);

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
