import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import {GameContainer} from "../containers/GameContainer";
import { generateAnnouncementList } from "./CommonMethods";
import {AnnouncementProps} from "../types/types";

export default function HomePage() {

    const [players, setPlayers] = useState(1);
    const [playerNames, setPlayerNames] = useState<string[]>([]);
    const [renderGame, setRenderGame] = useState(false)

    // Updates players to list of players whenever a name is changed
    const updatePlayerNames = (name: string, i: number) => {
        const arr = [...playerNames];
        arr[i] = name;
        setPlayerNames(arr);
    }

    // Can be used for testing. Randomly generates a list of Announcements
    const generateListTestMethod = () => {
        let testList: AnnouncementProps[] = generateAnnouncementList(20);
        console.log("--- GENERATED LIST --- ");
        testList.forEach(a => console.log(a.text));
        console.log("List size: " + testList.length);
    }

    const displayNames = () => {
        const realNames: string[] = [];
        const regExp = /[a-zA-Z]/g;

        // makes sure only names that contain letters and is defined go through
        playerNames.forEach((playerName) => {
            if (playerName !== undefined && regExp.test(playerName)) {
                realNames.push(playerName);
            }
        });
        console.log(realNames)
        // only let the game start if there are two valid
        if (players >= 2 && realNames.length == 2) {
            setRenderGame(true)
        }
    }
    return (
        <View style={styles.container}>
            {renderGame ? <GameContainer /> : <View style={styles.addPlayersContainer}>
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
                            <TextInput key={i} style={styles.nameInput} onChangeText={(Text) => updatePlayerNames(Text, i)} />
                        );
                    })}

                    <Pressable style={styles.addPlayerButton} onPress={() => setPlayers((prev) => prev + 1)}>
                        <Text style={styles.buttonText}>Legg til spiller...</Text>
                    </Pressable>
                </View>
                <Pressable style={styles.startGameButton} onPress={() => displayNames()}>
                    <Text style={styles.buttonText}>Start drikkinga!</Text>
                </Pressable>
                <Pressable style={styles.startGameButton} onPress={() => setPlayers(1)}>
                    <Text style={styles.buttonText}>reset fuck</Text>
                </Pressable>

            </View>}
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
        height: '100%',
        width: '100%',
        borderColor: 'yellow',
        borderWidth: 5,
    },

    addPlayersContainer: {
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
