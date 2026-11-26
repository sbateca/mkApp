import {useInterfaceTranslation} from "../../../i18n/useInterfaceTranslation";
import {
  TableHead as MuiTableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";

import {TableCell} from "../TableCell";
import {TableHeadProps} from "./Types";

function TableHead({
  headerLabels,
  order = "asc",
  orderBy,
  sortableColumnCount = headerLabels.length,
  onRequestSort,
}: TableHeadProps): React.ReactElement {
  const {t} = useInterfaceTranslation();
  return (
    <MuiTableHead>
      <TableRow>
        {headerLabels.map((label: string, index: number) => {
          const isSortable =
            Boolean(onRequestSort) && index < sortableColumnCount;

          return (
            <TableCell key={`header-cell-${index.toString()}`} align="left">
              {isSortable ? (
                <TableSortLabel
                  active={orderBy === index}
                  direction={orderBy === index ? order : "asc"}
                  onClick={() => onRequestSort?.(index)}
                >
                  {t(label)}
                </TableSortLabel>
              ) : (
                t(label)
              )}
            </TableCell>
          );
        })}
      </TableRow>
    </MuiTableHead>
  );
}

export default TableHead;
