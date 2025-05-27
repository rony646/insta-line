export type RootTabParamList = {
  Home: undefined;
  HistoryTab: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
};
export type HistoryStackParamList = {
  History: undefined;
  SavedCaption: {
    inputText: string;
    caption: string;
    images: string[];
  };
};
