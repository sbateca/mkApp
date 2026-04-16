import {SessionInitializer} from "./app/init/sessionInitializer";
import {AppThemeProvider} from "./app/Providers/ThemeProvider";
import {AppRouter} from "./app/Router/AppRouter";

export const App = () => {
  return (
    <AppThemeProvider>
      <SessionInitializer>
        <AppRouter />
      </SessionInitializer>
    </AppThemeProvider>
  );
};
