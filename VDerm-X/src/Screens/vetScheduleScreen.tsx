import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Import Picker for the dropdown
import VBottomTabBar from "./VBottomTabBar";


interface Slot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
}

const VetSlotScreen = () => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedDay, setSelectedDay] = useState("Monday"); // State for selected day
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const resetForm = () => {
    setStartTime("");
    setEndTime("");
    setEditingId(null);
    setShowForm(false);
  };

  const handleAddOrUpdateSlot = () => {
    if (!selectedDay || !startTime || !endTime) {
      Alert.alert("Missing Info", "Please fill in all fields.");
      return;
    }

    if (editingId) {
      setSlots((prev) =>
        prev.map((slot) =>
          slot.id === editingId
            ? { ...slot, date: selectedDay, startTime, endTime }
            : slot
        )
      );
    } else {
      const newSlot: Slot = {
        id: Date.now().toString(),
        date: selectedDay,
        startTime,
        endTime,
      };
      setSlots((prev) => [...prev, newSlot]);
    }

    resetForm();
  };

  const handleEditSlot = (slot: Slot) => {
    setSelectedDay(slot.date);
    setStartTime(slot.startTime);
    setEndTime(slot.endTime);
    setEditingId(slot.id);
    setShowForm(true);
  };

  const handleDeleteSlot = (id: string) => {
    setSlots((prev) => prev.filter((slot) => slot.id !== id));
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
      <Text style={styles.heading}>My Available Slots</Text>

      {!showForm && (
        <TouchableOpacity
          style={[styles.button, styles.addButton]}
          onPress={() => setShowForm(true)}
        >
          <Text style={styles.buttonText}>+ Add Slot</Text>
        </TouchableOpacity>
      )}

      {showForm && (
        <View style={styles.formCard}>
          {/* Day Selection Dropdown */}
          <Picker
            selectedValue={selectedDay}
            onValueChange={(itemValue) => setSelectedDay(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            <Picker.Item label="Wednesday" value="Wednesday" />
            <Picker.Item label="Thursday" value="Thursday" />
            <Picker.Item label="Friday" value="Friday" />
            <Picker.Item label="Saturday" value="Saturday" />
            <Picker.Item label="Sunday" value="Sunday" />
          </Picker>

          <TextInput
            style={styles.input}
            placeholder="Start Time (e.g. 10:00 AM)"
            value={startTime}
            onChangeText={setStartTime}
          />
          <TextInput
            style={styles.input}
            placeholder="End Time (e.g. 11:00 AM)"
            value={endTime}
            onChangeText={setEndTime}
          />

          <View style={styles.formButtons}>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleAddOrUpdateSlot}
            >
              <Text style={styles.buttonText}>
                {editingId ? "Update" : "Save"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={resetForm}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.slotList}>
        {slots.map((slot) => (
          <View key={slot.id} style={styles.card}>
            <Text style={styles.cardText}>📅 {slot.date}</Text>
            <Text style={styles.cardText}>
              🕑 {slot.startTime} - {slot.endTime}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.editButton]}
                onPress={() => handleEditSlot(slot)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => handleDeleteSlot(slot.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
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
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#259D8A",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  picker: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#259D8A",
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: "#D93B3B",
    flex: 1,
  },
  editButton: {
    backgroundColor: "#FFA500",
    flex: 1,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#D93B3B",
    flex: 1,
  },
  formButtons: {
    flexDirection: "row",
    marginTop: 10,
  },
  formCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  slotList: {
    paddingBottom: 100,
  },
});

export default VetSlotScreen;
