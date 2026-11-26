import type {ReactNode} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {esES} from "@mui/x-date-pickers/locales";
import "dayjs/locale/es";
import {useInterfaceTranslation} from "./useInterfaceTranslation";

export const LocalizedDateProvider = ({children}: {children: ReactNode}) => {
  const {language} = useInterfaceTranslation();

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={language}
      localeText={
        language === "es"
          ? esES.components.MuiLocalizationProvider.defaultProps.localeText
          : undefined
      }
    >
      {children}
    </LocalizationProvider>
  );
};
