import {useSignOut} from "../../auth/signOut/model/useSignOut";
import {useUserMenuStore} from "./store";

export const useUserMenu = () => {
  const {handleClose} = useUserMenuStore();
  const {handleSignOut} = useSignOut();

  const handleLogout = () => {
    handleSignOut();
    handleClose();
  };

  return {
    handleLogout,
  };
};
