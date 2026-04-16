import {Navigate, Outlet} from "react-router-dom";
import {useSessionStore} from "../../entities/session/model/store";
import {
  selectIsAuthenticated,
  selectIsSessionResolved,
} from "../../entities/session/model/selectors";
import {BaseRoutes} from "../../utils/constants/baseRoutes";
import {Spinner} from "../../shared/ui";

export const PublicOnlyRoute = (): React.ReactElement => {
  const isAuthenticated = useSessionStore(selectIsAuthenticated);
  const isSessionResolved = useSessionStore(selectIsSessionResolved);

  if (!isSessionResolved) {
    return <Spinner />;
  }

  if (isAuthenticated) {
    return <Navigate to={BaseRoutes.HOME} replace />;
  }

  return <Outlet />;
};
