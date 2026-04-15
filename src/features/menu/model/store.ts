import {create} from "zustand";
import {MenuStore} from "./types";

export const useMenuStore = create<MenuStore>((set) => ({
  menuOpen: false,

  toggleMenu: () => set((s) => ({menuOpen: !s.menuOpen})),
  openMenu: () => set({menuOpen: true}),
  closeMenu: () => set({menuOpen: false}),
}));
