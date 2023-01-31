import { registerRootComponent } from 'expo'
import React from 'react';
import { StyleSheet, View } from 'react-native';
import {GameContainer} from "./containers/GameContainer";

export default function App() {
  return (
      <React.StrictMode>
        <View style={styles.container}>
          <GameContainer />
        </View>
      </React.StrictMode>
  );
}

const styles = StyleSheet.create({
  container: {
      width: "100%",
      height: "100%",
    backgroundColor: '#900DFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

registerRootComponent(App);
