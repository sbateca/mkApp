import {PropsWithChildren, useEffect} from "react";
import {useSessionStore} from "../../entities/session/model/store";
import {
  selectMarkSessionResolved,
  selectSetSession,
} from "../../entities/session/model/selectors";
import {STORAGE_KEYS} from "../../config/storage";
import {getFromStorage} from "../../utils/browserStorage";
import {User} from "../../entities/user";

type StoredSession = {
  user: User | null;
  accessToken: string | null;
};

export const SessionInitializer = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const setSession = useSessionStore(selectSetSession);
  const markSessionResolved = useSessionStore(selectMarkSessionResolved);

  useEffect(() => {
    const storedSession = getFromStorage<StoredSession>(STORAGE_KEYS.SESSION);

    if (storedSession?.user) {
      setSession({
        user: storedSession.user,
        accessToken: storedSession.accessToken,
      });
      return;
    }

    markSessionResolved();
  }, []);

  return <>{children}</>;
};
