import React, {useState} from "react";

import {Order} from "./Types";
import {TableRowProps} from "../TableRow";

export const useTableControls = (rows: TableRowProps[]) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<number>();
  const [searchValue, setSearchValue] = useState("");

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (columnIndex: number) => {
    const isAsc = orderBy === columnIndex && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(columnIndex);
    setPage(0);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const visibleRows = React.useMemo(() => {
    const filteredRows = rows.filter((row) =>
      row.cells.some((cell) =>
        String(cell.children ?? "")
          .toLowerCase()
          .includes(searchValue.toLowerCase()),
      ),
    );

    const sortedRows =
      orderBy === undefined
        ? filteredRows
        : [...filteredRows].sort((firstRow, secondRow) => {
            const firstValue = firstRow.cells[orderBy]?.children;
            const secondValue = secondRow.cells[orderBy]?.children;

            const comparison = String(firstValue ?? "").localeCompare(
              String(secondValue ?? ""),
              undefined,
              {numeric: true, sensitivity: "base"},
            );

            return order === "asc" ? comparison : -comparison;
          });

    return sortedRows.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );
  }, [order, orderBy, page, rows, rowsPerPage, searchValue]);

  const filteredRowsCount = React.useMemo(() => {
    return rows.filter((row) =>
      row.cells.some((cell) =>
        String(cell.children ?? "")
          .toLowerCase()
          .includes(searchValue.toLowerCase()),
      ),
    ).length;
  }, [rows, searchValue]);

  return {
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
