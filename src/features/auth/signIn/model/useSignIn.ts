import {useState} from "react";
import {useSessionStore} from "../../../../entities/session/model/store";
import {selectSetSession} from "../../../../entities/session/model/selectors";
import {signInRequest} from "../api/authService";
import {SignInRequest} from "../api/types";

export const useSignIn = () => {
  const setSession = useSessionStore(selectSetSession);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const signIn = async (request: SignInRequest): Promise<void> => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await signInRequest(request);

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
