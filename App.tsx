import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import "./global.css"
import { StackNavigation } from './FrameWork/Navigation/Stack';
import Geocoder from "react-native-geocoding";



Geocoder.init("AIzaSyC8QH1e5GXogWWGLNt_ow5oQBG0M8Do96o"); 


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
