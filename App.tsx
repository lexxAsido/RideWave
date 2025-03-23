import { StatusBar } from 'expo-status-bar'; 
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import "./global.css"
import { StackNavigation } from './FrameWork/Navigation/Stack';
import Geocoder from "react-native-geocoding";
import { GOOGLE_MAPS_API_KEY } from "@env";

Geocoder.init(GOOGLE_MAPS_API_KEY); 

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <StackNavigation/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
