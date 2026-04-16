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
import {ProtectedRoute} from "./ProtectedRoute";
import {PublicOnlyRoute} from "./PublicOnlyRoute";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PublicOnlyRoute />}>
          <Route path={BaseRoutes.LOGIN} element={<LoginPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path={BaseRoutes.SAMPLES} element={<SamplesPage />} />
            <Route path={BaseRoutes.REPORTS} element={<ReportsPage />} />
          </Route>
        </Route>

        <Route
          path={BaseRoutes.HOME}
          element={<Navigate to={BaseRoutes.SAMPLES} replace />}
        />
      </Routes>
    </Router>
  );
};
