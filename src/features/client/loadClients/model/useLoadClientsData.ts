import {useEffect, useState} from "react";
import {TableRowProps} from "../../../../shared/ui";
import {useTableControls} from "../../../../shared/ui/Table/Table/useTableControls";
import {
  selectGetClients,
  selectIsLoadingClient,
  useClientStore,
} from "../../../../entities/client";
import {clientToTableRows} from "../lib/clientMappers";

export const useLoadClientsData = () => {
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

  const getClients = useClientStore(selectGetClients);
  const isLoading = useClientStore(selectIsLoadingClient);

  useEffect(() => {
    const loadClients = async () => {
      const clients = await getClients();
      setRows(clientToTableRows(clients || []));
    };

    loadClients();
  }, [getClients]);

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
