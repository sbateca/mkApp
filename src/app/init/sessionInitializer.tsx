import {PropsWithChildren, useEffect} from "react";
import {useSessionStore} from "../../entities/session/model/store";
import {
  selectMarkSessionResolved,
  selectSetSession,
} from "../../entities/session/model/selectors";
import {getSession} from "../../entities/session/lib/sessionStorage";

export const SessionInitializer = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const setSession = useSessionStore(selectSetSession);
  const markSessionResolved = useSessionStore(selectMarkSessionResolved);

  useEffect(() => {
    const storedSession = getSession();

    if (storedSession?.user) {
      setSession({
        user: storedSession.user,
        accessToken: storedSession.accessToken,
      });
      return;
    }

    markSessionResolved();
  }, [markSessionResolved, setSession]);

  return <>{children}</>;
};
