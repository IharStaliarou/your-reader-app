export interface IBookmark {
  id: string;
  fileId: string;
  title: string;
  textFragment: string;
  startChar: number;
  endChar: number;
  createdAt: string;
  color: string;
}

export interface ICreateBookmarkDto {
  fileId: string;
  title: string;
  textFragment: string;
  startChar: number;
  endChar: number;
  color: string;
}

export interface ICreateBookmarkInitialData {
  textFragment: string;
  startChar: number;
  endChar: number;
  color: string;
}

export interface IFragmentData {
  textFragment: string;
  startChar: number;
  endChar: number;
  color: string;
}

export interface IWordSelectionState {
  startTokenIndex: number | null;
  endTokenIndex: number | null;
  isComplete: boolean;
}
