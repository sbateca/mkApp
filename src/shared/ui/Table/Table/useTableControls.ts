import React from "react";

import {Order} from "./Types";

export const useTableControls = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<number>();

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

  return {
    page,
    rowsPerPage,
    order,
    orderBy,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
  };
};
