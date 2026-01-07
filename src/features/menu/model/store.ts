import {create} from "zustand";
import {SharedMenuItems} from "../../../utils/enums";
import {MenuStore} from "./types";

export const useMenuStore = create<MenuStore>((set) => ({
  menuOpen: false,
  selectedMenuItem: SharedMenuItems.SAMPLES,

  toggleMenu: () => set((s) => ({menuOpen: !s.menuOpen})),
  openMenu: () => set({menuOpen: true}),
  closeMenu: () => set({menuOpen: false}),
  setSelectedMenuItem: (item) => set({selectedMenuItem: item}),
}));
