import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App"; // Adjust according to your routing setup

const VBottomTabBar = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();

  // Function to return the color for active/inactive tabs
  const getTabColor = (tab: string) => {
    return route.name === tab ? "green" : "#A5A5A5"; // Green for active, grey for inactive
  };

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("VetAppointment")} // Navigate to VetAppointment screen
      >
        <Ionicons
          name="calendar"
          size={26}
          color={getTabColor("VetAppointment")} // Dynamic color for VetAppointment tab
        />
        <Text
          style={route.name === "VetAppointment" ? styles.activeNav : styles.navTextInactive}
        >
          Appointments
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("AppointmentHistory")} // Navigate to VetHistory screen
      >
        <MaterialIcons
          name="history"
          size={29}
          color={getTabColor("AppointmentHistory")} // Dynamic color for VetHistory tab
        />
        <Text
          style={route.name === "AppointmentHistory" ? styles.activeNav : styles.navTextInactive}
        >
          Appointment History
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("VetSchedule")} // Navigate to VetRedZone screen
      >
        <Ionicons
          name="time"
          size={26}
          color={getTabColor("VetSchedule")} // Dynamic color for VetRedZone tab
        />
        <Text
          style={route.name === "VetSchedule" ? styles.activeNav : styles.navTextInactive}
        >
          Schedule
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    bottomNav: {
        position: "absolute", // To stick to the bottom
        left: 0,
        right: 0,
        bottom: 0, // Stick to the bottom of the screen
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: 15,
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

export default VBottomTabBar;
