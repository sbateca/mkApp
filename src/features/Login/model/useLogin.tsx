import {useEffect} from "react";
import {useNavigate} from "react-router";

import {LOCAL_STORAGE_USER_KEY} from "../../../utils/constants";
import {localStorageContainsField} from "../../../utils/localStorage";
import {LoginTemplate} from "../ui/Login";

export const Login = (): React.ReactElement => {
  const navigate = useNavigate();

  useEffect(() => {
    const hasUserData = localStorageContainsField(LOCAL_STORAGE_USER_KEY);
    if (hasUserData) {
      navigate("/admin");
    }
  }, []);

  return <LoginTemplate />;
};
