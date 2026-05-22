import {
  Paper,
  Typography,
  Table as MuiTable,
  TableBody,
  TableContainer,
  TablePagination,
} from "@mui/material";

import TableHead from "../TableHead/TableHead";
import {TableProps} from "./Types";
import {TableStyles} from "./TableStyles";
import {NO_RECORDS_MESSAGE} from "../../../../utils/constants";
import {TableRow} from "../TableRow";
import React from "react";

export const Table = ({
  headerLabels,
  rows,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
  handleRequestSort,
  orderBy,
  order,
  renderActions,
}: TableProps): React.ReactElement => {
  const visibleRows = React.useMemo(() => {
    const sortedRows =
      orderBy === undefined
        ? rows
        : [...rows].sort((firstRow, secondRow) => {
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
  }, [order, orderBy, page, rows, rowsPerPage]);

  return (
    <>
      <TableContainer component={Paper}>
        {rows.length === 0 ? (
          <Typography sx={TableStyles.noContentStyle}>
            {NO_RECORDS_MESSAGE}
          </Typography>
        ) : (
          <MuiTable sx={{minWidth: 650}} aria-label="sample table">
            <TableHead
              headerLabels={headerLabels}
              order={order}
              orderBy={orderBy}
              sortableColumnCount={rows[0]?.cells.length ?? 0}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row, index) => (
                <TableRow
                  id={row.id}
                  key={row.id ?? `table-row-${index.toString()}`}
                  cells={row.cells}
                  actions={renderActions ? renderActions(row) : undefined}
                />
              ))}
            </TableBody>
          </MuiTable>
        )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};
