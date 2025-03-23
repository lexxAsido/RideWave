import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView, Platform } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import * as Location from "expo-location";
import Geocoder from "react-native-geocoding";
import drivers from "../data/drivers";
import { RootStackParamList } from "../Navigation/Stack";

const SCREEN_HEIGHT = Dimensions.get("window").height;

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "DriverDetail">;
  route: RouteProp<RootStackParamList, "DriverDetail">;
};

const DriverDetails: React.FC<Props> = ({ navigation, route }) => {
  const driver = drivers.find((d) => d.id === route.params.driverId);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [userLocationName, setUserLocationName] = useState("Fetching...");
  const [driverLocationName, setDriverLocationName] = useState("Fetching...");

  useEffect(() => {
    
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setUserLocationName("Permission denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });

      
      Geocoder.from(location.coords.latitude, location.coords.longitude)
        .then((json) => {
          const address = json.results[0]?.formatted_address;
          setUserLocationName(address || "Unknown location");
        })
        .catch((error) => console.warn(error));
    })();
  }, []);

  useEffect(() => {
    if (driver) {
     
      Geocoder.from(driver.location.latitude, driver.location.longitude)
        .then((json) => {
          const address = json.results[0]?.formatted_address;
          setDriverLocationName(address || "Unknown location");
        })
        .catch((error) => console.warn(error));
    }
  }, [driver]);

  if (!driver) return <Text style={styles.errorText}>Driver not found</Text>;

  return (
    <View className="flex-1 bg-white">
      <MapView
        style={styles.map}
        provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
        initialRegion={{
          latitude: driver.location.latitude,
          longitude: driver.location.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
       
        <Marker coordinate={driver.location} title={driver.name} description="Driver's Location" />

        
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="Your Location"
            pinColor="blue"
            description="This is your current location"
          />
        )}
      </MapView>

      <ScrollView>
        <View style={styles.card}>
          <Image source={{ uri: driver.image }} style={styles.driverImage} />
          <Text className="text-2xl font-bold mb-3">{driver.name}</Text>
          <Text style={styles.info}>🚗 Car Model: {driver.car}</Text>
          <Text style={styles.info}>⭐ Rating: {driver.rating}</Text>
          <Text style={styles.info}>📍 Driver Location: {driverLocationName}</Text>
          <Text style={styles.info}>📌 Your Location: {userLocationName}</Text>

          <View className="w-full mt-10 flex-row justify-between">
            <TouchableOpacity onPress={() => navigation.goBack()} className="bg-black rounded-lg p-3">
              <Text className="text-yellow-500 font-bold text-center">Go Back</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => alert("Ride Requested 🚗✅")} className="bg-yellow-500 rounded-lg p-3">
              <Text className="text-center font-extrabold">Request Ride</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: { width: "100%", height: SCREEN_HEIGHT * 0.5 },
  card: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  driverImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  info: { fontSize: 16, marginBottom: 5,  },
  errorText: { textAlign: "center", marginTop: 20, fontSize: 18, color: "red" },
});

export default DriverDetails;
