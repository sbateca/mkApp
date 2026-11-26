import {esES} from "@mui/material/locale";
import {useInterfaceTranslation} from "../../shared/i18n/useInterfaceTranslation";
import {ThemeProvider, createTheme} from "@mui/material/styles";

const themeOptions = {
  palette: {
    primary: {main: "#1c2876", dark: "#131d4e"},
    secondary: {main: "#267fb4"},
    background: {default: "#f2f7fb", paper: "#fff"},
    text: {primary: "#131d4e", secondary: "#5c6574"},
    divider: "#dce6f1",
  },
  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
  },
  shape: {borderRadius: 12},
  components: {
    MuiButton: {
      defaultProps: {disableElevation: true},
      styleOverrides: {
        root: {textTransform: "none", fontWeight: 650},
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {backgroundColor: "#fff"},
        notchedOutline: {borderColor: "#cad8e7"},
      },
    },
  },
};

const themes = {
  en: createTheme(themeOptions),
  es: createTheme(themeOptions, esES),
};

type AppThemeProviderProps = {
  children: React.ReactNode;
};

export const AppThemeProvider = ({children}: AppThemeProviderProps) => {
  const {language} = useInterfaceTranslation();
  return <ThemeProvider theme={themes[language]}>{children}</ThemeProvider>;
};
