import React from "react";
import NearbyDrivers from "../screens/NearbyDrivers";
import DriverDetails from "../screens/DriversDetails";
import Welcome from "../screens/Welcome";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
  NearbyDrivers: undefined;
  DriverDetail: { driverId: string };
  Welcome: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function StackNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" >
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }}/>
        <Stack.Screen name="DriverDetail" component={DriverDetails} options={{ headerShown: false }}/>
        <Stack.Screen name="NearbyDrivers" component={NearbyDrivers} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
