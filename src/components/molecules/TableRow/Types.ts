import {TableCellProps} from "../../../shared/ui/Table/TableCell/Types";
export interface TableRowProps {
  id?: string;
  key?: string;
  cells: TableCellProps[];
}
