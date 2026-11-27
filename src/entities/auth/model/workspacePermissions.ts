import {BaseRoutes} from "../../../utils/constants/baseRoutes";
import {SessionUser} from "../../user";
import {selectUser} from "./selectors";
import {useSessionStore} from "./store";

type Action = "read" | "create" | "update" | "delete" | "approve" | "download";
const catalogModules = [
  BaseRoutes.SAMPLE_TYPES,
  BaseRoutes.TEST_TYPES,
  BaseRoutes.ANALYTES,
  BaseRoutes.ANALYSIS_METHODS,
  BaseRoutes.CRITERIAS,
] as const;

const fullAccess: readonly Action[] = ["read", "create", "update", "delete"];
const readOnly: readonly Action[] = ["read"];
const catalogAccess = (
  action: Action,
  module: BaseRoutes,
  actions: readonly Action[],
) =>
  catalogModules.some((entry) => entry === module) && actions.includes(action);

const roleAllows = (
  role: string,
  module: BaseRoutes,
  action: Action,
): boolean => {
  switch (role.trim().toLowerCase()) {
    case "admin":
      return true;
    case "technical director":
      return (
        (module === BaseRoutes.SAMPLES && fullAccess.includes(action)) ||
        module === BaseRoutes.REPORTS ||
        catalogAccess(action, module, fullAccess)
      );
    case "analyst":
      if (module === BaseRoutes.SAMPLES)
        return action === "read" || action === "update";
      if (module === BaseRoutes.REPORTS)
        return action !== "delete" && action !== "approve";
      return catalogAccess(action, module, readOnly);
    case "receptionist":
      if (module === BaseRoutes.CLIENTS || module === BaseRoutes.SAMPLES)
        return action === "read" || action === "create";
      return (
        (module === BaseRoutes.SAMPLE_TYPES && action === "read") ||
        (module === BaseRoutes.REPORTS && action === "download")
      );
    case "client":
      return (
        module === BaseRoutes.REPORTS &&
        (action === "read" || action === "download")
      );
    default:
      return false;
  }
};

export const canAccessWorkspaceModule = (
  user: SessionUser | null,
  module: BaseRoutes,
  action: Action = "read",
): boolean =>
  (user?.roles ?? (user ? [user.role] : [])).some((role) =>
    roleAllows(role, module, action),
  );

export const useWorkspacePermissions = () => {
  const user = useSessionStore(selectUser);
  const can = (module: BaseRoutes, action?: Action) =>
    canAccessWorkspaceModule(user, module, action);

  return {
    can,
    // Sample creation requires choosing a client from the client catalog.
    canCreateSample:
      can(BaseRoutes.SAMPLES, "create") && can(BaseRoutes.CLIENTS),
    home: can(BaseRoutes.SAMPLES)
      ? BaseRoutes.SAMPLES
      : can(BaseRoutes.REPORTS)
        ? BaseRoutes.REPORTS
        : BaseRoutes.HOME,
  };
};
