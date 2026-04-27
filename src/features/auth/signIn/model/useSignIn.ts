import {useSessionStore} from "../../../../entities/auth/model/store";
import {
  selectIsSessionLoading,
  selectLogin,
  selectSessionError,
} from "../../../../entities/auth/model/selectors";
import {LoginRequest} from "../../../../entities/auth";
import {useNavigate} from "react-router-dom";
import {BaseRoutes} from "../../../../utils/constants/baseRoutes";

export const useSignIn = () => {
  const login = useSessionStore(selectLogin);
  const errorMessage = useSessionStore(selectSessionError);
  const isLoading = useSessionStore(selectIsSessionLoading);

  const navigate = useNavigate();

  const handleSignIn = async (loginRequest: LoginRequest): Promise<void> => {
    try {
      await login(loginRequest);
      navigate(BaseRoutes.HOME, {replace: true});
    } catch {
      // error aldready handled. This is intentional
    }
  };

  return {
    handleSignIn,
    errorMessage,
    isLoading,
  };
};
