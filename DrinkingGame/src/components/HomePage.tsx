import React, { useState } from 'react'
import {Button, Pressable, StyleSheet, Text, View} from 'react-native';

type Props = {
    setRenderGame: React.Dispatch<React.SetStateAction<boolean>>;
    setInGameNames: React.Dispatch<React.SetStateAction<string[]>>;
  };

export default function HomePage({ setRenderGame, setInGameNames }: Props) {

    const [players, setPlayers] = useState(1);
    const [playerNames, setPlayerNames] = useState<string[]>([]);

    // Updates players to list of players whenever a name is changed
    const updatePlayerNames = (name: string, i: number) => {
        const arr = [...playerNames];
        arr[i] = name;
        setPlayerNames(arr);
        test();
    }
    // Delete this when finished
    const test = () => {
        console.log(playerNames);
    };

    return (
        <View style={styles.container}>
            <Text>{players}</Text>
            <Pressable style={styles.button} onPress={() => setPlayers((prev) => prev + 1)}>

            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 52,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'blue',

    },
    container: {
        paddingTop: '10%',
        borderColor: 'black',
        borderWidth: 5,
        height: '100%',
        width: '90%',
        paddingHorizontal: 10,

    }
})
