import {useWorkspacePermissions} from "../../entities/auth/model/workspacePermissions";
import {Navigate, Outlet} from "react-router-dom";
import {useSessionStore} from "../../entities/auth/model/store";
import {
  selectIsAuthenticated,
  selectIsSessionResolved,
} from "../../entities/auth/model/selectors";
import {Spinner} from "../../shared/ui";

export const PublicOnlyRoute = (): React.ReactElement => {
  const {home} = useWorkspacePermissions();
  const isAuthenticated = useSessionStore(selectIsAuthenticated);
  const isSessionResolved = useSessionStore(selectIsSessionResolved);

  if (!isSessionResolved) {
    return <Spinner />;
  }

  if (isAuthenticated) {
    return <Navigate to={home} replace />;
  }

  return <Outlet />;
};
