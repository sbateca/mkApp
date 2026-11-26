import {useInterfaceTranslation} from "../../i18n/useInterfaceTranslation";
import {Typography as MuiTypography} from "@mui/material";

import ITypographyProps from "./Types";
import typographyStyle from "./typographyStyle";

export const Typography = ({
  text,
  size,
  padding,
  variant,
  isParagraph = false,
  hasButterBottom = false,
  align = "left",
  color = "black",
  sx = {},
}: ITypographyProps): React.ReactElement => {
  const {t} = useInterfaceTranslation();
  const textColor = typographyStyle[color];
  return (
    <MuiTypography
      fontSize={size}
      padding={padding}
      variant={variant}
      paragraph={isParagraph}
      gutterBottom={hasButterBottom}
      align={align}
      color={textColor}
      sx={{...sx}}
    >
      {t(text)}
    </MuiTypography>
  );
};
