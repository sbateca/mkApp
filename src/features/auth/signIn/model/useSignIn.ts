import {useState} from "react";
import {LOGIN_ERROR_ACCESS_DENIED_MESSAGE} from "../../../../utils/constants";
import {SignInRequest} from "../api/signInRequest";
import {useSessionStore} from "../../../../entities/session/model/store";
import {selectSetSession} from "../../../../entities/session/model/selectors";
import {signInRequest} from "../api/authService";

export const useSignIn = () => {
  const setSession = useSessionStore(selectSetSession);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const signIn = async (request: SignInRequest): Promise<void> => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await signInRequest(request);

      if (!response?.user) {
        setErrorMessage(LOGIN_ERROR_ACCESS_DENIED_MESSAGE);
        return;
      }

      setSession({
        user: response.user,
        accessToken: response.accessToken ?? null,
      });
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signIn,
    errorMessage,
    isLoading,
  };
};
