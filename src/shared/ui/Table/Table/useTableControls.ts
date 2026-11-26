import {formatInterfaceDate} from "../../../i18n/formatInterfaceDate";
import {useInterfaceTranslation} from "../../../i18n/useInterfaceTranslation";
import React, {useState} from "react";

import {Order} from "./Types";
import {TableRowProps} from "../TableRow";

export const useTableControls = (rows: TableRowProps[]) => {
  const {language, t} = useInterfaceTranslation();
  const [requestedPage, setPage] = React.useState(0);
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
    setPage(0);
  };

  const filteredRows = React.useMemo(() => {
    const query = searchValue.toLocaleLowerCase(language);
    return rows.filter((row) =>
      row.cells.some((cell) => {
        const raw = String(cell.children ?? "");
        const visible = cell.badgeColor
          ? t(raw)
          : cell.isDate
            ? formatInterfaceDate(raw, language)
            : raw;
        return [raw, visible].some((text) =>
          text.toLocaleLowerCase(language).includes(query),
        );
      }),
    );
  }, [language, rows, searchValue, t]);

  const page = Math.min(
    requestedPage,
    Math.max(0, Math.ceil(filteredRows.length / rowsPerPage) - 1),
  );

  const visibleRows = React.useMemo(() => {
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
  }, [filteredRows, order, orderBy, page, rowsPerPage]);

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
    filteredRowsCount: filteredRows.length,
    searchValue,
  };
};
