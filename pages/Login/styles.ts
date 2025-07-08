import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e8e7e7",
    padding: 15,
    gap: 30,
  },
  tab: {
    flexDirection: "row",
    width: "100%",
    borderBottomColor: "blue",
    borderBottomWidth: 2,
  },
  tabButton: {
    width: "50%",
  },
  logoWrapper: {
    width: 200,
    height: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 300,
  },
  buttonContainer: {
    display: "flex",
    gap: 15,
  },
  buttonWrapper: {
    borderRadius: 5,
    overflow: "hidden",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#a1c7fa2a",
    borderColor: "#175ab1",
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    gap: 8,
  },
});
