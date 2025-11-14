import { create } from 'zustand';

interface IFileState {
  activeFileId: string | null;
}

interface IFileActions {
  setActiveFileId: (fileId: string | null) => void;
  clearActiveFileId: () => void;
}

export const useFileStore = create<IFileState & IFileActions>((set) => ({
  activeFileId: null,

  setActiveFileId: (fileId) => set({ activeFileId: fileId }),
  clearActiveFileId: () => set({ activeFileId: null }),
}));
