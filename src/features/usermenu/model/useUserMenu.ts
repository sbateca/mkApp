import {useSignOut} from "../../auth/signOut/model/useSignOut";
import {useUserMenuStore} from "./store";

export const useUserMenu = () => {
  const {handleClose} = useUserMenuStore();
  const {signOut} = useSignOut();

  const handleLogout = () => {
    signOut();
    handleClose();
  };

  return {
    handleLogout,
  };
};
