import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    alignItems: "center",
    width: "100%",
  },
  noCaptionsWrapper: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    gap: 10,
  },
  noCaptionsText: {
    color: "#757575",
  },
  card: {
    marginTop: 10,
    width: 390,
    height: 130,
  },
  cardContent: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  carImgWrapper: {
    backgroundColor: "red",
    height: 65,
    width: 65,
    borderRadius: 5,
  },
  carHeader: {
    margin: 5,
  },
});
