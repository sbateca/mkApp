import {PropsWithChildren, useEffect, useRef} from "react";
import {useSessionStore} from "../../entities/auth/model/store";
import {setUnauthorizedHandler} from "../../shared/api/apliClient";

export const SessionInitializer = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const checkSessionRef = useRef(useSessionStore.getState().checkSession);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      useSessionStore.getState().clearSession();
    });
    void checkSessionRef.current();

    return () => {
      setUnauthorizedHandler(null);
    };
  }, []);
  return <>{children}</>;
};
