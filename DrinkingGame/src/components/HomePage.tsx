import React, { useState } from 'react'
import {Button, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

// PROPS SOM BRUKES I GAMECONTAINER.TSX
// type Props = {
//     setRenderGame: React.Dispatch<React.SetStateAction<boolean>>;
//     setInGameNames: React.Dispatch<React.SetStateAction<string[]>>;
//   };

export default function HomePage() {

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
            <Text style={styles.numberOfPlayersText}>Antall spillere: {players}</Text>
           
            <View style={styles.nameContainer}>

                <Text style={styles.allPlayersText}>
                    {playerNames.map((playerName) => {
                    if (playerName !== undefined) {

                        if (playerName === playerNames[0]) {
                            return playerName;
                        } else if (playerName === "" && playerName === playerNames[1]) {
                            return playerName;
                        }
                        return ", " + playerName;
                    }   
                    return "";
                })}
                </Text >
                    {[...Array(players).keys()].map((i) => {
                        // i equals id of field
                        return (
                            <TextInput key={i} style={styles.nameInput} onChangeText={(Text) => updatePlayerNames(Text, i)}/>
                        );
                    })}
              
            
            <Pressable style={styles.addPlayerButton} onPress={() => setPlayers((prev) => prev + 1)}>
                <Text style={styles.buttonText}>Legg til spiller...</Text>
            </Pressable>
            </View>
            <Pressable style={styles.startGameButton}>
                <Text style={styles.buttonText}>Start drikkinga!</Text>
            </Pressable>
            <Pressable style={styles.startGameButton} onPress={() => setPlayers(1)}>
                <Text style={styles.buttonText}>reset fuck</Text>
            </Pressable>
            
        </View>
    )
}





const styles = StyleSheet.create({
    nameInputView: {
        borderColor: 'black',
        borderWidth: 3,
        alignItems: 'center'
    },
    allPlayersText: {
        borderColor: 'black',
        borderWidth: 3,
    },
    nameInput: {
        backgroundColor: 'white',
        height: 40,
        margin: 12,
        borderWidth: 5,
        borderColor: 'black',
        padding: 10,
        width: '50%',
        textAlign: 'center'

    },
    nameContainer: {
        flex: 1,
        flexDirection: 'column', 
        justifyContent: 'center',
        width: '100%',
        borderColor: 'blue',
        borderWidth: 5,
        alignItems: 'center'

    },
    buttonText: {
        color: 'white',
        fontSize: 16,

    },
    addPlayerButton: {
        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: 4,
        elevation: 3,
        width: '50%',
        height: '7%',
        backgroundColor: 'teal',

    },
    startGameButton: {
        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: 4,
        elevation: 3,
        width: '50%',
        height: '7%',
        backgroundColor: 'blue',
    },
    container: {
        paddingTop: '10%',
        borderColor: 'black',
        borderWidth: 5,
        height: '100%',
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,

    },
    numberOfPlayersText: {
        borderColor: 'black',
        borderWidth: 3,
        textAlign: 'center',
    },
})
