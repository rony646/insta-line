export type RootTabParamList = {
  Home: undefined;
  HistoryTab: undefined;
};

export type HomeStackParamList = {
  Login: undefined;
  HomeMain: undefined;
};
export type HistoryStackParamList = {
  History: undefined;
  SavedCaption: {
    inputText: string;
    caption: string;
    images: string[];
  };
};
