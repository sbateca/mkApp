import {PropsWithChildren, useEffect, useRef} from "react";
import {useSessionStore} from "../../entities/auth/model/store";

export const SessionInitializer = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const checkSessionRef = useRef(useSessionStore.getState().checkSession);

  useEffect(() => {
    void checkSessionRef.current();
  }, []);
  return <>{children}</>;
};
