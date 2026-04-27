import {Navigate, Outlet} from "react-router-dom";
import {useSessionStore} from "../../entities/auth/model/store";
import {
  selectIsAuthenticated,
  selectIsSessionLoading,
  selectIsSessionResolved,
} from "../../entities/auth/model/selectors";
import {BaseRoutes} from "../../utils/constants/baseRoutes";
import {Spinner} from "../../shared/ui";

export const ProtectedRoute = (): React.ReactElement => {
  const isAuthenticated = useSessionStore(selectIsAuthenticated);
  const isSessionResolved = useSessionStore(selectIsSessionResolved);
  const isSessionLoading = useSessionStore(selectIsSessionLoading);

  if (!isSessionResolved || isSessionLoading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to={BaseRoutes.LOGIN} replace />;
  }

  return <Outlet />;
};
