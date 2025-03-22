import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react'
import { ImageBackground, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import * as Animatable from "react-native-animatable";
import { RootStackParamList } from '../Navigation/Stack';


type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const Welcome: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <View className='h-full bg-black relative'>
      <ImageBackground
        source={require("../../assets/ride.png")}
        style={{ width: '100%', height: '90%' }}  // Only the style properties for layout
        resizeMode="cover"  // Separate the resizeMode as a prop
      >
        <View className='mt-36 items-center'>
          <Text className='text-4xl font-extrabold italic'>Welcome To</Text>
          <Text className='text-4xl font-extrabold text-yellow-500'>RideWave</Text>
        </View>
      </ImageBackground>

      <Text className='text-white absolute bottom-24 flex-wrap mx-3 text-center font-semibold text-sm'>
        RideWave - Your journey, your way. Connecting you to the ride you need, whenever you need it.
      </Text>

        <Animatable.View
        animation="pulse" 
        duration={2000} 
        iterationCount="infinite">

      <TouchableOpacity className='items-center mx-5 rounded-lg py-3 mb-10 mt-3 bg-yellow-500'
         onPress={() => navigation.navigate('NearbyDrivers')}>
        <Text className='font-extrabold'>Get Started</Text>
      </TouchableOpacity>
        </Animatable.View>
    </View>
  )
}

export default Welcome
