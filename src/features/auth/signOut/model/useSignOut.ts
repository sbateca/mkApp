import {useNavigate} from "react-router-dom";
import {BaseRoutes} from "../../../../utils/constants/baseRoutes";
import {selectLogout, useSessionStore} from "../../../../entities/auth";

export const useSignOut = () => {
  const navigate = useNavigate();
  const logout = useSessionStore(selectLogout);

  const handleSignOut = async () => {
    await logout();
    navigate(BaseRoutes.LOGIN, {replace: true});
  };

  return {handleSignOut};
};
