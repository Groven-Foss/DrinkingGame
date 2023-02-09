import { registerRootComponent } from 'expo'
import { StrictMode } from 'react';
import { StyleSheet, Text, View, useWindowDimensions, SafeAreaView, Animated, TouchableWithoutFeedback, Image } from 'react-native';
import React, {useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import IntroToApp from './components/IntroToApp';

export default function App() {

  const [renderHomePage, setRenderHomePage] = useState(false)

  setTimeout(() => {
    setRenderHomePage(true)
  }, 20000)
  

  return (
    <StrictMode>
      <View style={styles.appContainer}>
        {renderHomePage ? <HomePage /> : <IntroToApp />}
        
      </View>
    </StrictMode>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    width: '100%',
    height: '100%'
  }
 
});

registerRootComponent(App);
