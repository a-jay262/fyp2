import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BASE_URL } from '../config';
import axios from 'axios';

const VetAppointmentScreen = ({ navigation, route }: { navigation: any; route: any }) => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const vetEmail = route.params.email;

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      console.log(vetEmail);
      const res = await fetch(
        `${BASE_URL}/appointments/vet?vetEmail=${encodeURIComponent(vetEmail)}`
      );
      const data = await res.json();
      console.log('Fetched appointments:', data);
      setAppointments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    } finally {
      setLoading(false);
    }
  };



  const renderAppointment = ({ item }: { item: any }) => {
    const timeDate = new Date(item.timeAndDate);
  

    return (
      <View style={styles.card}>
        <Text style={styles.status}>Appointment Booked</Text>
        <Text style={styles.details}>Name: {item.name}</Text>
        <Text style={styles.details}>Date: {timeDate.toLocaleDateString()}</Text>
        <Text style={styles.details}>
          Time: {timeDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>

        {/* Accept and Reject buttons */}
        <View style={styles.buttonContainer}>


          <TouchableOpacity
            style={[styles.messageButton, { backgroundColor: '#f46c63' }]}
            disabled={buttonDisabled}
          >
            <Text style={styles.messageButtonText}>Booked Appointment</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back-outline" size={24} color="#000" />
        <Image source={require('../Assets/logo.png')} style={styles.logo} />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity style={styles.activeTab}>
          <Text style={styles.tabText}>Appointments</Text>
        </TouchableOpacity>
      </View>

      {/* Appointment List */}
      {loading ? (
        <ActivityIndicator size="large" color="#1abc9c" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={appointments}
          renderItem={renderAppointment}
          keyExtractor={(item, index) => (item._id ? item._id.toString() : index.toString())}
          contentContainerStyle={styles.list}
        />
      )}

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('VetHome')}>
          <Ionicons name="chatbubble-outline" size={24} color="#000" />
          <Text style={styles.navText}>Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('VetHome')}>
          <Ionicons name="calendar-outline" size={24} color="#000" />
          <Text style={styles.navText}>My Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="alert-circle-outline" size={24} color="#000" />
          <Text style={styles.navText}>Red Zones</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    elevation: 5,
  },
  logo: {
    width: 100,
    marginTop: 40,
    marginRight: 120,
    height: 40,
    resizeMode: 'contain',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#1abc9c',
    paddingBottom: 5,
  },
  inactiveTab: { paddingBottom: 5 },
  tabText: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  list: { paddingHorizontal: 16, paddingBottom: 16 },
  card: {
    backgroundColor: '#d8f3f5',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  status: { fontSize: 16, fontWeight: 'bold', color: '#000', marginBottom: 5 },
  details: { fontSize: 14, color: '#000', marginBottom: 5 },
  messageButton: {
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginVertical: 5,
  },
  messageButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#f5f5f5',
  },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 12, marginTop: 4, color: '#000' },
});

export default VetAppointmentScreen;
