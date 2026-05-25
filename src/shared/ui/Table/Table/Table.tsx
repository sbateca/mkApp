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
import {TableSearch} from "../TableSearch";

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
  handleSearch,
  visibleRows,
  filteredRowsCount,
  searchValue,
}: TableProps): React.ReactElement => {
  return (
    <>
      <TableSearch searchValue={searchValue} handleSearch={handleSearch} />
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
        count={filteredRowsCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};
