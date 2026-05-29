import {useEffect, useState} from "react";
import {TableRowProps} from "../../../../shared/ui";
import {useTableControls} from "../../../../shared/ui/Table/Table/useTableControls";
import {
  selectGetSampleTypes,
  selectIsLoadingSampleTypes,
  selectSetSampleTypes,
  useSampleTypeStore,
} from "../../../../entities/sampleType";
import {sampleTypeToTableRows} from "../lib/sampleTypeMappers";

export const useLoadSampleTypesData = () => {
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

  const getSampleTypes = useSampleTypeStore(selectGetSampleTypes);
  const setSampleTypes = useSampleTypeStore(selectSetSampleTypes);
  const isLoading = useSampleTypeStore(selectIsLoadingSampleTypes);

  useEffect(() => {
    const loadSampleTypes = async () => {
      const sampleTypes = await getSampleTypes();
      setRows(sampleTypeToTableRows(sampleTypes || []));
    };

    loadSampleTypes();
  }, [getSampleTypes, setSampleTypes]);

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
