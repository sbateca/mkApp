import React from "react";

import {TableRowProps} from "../TableRow/Types";

export interface TableProps {
  headerLabels: string[];
  rows: TableRowProps[];
  rowsPerPage: number;
  page: number;
  handleChangePage: (_event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRequestSort: (columnIndex: number) => void;
  orderBy: number | undefined;
  order: Order;
  renderActions?: (row: TableRowProps) => React.ReactElement;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  visibleRows: TableRowProps[];
  filteredRowsCount: number;
  searchValue: string;
}

export type Order = "asc" | "desc";
