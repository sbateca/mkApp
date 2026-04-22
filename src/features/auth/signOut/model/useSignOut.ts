import {useNavigate} from "react-router-dom";
import {useSessionStore} from "../../../../entities/session/model/store";
import {selectClearSession} from "../../../../entities/session/model/selectors";
import {BaseRoutes} from "../../../../utils/constants/baseRoutes";

export const useSignOut = () => {
  const clearSession = useSessionStore(selectClearSession);
  const navigate = useNavigate();

  const signOut = (): void => {
    clearSession();
    navigate(BaseRoutes.LOGIN, {replace: true});
  };

  return {signOut};
};
