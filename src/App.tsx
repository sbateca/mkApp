import {AppThemeProvider} from "./app/Providers/ThemeProvider";
import {AppRouter} from "./app/Router/AppRouter";

export const App = () => {
  return (
    <AppThemeProvider>
      <AppRouter />
    </AppThemeProvider>
  );
};
