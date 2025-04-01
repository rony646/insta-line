import { View, FlatList } from "react-native";

import { Card, Text } from "@ui-kitten/components";

import { truncateText } from "@/utils/truncateText";
import { styles } from "./styles";

const listData = [
  {
    id: 1,
    title: "Caption 1",
    caption: "A vida é feita de momentos simples, mas inesquecíveis. 🌸✨",
  },
  {
    id: 2,
    title: "Caption 2",
    caption: "Deixe sua luz brilhar onde quer que você vá. 🌟💫",
  },
  {
    id: 3,
    title: "Caption 3",
    caption: "Colecionando memórias, não coisas. 📸❤️",
  },
  {
    id: 4,
    title: "Caption 4",
    caption: "A felicidade está nas pequenas coisas. 🌈🌻",
  },
  {
    id: 5,
    title: "Caption 5",
    caption:
      "Seja a energia positiva que você quer atrair. ✨💪, Seja a energia positiva que você quer atrair. ✨💪, Seja a energia positiva que você quer atrair. ✨💪, Seja a energia positiva que você quer atrair. ✨💪",
  },
];

export const History = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <FlatList
          data={listData}
          keyExtractor={(item) => item.id.toString()}
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
                  <Text>Img 2</Text>
                </View>
                <Text>{truncateText(item.caption, 35)}</Text>
              </View>
            </Card>
          )}
        />
      </View>
    </View>
  );
};
