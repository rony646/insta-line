import AsyncStorage from "@react-native-async-storage/async-storage";

export type Caption = {
  key: string;
  title: string;
  images: string[];
  captionText: string;
  description: string;
};

export const saveCaption = async (
  title: string,
  images: string[],
  captionText?: string,
  description?: string
) => {
  try {
    const data = {
      description: description || "",
      captionText: captionText || "",
      images: images,
    };
    await AsyncStorage.setItem(title, JSON.stringify(data));
  } catch (error) {
    console.error("Erro ao salvar:", error);
  }
};

export const deleteCaption = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error while trying to delete item", error);
  }
};

export const getAllCaptions = async (): Promise<Caption[]> => {
  const keys = await AsyncStorage.getAllKeys();

  const values = await AsyncStorage.multiGet(keys);

  const dataList = values.map(([key, value]) => {
    const data = JSON.parse(value as string);

    const caption: Caption = {
      key: key,
      title: new Date(key).toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "short",
      }),
      images: data.images,
      description: data.description,
      captionText: data.captionText || "",
    };

    return caption;
  });

  return dataList;
};
