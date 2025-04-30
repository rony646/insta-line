export type RootTabParamList = {
  Home: {
    inputText: string;
    caption: string;
    images: string[];
  };
  HistoryTab: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
};
export type HistoryStackParamList = {
  History: undefined;
  SavedCaption: undefined;
};
