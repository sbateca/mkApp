import {useInterfaceTranslation} from "../../../i18n/useInterfaceTranslation";
import {
  Box,
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
  const {t} = useInterfaceTranslation();
  return (
    <Paper variant="outlined" sx={TableStyles.card}>
      <Box sx={TableStyles.toolbar}>
        <TableSearch searchValue={searchValue} handleSearch={handleSearch} />
      </Box>
      <TableContainer>
        {filteredRowsCount === 0 ? (
          <Typography sx={TableStyles.noContentStyle}>
            {t(NO_RECORDS_MESSAGE)}
          </Typography>
        ) : (
          <MuiTable sx={TableStyles.table}>
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
    </Paper>
  );
};
