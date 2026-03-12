import {TableHead as MuiTableHead, TableRow} from "@mui/material";

import {TableCell} from "../TableCell";
import {TableHeadProps} from "./Types";

function TableHead({headerLabels}: TableHeadProps): React.ReactElement {
  return (
    <MuiTableHead>
      <TableRow>
        {headerLabels.map((label: string, index: number) => (
          <TableCell key={`header-cell-${index.toString()}`} align="left">
            {label}
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  );
}

export default TableHead;
