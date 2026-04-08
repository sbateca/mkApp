import React from "react";
import {TableRowProps} from "../TableRow/Types";

export interface TableProps {
  headerLabels: string[];
  rows: TableRowProps[];
  renderActions?: (row: TableRowProps) => React.ReactElement;
}
