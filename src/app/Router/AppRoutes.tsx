import {Alert} from "@mui/material";
import {useWorkspacePermissions} from "../../entities/auth/model/workspacePermissions";
import {useInterfaceTranslation} from "../../shared/i18n/useInterfaceTranslation";
import {Navigate, Route, Routes} from "react-router-dom";
import {PublicOnlyRoute} from "./PublicOnlyRoute";
import {LoginPage} from "../../pages/LoginPage";
import {BaseRoutes} from "../../utils/constants/baseRoutes";
import {AdminLayout} from "../../layouts/AdminLayout";
import {ProtectedRoute} from "./ProtectedRoute";
import {SamplesPage} from "../../pages/SamplesPage";
import {ReportsPage} from "../../pages/ReportsPage";
import {NotFoundPage} from "../../pages/NotFound/ui/NotFoundPage";
import {SampleTypePage} from "../../pages/SampleType/ui/SampleTypePage";
import {ClientsPage} from "../../pages/ClientsPage";
import {AnalytesPage} from "../../pages/AnalytesPage";
import {AnalysisMethodsPage} from "../../pages/AnalysisMethodsPage";
import {CriteriasPage} from "../../pages/CriteriasPage";
import {TestTypesPage} from "../../pages/TestTypesPage";

const modules = [
  [BaseRoutes.CLIENTS, ClientsPage],
  [BaseRoutes.SAMPLE_TYPES, SampleTypePage],
  [BaseRoutes.TEST_TYPES, TestTypesPage],
  [BaseRoutes.ANALYTES, AnalytesPage],
  [BaseRoutes.ANALYSIS_METHODS, AnalysisMethodsPage],
  [BaseRoutes.CRITERIAS, CriteriasPage],
  [BaseRoutes.SAMPLES, SamplesPage],
  [BaseRoutes.REPORTS, ReportsPage],
] as const;

export const AppRoutes = () => {
  const {can, home} = useWorkspacePermissions();
  const {t} = useInterfaceTranslation();

  return (
    <Routes>
      <Route element={<PublicOnlyRoute />}>
        <Route path={BaseRoutes.LOGIN} element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route
            path={BaseRoutes.HOME}
            element={
              home === BaseRoutes.HOME ? (
                <Alert severity="info">
                  {t("Your account has no workspace access.")}
                </Alert>
              ) : (
                <Navigate to={home} replace />
              )
            }
          />
          {modules.map(([path, Page]) => (
            <Route
              key={path}
              path={path}
              element={can(path) ? <Page /> : <Navigate to={home} replace />}
            />
          ))}
        </Route>
      </Route>

      <Route path={BaseRoutes.ANY} element={<NotFoundPage />} />
    </Routes>
  );
};
