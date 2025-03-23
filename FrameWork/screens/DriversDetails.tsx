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
    <View style={styles.container}>
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
          <Text style={styles.driverName}>{driver.name}</Text>
          <Text style={styles.info}>🚗 Car Model: {driver.car}</Text>
          <Text style={styles.info}>⭐ Rating: {driver.rating}</Text>
          <Text style={styles.info}>📍 Driver Location: {driverLocationName}</Text>
          <Text style={styles.info}>📌 Your Location: {userLocationName}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Text style={styles.backButtonText}>Go Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert("Ride Requested 🚗✅")} style={styles.requestButton}>
              <Text style={styles.requestButtonText}>Request Ride</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
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
  driverName: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  info: { fontSize: 16, marginBottom: 5 },
  errorText: { textAlign: "center", marginTop: 20, fontSize: 18, color: "red" },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: 20 },
  backButton: { backgroundColor: "black", borderRadius: 8, padding: 12, flex: 1, marginRight: 10, alignItems: "center" },
  backButtonText: { color: "#FACC15", fontWeight: "bold" },
  requestButton: { backgroundColor: "#FACC15", borderRadius: 8, padding: 12, flex: 1, marginLeft: 10, alignItems: "center" },
  requestButtonText: { fontWeight: "bold" },
});

export default DriverDetails;
