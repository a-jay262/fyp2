import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import UBottomTabBar from './UBottomTabBar';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { BASE_URL } from '../config';

type RedZoneRouteProp = RouteProp<RootStackParamList, 'RedZone'>;

const RedZoneScreen = () => {
  const route = useRoute<RedZoneRouteProp>();
  const { latitude, longitude } = route.params;

  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    // Fetch user's location
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };

    getLocation();
  }, []);

  useEffect(() => {
    // Send the passed lat/lng to backend
    const saveRedZone = async () => {
      try {
        await axios.post(`${BASE_URL}/location`,{
          latitude,
          longitude,
          date: new Date().toISOString(),
        });
        console.log('Red zone saved successfully');
      } catch (error) {
        console.error('Failed to save red zone', error);
        Alert.alert('Error', 'Failed to save red zone');
      }
    };

    saveRedZone();
  }, [latitude, longitude]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Red Zones</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* 🔴 Red marker for selected location */}
        <Marker
          coordinate={{ latitude, longitude }}
          pinColor="red"
          title="Reported Red Zone"
        />

        {/* 🔵 User location marker (if available) */}
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="You are here"
            pinColor="blue"
          />
        )}

        {/* Example other red zones */}
        <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} title="Red Zone 1" />
        <Marker coordinate={{ latitude: 37.78925, longitude: -122.4334 }} title="Red Zone 2" />
      </MapView>

      <UBottomTabBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50,
    textAlign: 'center',
  },
  map: { flex: 1 },
});

export default RedZoneScreen;
