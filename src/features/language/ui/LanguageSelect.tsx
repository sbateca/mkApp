import {TextField, MenuItem} from "@mui/material";
import {languages, isLanguage} from "../../../shared/i18n/language";
import {useInterfaceTranslation} from "../../../shared/i18n/useInterfaceTranslation";

export const LanguageSelect = ({compact = false}: {compact?: boolean}) => {
  const {t, language, changeLanguage} = useInterfaceTranslation();

  return (
    <TextField
      select
      label={compact ? undefined : t("Language")}
      inputProps={compact ? {"aria-label": t("Language")} : undefined}
      size="small"
      value={language}
      sx={
        compact
          ? {
              flexShrink: 0,
              mr: 1.5,
              "& .MuiOutlinedInput-root": {
                bgcolor: "transparent",
                color: "inherit",
                fontSize: "0.875rem",
              },
              "& .MuiSelect-select": {py: 0.5},
              "& .MuiSelect-icon": {color: "inherit"},
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.45)",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "currentColor",
                },
            }
          : {minWidth: 132}
      }
      onChange={(event) => {
        if (isLanguage(event.target.value)) {
          void changeLanguage(event.target.value);
        }
      }}
    >
      <MenuItem value="es" lang="es">
        {languages.es}
      </MenuItem>
      <MenuItem value="en" lang="en">
        {languages.en}
      </MenuItem>
    </TextField>
  );
};
