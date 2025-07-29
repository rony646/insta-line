import { useEffect, useState } from "react";
import { View, FlatList, Image, RefreshControl } from "react-native";

import { Card, Spinner, Text } from "@ui-kitten/components";

import { truncateText } from "@/utils/truncateText";
import { styles } from "./styles";

import { Caption, getAllCaptions, deleteCaption } from "@/utils/asyncStorage";
import { useNavigation } from "@react-navigation/native";
import { HistoryStackParamList } from "@/navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { data } from "./data";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type NavigationProps = NativeStackNavigationProp<HistoryStackParamList>;

export const History = () => {
  const navigation = useNavigation<NavigationProps>();

  const [loading, setLoading] = useState(false);
  const [captions, setCaptions] = useState<Caption[]>([]);

  const getSavedCaptions = async () => {
    setLoading(true);

    const data = await getAllCaptions();
    const orderedData = data.reverse();

    setCaptions(orderedData);
    setLoading(false);
  };

  const removeCaption = async (key: string) => {
    const updatedCaptions = captions.filter((caption) => caption.key !== key);
    setCaptions(updatedCaptions);

    await deleteCaption(key);
  };

  useEffect(() => {
    getSavedCaptions();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View>
          <Spinner size="giant" />
        </View>
      ) : (
        <View style={styles.wrapper}>
          {captions.length ? (
            <FlatList
              data={captions}
              keyExtractor={(item) => item.title.toString()}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={getSavedCaptions}
                />
              }
              renderItem={({ item }) => (
                <Card
                  status="primary"
                  style={styles.card}
                  onPress={() =>
                    navigation.navigate("SavedCaption", {
                      caption: item.captionText,
                      inputText: item.description,
                      images: item.images,
                    })
                  }
                  header={() => (
                    <Text category="h6" style={styles.carHeader}>
                      {item.title}
                    </Text>
                  )}
                >
                  <View style={styles.cardContent}>
                    <View style={styles.carImgWrapper}>
                      <Image
                        source={{ uri: item.images[0] }}
                        alt="thumbnail image"
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </View>
                    <Text>{truncateText(item.captionText, 35)}</Text>
                  </View>
                </Card>
              )}
            />
          ) : (
            <View style={styles.noCaptionsWrapper}>
              <MaterialIcons name="history" color="#757575" size={50} />
              <Text category="h6" style={styles.noCaptionsText}>
                {data.noCaptions}
              </Text>
            </View>
          )}
          <FlatList
            data={captions}
            keyExtractor={(item) => item.title.toString()}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={getSavedCaptions}
              />
            }
            renderItem={({ item }) => (
              <Card
                status="primary"
                style={styles.card}
                onPress={() =>
                  navigation.navigate("SavedCaption", {
                    caption: item.captionText,
                    inputText: item.description,
                    images: item.images,
                  })
                }
                header={() => (
                  <Text category="h6" style={styles.carHeader}>
                    {item.title}
                  </Text>
                )}
              >
                <View style={styles.cardContent}>
                  <View style={styles.carImgWrapper}>
                    <Image
                      source={{ uri: item.images[0] }}
                      alt="thumbnail image"
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </View>
                  <Text style={{ flex: 1 }}>
                    {truncateText(item.captionText, 35)}
                  </Text>
                  <View>
                    <TouchableOpacity onPress={() => removeCaption(item.key)}>
                      <Ionicons name="trash" size={23} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
            )}
          />
        </View>
      )}
    </View>
  );
};
