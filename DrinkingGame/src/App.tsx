import { registerRootComponent } from 'expo'
import { StrictMode } from 'react';
import { StyleSheet, Text, View, useWindowDimensions, SafeAreaView, Animated, TouchableWithoutFeedback } from 'react-native';
import React, {useState, useEffect} from 'react';
import HomePage from './components/HomePage';

export default function App() {
  // scale: The pixel ratio of the device your app is running on.
  // height: The height in pixels of the window or screen your app occupies.
  // width: The width in pixels of the window or screen your app occupies.
  // fontscale: The scale of the font currently used. Some operating systems allow users to scale their font sizes larger or smaller for reading comfort.
  // This property will let you know what is in effect.
  // const {height, width, scale, fontScale} = useWindowDimensions();
  

  return (
    <StrictMode>
      <View>
        <HomePage />
      </View>
    </StrictMode>
  );
}

const styles = StyleSheet.create({

 
});

registerRootComponent(App);
