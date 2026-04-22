import {create} from "zustand";
import {UserMenuStore} from "./types";

export const useUserMenuStore = create<UserMenuStore>((set) => ({
  username: "",
  anchorEl: null,

  handleMenu: (event: React.MouseEvent<HTMLElement>) =>
    set({anchorEl: event.currentTarget}),
  handleClose: () => set({anchorEl: null}),
}));
