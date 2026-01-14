import {create} from "zustand";
import {UserMenuStore} from "./types";
import {LOCAL_STORAGE_USER_KEY} from "../../../utils/constants";

export const useUserMenuStore = create<UserMenuStore>((set) => ({
  username: "",
  anchorEl: null,

  handleMenu: (event: React.MouseEvent<HTMLElement>) =>
    set({anchorEl: event.currentTarget}),
  handleClose: () => set({anchorEl: null}),
  handleLogout: () => {
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    window.location.reload();
  },
}));
