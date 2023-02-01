import React, { useRef, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { GameContainer } from "../containers/GameContainer";
import { Player, PlayerList } from '../types/types';

export default function HomePage() {

    const [players, setPlayers] = useState(1);
    const [playerNames, setPlayerNames] = useState<string[]>([]);
    const [renderGame, setRenderGame] = useState(false)
    const [isMaxed, setIsMaxed] = useState(false)

    const scrollRef = useRef<ScrollView | null>(null); // reference to scollview

    // DEVELOPMENT: reset page
    const resetPage = () => {
        setPlayers(1)
        setIsMaxed(false)
    }

    // check if you can add a new player input or if maxed is reached
    const addNewPlayerInput = () => {
        console.log(players)
        if (players == 6) {
            console.log("Disabled legg til spiller...")
            setIsMaxed(true)
        }
        setPlayers((prev) => prev + 1)
    }

    // Updates players to list of players whenever a name is changed
    const updatePlayerNames = (name: string, i: number) => {
        const arr = [...playerNames];
        arr[i] = name;
        setPlayerNames(arr);
    }

    // Adds all valid names and starts the game
    const startGame = () => {
        const realNames: string[] = [];
        var regExp = /[a-zA-Z]/g;
        console.log("new line1111111111111111111")
        // pushes valid names to realNames list
        playerNames.forEach((playerName) => {
            if (playerName !== undefined && playerName.trim()) {
                console.log("playerName: " + playerName)
                realNames.push(playerName);
            }
        });
        console.log("realnames: " + realNames + "|||||||||||||||||||")
        // only let the game start if there are two valid
        if (players >= 2 && realNames.length >= 2) {
            console.log("GAMES HAS STARTED")
            setRenderGame(false)

            //  let finalPlayers: Player 
            //  let finalPlayerList: PlayerList

            // for (let i = 0; i < players; i++) {

            //     finalPlayerList.add(playerNames[i])
            // }
        }
    }
    return (
        <View style={styles.container}>
            {
                renderGame ? null
                    :
                    <View style={styles.addPlayersContainer}>
                        <Text style={styles.numberOfPlayersText}>Antall spillere: {players}</Text>

                        <ScrollView
                            style={styles.scrollViewContainer}
                            nestedScrollEnabled={true}
                            ref={scrollRef}
                            onContentSizeChange={() => {
                                scrollRef?.current?.scrollToEnd({ animated: true })
                            }}
                            horizontal={false}
                        >

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

                                {isMaxed ?
                                    <Pressable style={styles.maxPlayersButton} disabled={true}>
                                        <Text style={styles.buttonText}>Max spillere satt</Text>
                                    </Pressable>
                                    :
                                    <Pressable style={styles.addPlayerButton} onPress={() => addNewPlayerInput()}>
                                        <Text style={styles.buttonText}>Legg til spiller...</Text>
                                    </Pressable>
                                }
                            </View>
                        </ScrollView>
                        <Pressable style={styles.startGameButton} onPress={() => startGame()}>
                            <Text style={styles.buttonText}>Start drikkinga!</Text>
                        </Pressable>
                        <Pressable style={styles.startGameButton} onPress={() => resetPage()}>
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

    scrollViewContainer: {
        marginHorizontal: 20,
        width: '100%',
        borderColor: 'green',
        borderWidth: 5,
    },
    nameContainer: {

        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        minWidth: '100%',
        minHeight: '100%',
        borderColor: 'blue',
        borderWidth: 5,
        alignItems: 'center',
        marginBottom: '15%',
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
    maxPlayersButton: {
        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: 4,
        elevation: 3,
        width: '50%',
        height: '7%',
        backgroundColor: 'gray',
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
