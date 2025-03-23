import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions, Image, ActivityIndicator, Alert, Platform } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Geocoder from "react-native-geocoding";
import * as Location from "expo-location"; 
import drivers from "../data/drivers";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Navigation/Stack";

const SCREEN_HEIGHT = Dimensions.get("window").height;

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "NearbyDrivers">;
};

const NearbyDrivers: React.FC<Props> = ({ navigation }) => {
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locations, setLocations] = useState<{ [key: string]: string }>({}); 
  const [loading, setLoading] = useState(true);

  const fetchUserLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Please enable location permissions in settings.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.error("Error getting user location:", error);
    }
  };

  const fetchLocationName = async (driverId: string, latitude: number, longitude: number) => {
    try {
      const response = await Geocoder.from(latitude, longitude);
      const address = response.results[0]?.formatted_address || "Unknown Location";
      setLocations((prev) => ({ ...prev, [driverId]: address }));
    } catch (error) {
      console.error("Error fetching location name:", error);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchUserLocation(); 
      drivers.forEach((driver) => {
        fetchLocationName(driver.id, driver.location.latitude, driver.location.longitude);
      });
      setLoading(false);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="black" style={styles.loader} />
      ) : (
        <>
          <MapView
            style={styles.map}
            provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined} 
            initialRegion={{
              latitude: userLocation?.latitude || 6.5244,
              longitude: userLocation?.longitude || 3.3792,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            {userLocation && (
              <Marker
                coordinate={userLocation}
                title="Your Location"
                pinColor="blue"
              />
            )}

            {drivers.map((driver) => (
              <Marker
                key={driver.id}
                coordinate={driver.location}
                title={driver.name}
                description={driver.car}
              />
            ))}
          </MapView>

          <FlatList
            data={drivers}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.driverCard}
                onPress={() => navigation.navigate("DriverDetail", { driverId: item.id })}
              >
                <Image source={{ uri: item.image }} style={styles.driverImage} />
                <View style={styles.driverInfo}>
                  <Text style={styles.driverName}>{item.name}</Text>
                  <Text style={styles.carModel}>Car Model: {item.car}</Text>
                  <Text style={styles.locationName}>
                    📍 {locations[item.id] || <ActivityIndicator size="small" color="black" />}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  loader: { flex: 1 },
  map: { width: "100%", height: SCREEN_HEIGHT * 0.65 }, 
  listContainer: { padding: 14 },
  driverCard: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  driverImage: { width: 70, height: 70, borderRadius: 35, marginRight: 10 },
  driverInfo: { flex: 1 },
  driverName: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  carModel: { fontSize: 16, color: "gray" },
  locationName: { fontSize: 14, color: "#555", marginTop: 4 },
});

export default NearbyDrivers;
