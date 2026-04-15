import {ThemeProvider, createTheme} from "@mui/material/styles";

const theme = createTheme({});

type AppThemeProviderProps = {
  children: React.ReactNode;
};

export const AppThemeProvider = ({children}: AppThemeProviderProps) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
