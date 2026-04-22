import {BrowserRouter as Router} from "react-router-dom";
import {AppRoutes} from "./AppRoutes";

export const AppRouter = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};
