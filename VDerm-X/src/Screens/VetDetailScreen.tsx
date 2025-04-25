/*
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal, TextInput, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BASE_URL } from "../config";

const VetDetailScreen = ({ route, navigation }: { route: any; navigation: any }) => {
  const { vet } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [appointmentBooked, setAppointmentBooked] = useState(false); // track booking status

  const handleConfirm = async () => {
    if (!name || !email || !email.includes("@")) {
      Alert.alert("Error", "Please enter a valid name and email address");
      return;
    }

    const message = `User ${name} (${email}) has booked the Appointment`;

    try {
      const response = await fetch(`${BASE_URL}/vets/send-notification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Your appointment has been booked!");
        setAppointmentBooked(true); // mark as booked
        setModalVisible(false);
        setName("");
        setEmail("");
      } else {
        Alert.alert("Error", data.message || "Failed to book appointment.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
     
      <Image source={{ uri: `${BASE_URL}${vet.imageUrl}` }} style={styles.vetImage} />

      
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <ScrollView style={styles.detailsContainer}>
        <Text style={styles.vetName}>{vet.name}</Text>
        <Text style={styles.vetQualification}>{vet.qualification}</Text>
        <Text style={styles.vetArea}>📍 {vet.area}</Text>

       
        {appointmentBooked && (
          <>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>📧 Email:</Text>
              <Text style={styles.infoText}>{vet.email}</Text>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>📞 Contact:</Text>
              <Text style={styles.infoText}>{vet.contact}</Text>
            </View>
          </>
        )}

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>⏳ Availability:</Text>
          <Text style={styles.infoText}>{vet.availability}</Text>
        </View>
      </ScrollView>

     
      <TouchableOpacity
        style={[styles.bookButton, appointmentBooked && { backgroundColor: "#ccc" }]}
        onPress={() => !appointmentBooked && setModalVisible(true)}
        disabled={appointmentBooked}
      >
        <Text style={styles.bookButtonText}>
          {appointmentBooked ? "Appointment Booked" : "Book Appointment"}
        </Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter your Email to Confirm</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <Text style={styles.modalTitle}>Enter your Name to Confirm</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your Name"
              value={name}
              onChangeText={setName}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleConfirm}>
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },
  vetImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
    marginTop:40
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 50,
  },
  detailsContainer: {
    padding: 20,
  },
  vetName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  vetQualification: {
    fontSize: 18,
    color: "#555",
    marginBottom: 10,
  },
  vetArea: {
    fontSize: 16,
    color: "#777",
    marginBottom: 15,
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoLabel: {
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 5,
  },
  infoText: {
    fontSize: 14,
    color: "#444",
  },
  bookButton: {
    backgroundColor: "#259D8A",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    margin: 20,
  },
  bookButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    padding: 10,
    backgroundColor: "#259D8A",
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "#FF3B30",
  },
});

export default VetDetailScreen;
*/


// VetDetailScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BASE_URL } from "../config";

