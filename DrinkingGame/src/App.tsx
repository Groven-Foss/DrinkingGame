import { registerRootComponent } from 'expo'
import { StrictMode } from 'react';
import { StyleSheet, Text, View, useWindowDimensions, SafeAreaView } from 'react-native';
import React, {useState, useEffect} from 'react';
import HomePage from './components/HomePage';

export default function App() {
  // scale: The pixel ratio of the device your app is running on.
  // height: The height in pixels of the window or screen your app occupies.
  // width: The width in pixels of the window or screen your app occupies.
  // fontscale: The scale of the font currently used. Some operating systems allow users to scale their font sizes larger or smaller for reading comfort.
  // This property will let you know what is in effect.
  // const {height, width, scale, fontScale} = useWindowDimensions();


 // renders BoardContainer when player clicks start game button
 const [renderGame, setRenderGame] = useState(false)
 // will get names from HomePage into BoardContainer
 const [inGameNames, setInGameNames] = useState<string[]>([])

  return (
    <StrictMode>
      <SafeAreaView style={[styles.OutsideSafeViewContainer]}>
        <View style={styles.InsideSafeViewContainer}>
          <HomePage />
        </View>
      </SafeAreaView>

    </StrictMode>
  );
}

const styles = StyleSheet.create({
  OutsideSafeViewContainer: {
    flex: 1,
    backgroundColor: '#900DFF',
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
