import { View, FlatList, Image, RefreshControl } from "react-native";

import { Card, Spinner, Text } from "@ui-kitten/components";

import { truncateText } from "@/utils/truncateText";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { Caption, getAllCaptions } from "@/utils/asyncStorage";
import { useNavigation } from "@react-navigation/native";
import { HistoryStackParamList } from "@/navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { data } from "./data";

type NavigationProps = NativeStackNavigationProp<HistoryStackParamList>;

export const History = () => {
  const navigation = useNavigation<NavigationProps>();

  const [loading, setLoading] = useState(false);
  const [captions, setCaptions] = useState<Caption[]>([]);

  const getSavedCaptions = async () => {
    setLoading(true);

    const data = await getAllCaptions();
    setCaptions(data);

    setLoading(false);
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
        </View>
      )}
    </View>
  );
};
