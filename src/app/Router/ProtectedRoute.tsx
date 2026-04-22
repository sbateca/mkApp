import {Navigate, Outlet} from "react-router-dom";
import {useSessionStore} from "../../entities/session/model/store";
import {
  selectIsAuthenticated,
  selectIsSessionResolved,
} from "../../entities/session/model/selectors";
import {BaseRoutes} from "../../utils/constants/baseRoutes";
import {Spinner} from "../../shared/ui";

export const ProtectedRoute = (): React.ReactElement => {
  const isAuthenticated = useSessionStore(selectIsAuthenticated);
  const isSessionResolved = useSessionStore(selectIsSessionResolved);

  if (!isSessionResolved) {
    return <Spinner />;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={BaseRoutes.LOGIN} replace />
  );
};
