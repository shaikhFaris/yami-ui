import { create } from "zustand";

type ViewType = "preview" | "code";

type ViewStoreType = {
  view: ViewType;
  // eslint-disable-next-line no-unused-vars
  updateView: (view: ViewType) => void;
};

const useViewStore = create<ViewStoreType>((set) => ({
  view: "preview",
  updateView: (view) => set({ view }),
}));

export default useViewStore;
