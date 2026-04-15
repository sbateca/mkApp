import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import {LoginPage} from "../../pages/LoginPage";
import {ReportsPage} from "../../pages/ReportsPage";
import {SamplesPage} from "../../pages/SamplesPage";
import {AdminLayout} from "../../layouts/AdminLayout";
import {BaseRoutes} from "../../utils/constants/baseRoutes";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path={BaseRoutes.LOGIN} element={<LoginPage />} />

        <Route element={<AdminLayout />}>
          <Route path={BaseRoutes.SAMPLES} element={<SamplesPage />} />
          <Route path={BaseRoutes.REPORTS} element={<ReportsPage />} />
        </Route>

        <Route
          path="/"
          element={<Navigate to={BaseRoutes.SAMPLES} replace />}
        />
      </Routes>
    </Router>
  );
};
