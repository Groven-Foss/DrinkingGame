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
  
  const [animation, setAnimation] = useState(new Animated.Value(0))

  // useEffect(() => {
  //   handleAnimation
  // });
  const boxInterpolation =  animation.interpolate({
    inputRange: [0, 1],
    outputRange:["rgb(168,54,235)" , "rgb(60,9,227)"]
  })
  const animatedStyle = {
    backgroundColor: boxInterpolation
  }
  
  function cycleAnimation() {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 5000,
        delay: 1000,
        useNativeDriver: false
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 5000,
        useNativeDriver: false
      })
    ]).start(event => {
      if (event.finished) {
        cycleAnimation();
      }
    });
  }
  cycleAnimation();

  

  return (
    <StrictMode>
      <Animated.View style={{...styles.box, ...animatedStyle}}>

      <SafeAreaView>

        <View style={styles.InsideSafeViewContainer}>
          <HomePage />
        </View>
      </SafeAreaView>
    </Animated.View>
    </StrictMode>
  );
}

const styles = StyleSheet.create({

  box:{
    width: '100%',
    height: '100%',
    backgroundColor: '#5AD2F4'
  },
  InsideSafeViewContainer: {
    borderColor: 'green',
    borderWidth: 5,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }

});

registerRootComponent(App);
