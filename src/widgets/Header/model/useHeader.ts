import {useEffect, useState} from "react";
import {useSessionStore} from "../../../entities/auth/model/store";
import {selectUser} from "../../../entities/auth/model/selectors";

export const useHeaderUser = () => {
  const [username, setUsername] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);

  const user = useSessionStore(selectUser);

  useEffect(() => {
    if (user) {
      setUsername(user.name);
      setShowUserMenu(true);
    }
  }, []);

  return {username, showUserMenu};
};
