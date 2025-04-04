import { View, FlatList, Image, RefreshControl } from "react-native";

import { Card, Spinner, Text } from "@ui-kitten/components";

import { truncateText } from "@/utils/truncateText";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { Caption, getAllCaptions } from "@/utils/asyncStorage";

export const History = () => {
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
        </View>
      )}
    </View>
  );
};
