import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ImageBackground, SafeAreaView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import * as Animatable from "react-native-animatable";
import { RootStackParamList } from '../Navigation/Stack';

type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const Welcome: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/ride.png")}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome To</Text>
          <Text style={styles.subtitle}>RideWave</Text>
        </View>
      </ImageBackground>

      <Text style={styles.description}>
        RideWave - Your journey, your way. Connecting you to the ride you need, whenever you need it.
      </Text>

      <Animatable.View animation="pulse" duration={2000} iterationCount="infinite">
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NearbyDrivers')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    position: "relative",
  },
  imageBackground: {
    width: "100%",
    height: "90%",
  },
  titleContainer: {
    marginTop: 140, 
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    fontStyle: "italic",
    color: "white",
  },
  subtitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FACC15", 
  },
  description: {
    color: "white",
    position: "absolute",
    bottom: 96, 
    textAlign: "center",
    fontWeight: "600",
    fontSize: 14,
    marginHorizontal: 12,
  },
  button: {
    alignItems: "center",
    marginHorizontal: 20,
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 40,
    marginTop: 12,
    backgroundColor: "#FACC15",
  },
  buttonText: {
    fontWeight: "800",
  },
});

export default Welcome;
