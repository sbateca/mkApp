import {
  Paper,
  Typography,
  Table as MuiTable,
  TableBody,
  TableContainer,
} from "@mui/material";

import TableHead from "../TableHead/TableHead";
import TableRow from "../../../../components/molecules/TableRow/TableRow";
import {TableProps} from "./Types";
import {TableStyles} from "./TableStyles";
import {NO_RECORDS_MESSAGE} from "../../../../utils/constants";

export const Table = ({headerLabels, rows}: TableProps): React.ReactElement => {
  return (
    <TableContainer component={Paper}>
      {rows.length === 0 ? (
        <Typography sx={TableStyles.noContentStyle}>
          {NO_RECORDS_MESSAGE}
        </Typography>
      ) : (
        <MuiTable sx={{minWidth: 650}} aria-label="sample table">
          <TableHead headerLabels={headerLabels} />
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                id={row.id}
                key={`tablew-row-${index.toString()}`}
                cells={row.cells}
              />
            ))}
          </TableBody>
        </MuiTable>
      )}
    </TableContainer>
  );
};
