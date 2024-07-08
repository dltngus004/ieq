import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const LocationComponent = ({ onLocationUpdate }) => {
  const [location, setLocation] = useState({ city: '', region: '', stationName: '' });

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = async () => {
    try {
      const response = await axios.get('https://ipinfo.io/json');
      const { city, region, loc } = response.data;
      const [latitude, longitude] = loc.split(',');

      setLocation({ city, region });

      const stationResponse = await axios.get('http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getNearbyMsrstnList', {
        params: {
          serviceKey: 'JnDemC9xS5PAiPZiejb84X3fkK3BjoGnAPaR9A0s+GjLue9LWtO6yheTXkbxnAaEUv5e6YQEHABe8kNDj1xO1g==',
          returnType: 'json',
          tmX: longitude,
          tmY: latitude,
          ver: 1.0,
        }
      });

      if (stationResponse.data.response.body.items.length > 0) {
        const stationName = stationResponse.data.response.body.items[0].stationName;
        setLocation((prevState) => ({ ...prevState, stationName }));
        onLocationUpdate({ city, region, stationName });
      } else {
        throw new Error('No station found');
      }
    } catch (error) {
      if (error.response) {
        console.error('Server responded with status code:', error.response.status);
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
      Alert.alert('Error fetching location or station:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.city}>{location.city} {location.region}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  city: {
    fontSize: 18,
    color: '#000'
  }
});

export default LocationComponent;
