import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from "react-native";
import VBottomTabBar from "./VBottomTabBar";

const VetAppointmentScreen = () => {
  const [appointments, setAppointments] = useState([
    {
      id: "1",
      OwnerName: "Bella",
      appointmentTime: "2025-04-26 10:00 AM",
      contact: "john@example.com",
    },
    {
      id: "2",
      OwnerName: "Max",
      appointmentTime: "2025-04-26 11:00 AM",
      contact: "jane@example.com",
    },
    // Add more appointments as needed
  ]);

  const handleCancelAppointment = (id: string) => {
    Alert.alert("Appointment Cancelled", "The appointment has been cancelled.");
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
  };

  const handleCompleteAppointment = (id: string) => {
    Alert.alert("Appointment Completed", "The appointment has been marked as completed.");
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
  };

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
        {appointments.map((appointment) => (
          <View key={appointment.id} style={styles.card}>
            <Text style={styles.cardTitle}>Owner Name: {appointment.OwnerName}</Text>
            <Text style={styles.cardText}>Time: {appointment.appointmentTime}</Text>
            <Text style={styles.cardText}>Contact: {appointment.contact}</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => handleCancelAppointment(appointment.id)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.completeButton]}
                onPress={() => handleCompleteAppointment(appointment.id)}
              >
                <Text style={styles.buttonText}>Complete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
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
    justifyContent: "center",
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
    width: 140,
    height: 60,
    resizeMode: "contain",
  },
  appointmentList: {
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15, // Reduced padding
    borderRadius: 8, // Slightly smaller border radius for a tighter look
    marginBottom: 12, // Reduced margin between cards
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4, // Smaller shadow radius
    elevation: 2, // Lower elevation for a more subtle shadow
  },
  cardTitle: {
    fontSize: 16, // Reduced font size
    fontWeight: "bold",
    marginBottom: 8, // Reduced spacing
  },
  cardText: {
    fontSize: 12, // Smaller font size for compactness
    color: "#444",
    marginBottom: 4, // Reduced spacing
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12, // Reduced space above buttons
  },
  button: {
    paddingVertical: 8, // Reduced padding
    paddingHorizontal: 18, // Reduced padding
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#D93B3B",
  },
  completeButton: {
    backgroundColor: "#259D8A",
  },
  buttonText: {
    color: "#fff",
    fontSize: 12, // Smaller font size for buttons
    fontWeight: "bold",
  },
});

export default VetAppointmentScreen;