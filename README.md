# RideWave - A Ride Sharing App

## Overview
This React Native app displays driver details along with their location on a Google Map. The app fetches the user's real-time location and displays it alongside the driver's location. Users can request a ride or navigate back to the previous screen.

## Features
- Displays driver details (name, rating, car model, image, location)
- Fetches and displays user's real-time location on the map
- Reverse geocoding to show readable addresses
- Interactive map with markers for both user and driver
- Request ride functionality

## Prerequisites
Make sure you have the following installed before running the project:
- **Node.js** (v16 or later)
- **Expo CLI** (Install globally using `npm install -g expo-cli`)


## Installation

1. **Clone the repository:**
 
   git clone https://github.com/lexxAsido/RideWave.git
   

2. **Install dependencies:**

   npm install
  

# Running the App

On a Physical Device (Recommended)

Expo Go makes it easy to test your app on a physical device:

Install the Expo Go app on your Android/iOS device.

Start the development server:

npx expo start

Scan the QR code with the Expo Go app to launch the app.


On an Emulator/Simulator (⚠️ Limited Location Features)

Start an Android emulator via Android Studio or an iOS simulator via Xcode.

Run the app:

npx expo start



## Usage
1. Open the app and select a driver.
2. View the driver’s details and location on the map.
3. See your own real-time location displayed on the map.
4. Click "Request Ride" to simulate booking a ride.



⚠️ Important: Location Services

expo-location does not work well on emulators/simulators.

For a better user experience, use a physical device to test real-time location tracking.
