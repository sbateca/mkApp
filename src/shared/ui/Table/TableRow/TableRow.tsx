import {TableRow as MuiTableRow} from "@mui/material";

import {TableRowProps} from "./Types";
import {Spinner} from "../../Spinner";
import {TableCell} from "../TableCell";

export const TableRow = ({
  cells,
  actions,
}: TableRowProps): React.ReactElement => {
  return cells.length === 0 ? (
    <Spinner />
  ) : (
    <MuiTableRow>
      {cells.map((cell, index) => {
        return (
          <TableCell key={`table-cell-${index.toString()}`} align={cell.align}>
            {cell.children}
          </TableCell>
        );
      })}
      {actions && <TableCell align="left">{actions}</TableCell>}
    </MuiTableRow>
  );
};