const VetDetailScreen = ({ route, navigation }: { route: any; navigation: any }) => {
  const { vet } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [step, setStep] = useState<"selectDay" | "selectSlot" | "form">("selectDay");
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [appointmentBooked, setAppointmentBooked] = useState(false);

  const bookedSlots: Record<string, string[]> = {
    Tuesday: ["9:00 AM - 10:00 AM"],  // One slot booked
    Friday: ["9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM"],  // Both slots booked
  };

  const availability: Record<string, string[]> = {
    Monday: ["9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM"],
    Tuesday: ["9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM"],
    Thursday: ["9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM"],
    Friday: ["9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM"],
    Saturday: ["9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM"],
  };

  const handleDaySelect = (day: string) => {
    setSelectedDay(day);
    setStep("selectSlot");
  };

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
    setStep("form");
  };

  const handleBack = () => {
    if (step === "form") {
      setStep("selectSlot");
    } else if (step === "selectSlot") {
      setStep("selectDay");
    }
  };

  const handleConfirm = async () => {
    if (!name || !email.includes("@") || !selectedDay || !selectedSlot) {
      Alert.alert("Error", "Please fill out all fields and choose a slot");
      return;
    }

    const message = `User ${name} (${email}) booked an appointment on ${selectedDay} at ${selectedSlot}`;

    try {
      const response = await fetch(`${BASE_URL}/vets/book-appointment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          day: selectedDay,
          slot: selectedSlot,
          vetId: vet._id,
          message,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Your appointment has been booked!");
        setAppointmentBooked(true);
        setModalVisible(false);
        setName("");
        setEmail("");
        setSelectedDay("");
        setSelectedSlot("");
        setStep("selectDay");
      } else {
        Alert.alert("Error", data.message || "Failed to book appointment");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  const handleCloseModal = () => {
    // Reset all fields when closing the modal
    setName("");
    setEmail("");
    setSelectedDay("");
    setSelectedSlot("");
    setStep("selectDay");
    setModalVisible(false);
  };

  const isSlotBooked = (day: string, slot: string) => {
    return bookedSlots[day]?.includes(slot);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: `${BASE_URL}${vet.imageUrl}` }} style={styles.vetImage} />

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <ScrollView style={styles.detailsContainer}>
        <Text style={styles.vetName}>{vet.name}</Text>
        <Text style={styles.vetQualification}>{vet.qualification}</Text>
        <Text style={styles.vetArea}>📍 {vet.area}</Text>

        {appointmentBooked && (
          <>
            <Text style={styles.infoLabel}>📧 Email: <Text style={styles.infoText}>{vet.email}</Text></Text>
            <Text style={styles.infoLabel}>📞 Contact: <Text style={styles.infoText}>{vet.contact}</Text></Text>
          </>
        )}

        <Text style={styles.infoLabel}>⏳ Availability:</Text>
        {Object.keys(availability).map((day) => (
          <View key={day} style={{ marginBottom: 5 }}>
            <Text style={styles.infoText}>{day}:</Text>
            {availability[day].map((slot, index) => (
              <Text
                key={index}
                style={[
                  styles.infoText,
                  isSlotBooked(day, slot) && { textDecorationLine: "line-through", color: "#ccc" },
                ]}
              >
                {slot}
              </Text>
            ))}
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={[styles.bookButton, appointmentBooked && { backgroundColor: "#ccc" }]}
        onPress={() => !appointmentBooked && setModalVisible(true)}
        disabled={appointmentBooked}
      >
        <Text style={styles.bookButtonText}>
          {appointmentBooked ? "Appointment Booked" : "Book Appointment"}
        </Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Ionicons name="close-outline" size={30} color="#259D8A" />
            </TouchableOpacity>

            {/* Back Button inside Modal */}
            {step !== "selectDay" && (
              <TouchableOpacity style={styles.backModalButton} onPress={handleBack}>
                <Ionicons name="arrow-back" size={24} color="#259D8A" />
              </TouchableOpacity>
            )}

            {/* Step Content */}
            {step === "selectDay" && (
              <>
                <Text style={styles.modalTitle}>Select a Day</Text>
                {Object.keys(availability).map((day) => (
                  <TouchableOpacity key={day} style={styles.modalButton} onPress={() => handleDaySelect(day)}>
                    <Text style={styles.modalButtonText}>{day}</Text>
                  </TouchableOpacity>
                ))}
              </>
            )}

            {step === "selectSlot" && (
              <>
                <Text style={styles.modalTitle}>Select a Slot on {selectedDay}</Text>
                {availability[selectedDay] &&
                  availability[selectedDay].map((slot, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.modalButton}
                      onPress={() => handleSlotSelect(slot)}
                      disabled={isSlotBooked(selectedDay, slot)}
                    >
                      <Text
                        style={[
                          styles.modalButtonText,
                          isSlotBooked(selectedDay, slot) && { textDecorationLine: "line-through", color: "#ccc" },
                        ]}
                      >
                        {slot}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </>
            )}

            {step === "form" && (
              <>
                <Text style={styles.modalTitle}>Enter Your Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  value={name}
                  onChangeText={setName}
                />
                <Text style={styles.modalTitle}>Enter Your Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={handleCloseModal}>
                    <Text style={styles.modalButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalButton} onPress={handleConfirm}>
                    <Text style={styles.modalButtonText}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F8FA" },
  vetImage: { width: "100%", height: 250, resizeMode: "cover", marginTop: 40 },
  backButton: {
    position: "absolute", top: 40, left: 20, backgroundColor: "rgba(0,0,0,0.5)", padding: 10, borderRadius: 50,
  },
  closeButton: {
    position: "absolute", top: 10, right: 10, padding: 10,
  },
  backModalButton: {
    position: "absolute", top: 10, left: 10, padding: 10,
  },
  detailsContainer: { padding: 20 },
  vetName: { fontSize: 24, fontWeight: "bold", color: "#333", marginBottom: 5 },
  vetQualification: { fontSize: 18, color: "#555", marginBottom: 10 },
  vetArea: { fontSize: 16, color: "#777", marginBottom: 15 },
  infoLabel: { fontWeight: "bold", fontSize: 16, marginBottom: 5 },
  infoText: { fontSize: 14, color: "#444" },
  bookButton: { backgroundColor: "#259D8A", padding: 15, borderRadius: 5, margin: 20 },
  bookButtonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { width: 300, backgroundColor: "#fff", borderRadius: 10, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  modalButton: { backgroundColor: "#259D8A", padding: 10, marginBottom: 10, borderRadius: 5 },
  modalButtonText: { color: "#fff", textAlign: "center" },
  cancelButton: { backgroundColor: "#ccc" },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 10, marginBottom: 10, borderRadius: 5 },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between" },
});

export default VetDetailScreen;
