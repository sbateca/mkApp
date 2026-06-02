import {useEffect, useState} from "react";
import {TableRowProps} from "../../../../shared/ui";
import {useTableControls} from "../../../../shared/ui/Table/Table/useTableControls";
import {
  selectCriterias,
  selectGetCriterias,
  selectIsLoadingCriterias,
  useCriteriaStore,
} from "../../../../entities/criteria";
import {criteriaToTableRows} from "../lib/criteriaMappers";

export const useLoadCriteriasData = () => {
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

  const criterias = useCriteriaStore(selectCriterias);
  const getCriterias = useCriteriaStore(selectGetCriterias);
  const isLoading = useCriteriaStore(selectIsLoadingCriterias);

  useEffect(() => {
    const loadCriterias = async () => {
      const loadedCriterias = await getCriterias();
      setRows(criteriaToTableRows(loadedCriterias || []));
    };

    loadCriterias();
  }, [getCriterias]);

  useEffect(() => {
    setRows(criteriaToTableRows(criterias || []));
  }, [criterias]);

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
