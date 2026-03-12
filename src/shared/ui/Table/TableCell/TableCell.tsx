import {TableCell as MuiTableCell} from "@mui/material";

import {TableCellProps} from "./Types";

export const TableCell = ({
  children,
  align,
}: TableCellProps): React.ReactElement => {
  return <MuiTableCell align={align}>{children}</MuiTableCell>;
};
