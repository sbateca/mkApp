import {Navigate, Route, Routes} from "react-router-dom";
import {PublicOnlyRoute} from "./PublicOnlyRoute";
import {LoginPage} from "../../pages/LoginPage";
import {BaseRoutes} from "../../utils/constants/baseRoutes";
import {AdminLayout} from "../../layouts/AdminLayout";
import {ProtectedRoute} from "./ProtectedRoute";
import {SamplesPage} from "../../pages/SamplesPage";
import {ReportsPage} from "../../pages/ReportsPage";
import {NotFoundPage} from "../../pages/NotFound/ui/NotFoundPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicOnlyRoute />}>
        <Route path={BaseRoutes.LOGIN} element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route
            path={BaseRoutes.HOME}
            element={<Navigate to={BaseRoutes.SAMPLES} replace />}
          />
          <Route path={BaseRoutes.SAMPLES} element={<SamplesPage />} />
          <Route path={BaseRoutes.REPORTS} element={<ReportsPage />} />
        </Route>
      </Route>

      <Route path={BaseRoutes.ANY} element={<NotFoundPage />} />
    </Routes>
  );
};
