import {useEffect, useState} from "react";
import {localStorageToUser} from "../../../entities/user";
import {LOCAL_STORAGE_USER_KEY} from "../../../utils/constants";

export const useHeaderUser = () => {
  const [username, setUsername] = useState("");
  const [userMenu, setUserMenu] = useState(false);

  useEffect(() => {
    const user = localStorageToUser(
      localStorage.getItem(LOCAL_STORAGE_USER_KEY),
    );

    if (user) {
      setUsername(user.name);
      setUserMenu(true);
    }
  }, []);

  return {username, userMenu};
};
