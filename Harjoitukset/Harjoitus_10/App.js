import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({ latitude: 60.2014908, longitude: 24.9342881 });
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      console.log('Current location:', location);
      setCoordinates({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setLocation(location);
    })();
  }, []);

  const findLocation = async () => {
    try {
      const response = await fetch(`https://geocode.maps.co/search?q=${encodeURIComponent(address)}&api_key=6743da958a098996089419ivkd79762`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setCoordinates({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
      } else {
        Alert.alert('Location not found');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error fetching location');
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        }}
      >
        <Marker
          coordinate={coordinates}
          title={address}
        />
      </MapView>
      <TextInput
        style={styles.input}
        onChangeText={setAddress}
        value={address}
        placeholder="Enter address"
      />
      <Button title="Show" onPress={findLocation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});