import {useInterfaceTranslation} from "../../../i18n/useInterfaceTranslation";
import {formatInterfaceDate} from "../../../i18n/formatInterfaceDate";
import {Chip, TableCell as MuiTableCell} from "@mui/material";

import {TableCellProps} from "./Types";

export const TableCell = ({
  children,
  align,
  badgeColor,
  isDate,
}: TableCellProps): React.ReactElement => {
  const {t, language} = useInterfaceTranslation();
  return (
    <MuiTableCell align={align}>
      {badgeColor ? (
        <Chip
          label={typeof children === "string" ? t(children) : children}
          color={badgeColor}
          size="small"
          variant="outlined"
          sx={{fontWeight: 650}}
        />
      ) : isDate && typeof children === "string" ? (
        formatInterfaceDate(children, language)
      ) : (
        children
      )}
    </MuiTableCell>
  );
};
