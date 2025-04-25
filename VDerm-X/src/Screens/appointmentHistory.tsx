import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import VBottomTabBar from "./VBottomTabBar";

const AppointmentHistoryScreen = () => {
  const [appointments, setAppointments] = useState([
    {
      id: "1",
      OwnerName: "Bella",
      appointmentTime: "2025-03-26 10:00 AM",
      contact: "john@example.com",
    },
    {
      id: "2",
      OwnerName: "Max",
      appointmentTime: "2025-04-26 11:00 AM",
      contact: "jane@example.com",
    },
    {
      id: "3",
      OwnerName: "Charlie",
      appointmentTime: "2025-03-18 09:00 AM",
      contact: "luke@example.com",
    },
    {
      id: "4",
      OwnerName: "Sophia",
      appointmentTime: "2025-04-15 02:00 PM",
      contact: "sophia@example.com",
    },
    {
      id: "5",
      OwnerName: "Oliver",
      appointmentTime: "2025-04-20 05:00 PM",
      contact: "oliver@example.com",
    },
    // More sample appointments can be added as needed
  ]);

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        {/* Profile Icon on the left */}
        <View style={styles.profileIcon}>
          <Text style={styles.profileInitial}>J</Text>
        </View>

        {/* Logo at the center */}
        <Image
          source={require("../Assets/logo.png")} // Make sure to update this path
          style={styles.logo}
        />
      </View>

      {/* Appointment List */}
      <ScrollView contentContainerStyle={styles.appointmentList}>
        {appointments.length === 0 ? (
          <Text style={styles.noAppointmentsText}>No appointments available.</Text>
        ) : (
          appointments.map((appointment) => (
            <View key={appointment.id} style={styles.card}>
              <Text style={styles.cardTitle}>Owner Name: {appointment.OwnerName}</Text>
              <Text style={styles.cardText}>Time: {appointment.appointmentTime}</Text>
              <Text style={styles.cardText}>Contact: {appointment.contact}</Text>
            </View>
          ))
        )}
      </ScrollView>

      {/* Bottom Tab Bar */}
      <VBottomTabBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Center the contents horizontally
    paddingTop: 40, // Adjusted padding to move the logo down
    paddingBottom: 20,
    marginBottom: 15,
  },
  profileIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#259D8A",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute", // Position it to the left of the logo
    left: 0,
  },
  profileInitial: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  logo: {
    width: 140, // Increased width for a bigger logo
    height: 60, // Increased height
    resizeMode: "contain",
  },
  appointmentList: {
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: "#444",
    marginBottom: 5,
  },
  noAppointmentsText: {
    fontSize: 18,
    textAlign: "center",
    color: "#888",
  },
});

export default AppointmentHistoryScreen;
