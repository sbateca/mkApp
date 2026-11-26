import {LanguageProvider} from "./app/Providers/LanguageProvider";
import {SessionInitializer} from "./app/init/sessionInitializer";
import {AppThemeProvider} from "./app/Providers/ThemeProvider";
import {AppRouter} from "./app/Router/AppRouter";

export const App = () => {
  return (
    <LanguageProvider>
      <AppThemeProvider>
        <SessionInitializer>
          <AppRouter />
        </SessionInitializer>
      </AppThemeProvider>
    </LanguageProvider>
  );
};
