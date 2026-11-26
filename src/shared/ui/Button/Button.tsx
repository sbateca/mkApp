import {useInterfaceTranslation} from "../../i18n/useInterfaceTranslation";
import {Button as MuiButton} from "@mui/material";

import {ButtonConfig} from "./Types";
import {getIcon} from "../../../utils/icons";

export const Button = (
  buttonConfig: ButtonConfig,
): React.ReactElement | null => {
  const {t} = useInterfaceTranslation();
  const {sx, label, disabled, color, icon, variant, size, onClick} =
    buttonConfig;
  return (
    <MuiButton
      variant={variant}
      disabled={disabled}
      size={size}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      color={color as any}
      startIcon={getIcon(icon ?? "")}
      sx={sx || {fontSize: "9px", margin: "2px"}}
      onClick={onClick}
    >
      {t(label)}
    </MuiButton>
  );
};
