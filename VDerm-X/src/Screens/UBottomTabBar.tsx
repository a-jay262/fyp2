import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";

const UBottomTabBar = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();

  const getTabColor = (tab: string) => {
    return route.name === tab ? "green" : "#A5A5A5"; // Green for active, grey for inactive
  };

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons
          name="chatbubble-ellipses-outline"
          size={28}
          color={getTabColor("Home")}
        />
        <Text style={route.name === "Home" ? styles.activeNav : styles.navTextInactive}>
          Chats
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Vets")}
      >
        <MaterialIcons
          name="pets"
          size={28}
          color={getTabColor("Vets")}
        />
        <Text style={route.name === "Vets" ? styles.activeNav : styles.navTextInactive}>
          Vets
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Diagnosis")}
      >
        <MaterialIcons
          name="camera"
          size={28}
          color={getTabColor("Diagnosis")}
        />
        <Text style={route.name === "Diagnosis" ? styles.activeNav : styles.navTextInactive}>
          Diagnosis
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("AllRedZones")}
      >
        <Ionicons
          name="alert-circle-outline"
          size={24}
          color={getTabColor("AllRedZones")}
        />
        <Text style={route.name === "AllRedZones" ? styles.activeNav : styles.navTextInactive}>
          RedZone
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  navItem: {
    alignItems: "center",
  },
  activeNav: {
    color: "green", // Green color for active tab
    fontWeight: "bold",
  },
  navTextInactive: {
    color: "#A5A5A5", // Grey color for inactive tabs
  },
});

export default UBottomTabBar;
