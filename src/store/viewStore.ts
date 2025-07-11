import { create } from "zustand";

type ViewType = "preview" | "code";

type ViewStoreType = {
  view: ViewType;
  toggleSidebar: boolean;
  // eslint-disable-next-line no-unused-vars
  updateView: (view: ViewType) => void;
  // eslint-disable-next-line no-unused-vars
  updateToggleSidebar: (toggle: boolean) => void;
};

const useViewStore = create<ViewStoreType>((set) => ({
  view: "preview",
  toggleSidebar: false,
  updateView: (view) => set({ view }),
  updateToggleSidebar: (toggle) => set({ toggleSidebar: toggle }),
}));

export default useViewStore;
