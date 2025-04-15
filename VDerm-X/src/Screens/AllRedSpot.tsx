import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { BASE_URL } from '../config';
import UBottomTabBar from './UBottomTabBar';
import * as Location from 'expo-location';

type RedZone = {
  _id: string;
  latitude: number;
  longitude: number;
  date: string;
};

const AllRedZonesScreen = () => {
  const [redZones, setRedZones] = useState<RedZone[]>([]);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  // ✅ Fetch red zone data
  useEffect(() => {
    const fetchRedZones = async () => {
      try {
        const response = await fetch(`${BASE_URL}/location`);
        if (!response.ok) {
          throw new Error('Failed to fetch red zones');
        }

        const data = await response.json();

        // Optional: log to debug
        console.log('Fetched red zones:', data);

        setRedZones(data);
      } catch (error) {
        console.error('Error fetching red zones:', error);
        Alert.alert('Error', 'Could not load red zone data');
      }
    };

    fetchRedZones();
  }, []);

  // ✅ Get user location
  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Location access is required to show your position');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (err) {
        console.error('Location error:', err);
      }
    };

    getLocation();
  }, []);

  return (
    <View style={styles.container}>
     

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: userLocation?.latitude || 20.5937, // Default center (India)
          longitude: userLocation?.longitude || 78.9629,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
      >
        {/* ✅ Red Zone Markers */}
        {redZones.map((zone, index) => (
          <Marker
            key={zone._id || index}
            coordinate={{
              latitude: Number(zone.latitude),
              longitude: Number(zone.longitude),
            }}
            pinColor="red"
            title={`Red Zone ${index + 1}`}
            description={`Reported on: ${new Date(zone.date).toLocaleString()}`}
          />
        ))}

        {/* ✅ User location marker */}
        {userLocation && (
          <Marker
            coordinate={userLocation}
            pinColor="blue"
            title="You are here"
          />
        )}
      </MapView>

      <UBottomTabBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: -10,
    marginBottom: 10,
    textAlign: 'center',
  },
  map: { flex: 1 },
});

export default AllRedZonesScreen;
