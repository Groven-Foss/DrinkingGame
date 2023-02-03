import React, { useState, useRef } from 'react'
import { generateAnnouncementList } from "./CommonMethods";
import {AnnouncementProps} from "../types/types";
import { Animated, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import GameContainer from "../containers/GameContainer";
import { Player } from '../types/types';
import NameInput from './NameInput';

export default function HomePage() {

    const [inputFields, setInputFields] = useState(1);
    const [players, setPlayers] = useState(1);
    const [playerList, setPlayerList] = useState<Player[]>([]);
    const [renderGame, setRenderGame] = useState(false)
    const [isMaxed, setIsMaxed] = useState(false)
    const scrollRef = useRef<ScrollView | null>(null); // reference to scrollview

    const [finalPlayerList, setFinalPlayerList] = useState<Player[]>([])

    const [animation, setAnimation] = useState(new Animated.Value(0))

    const boxInterpolation =  animation.interpolate({
      inputRange: [0, 1],
      outputRange:["rgb(168,54,235)" , "rgb(60,9,227)"]
    })
    const animatedStyle = {
      backgroundColor: boxInterpolation
    }
    // infinite background color animation.
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
        if (event.finished && !renderGame) {
          cycleAnimation();
        }
      });
    }
    cycleAnimation();

    // Can be used for testing. Randomly generates a list of Announcements
    const generateListTestMethod = () => {
        let testList: AnnouncementProps[] = generateAnnouncementList(20);
        console.log("--- GENERATED LIST --- ");
        testList.forEach(a => console.log(a.text));
        console.log("List size: " + testList.length);
    }

    // check if you can add a new player input or if maxed is reached
    const addNewPlayerInput = () => {
        if (players == 6) { // max 7 players
            setIsMaxed(true)
        }
        setPlayers((prev) => prev + 1)
        setInputFields((prev) => prev + 1)
    }

    // Updates playerlist based on player input changes
    const updatePlayerNames = (name: string, i: number, deleteInput: boolean) => {
        if (deleteInput) {
            const arr = [...playerList];
            delete arr[i]
            setPlayerList(arr)
            setPlayers((prev) => prev - 1)
            setIsMaxed(false)
        } else {
                const arr = [...playerList];
                const Player: Player = {} as Player;
                Player.name = name
                arr[i] = Player;
                setPlayerList(arr);
            }
    }

    // Filter all player names and start game if requirements are met
    const startGame = () => {
        // pushes valid names to realNames list
        console.log("Before: " + playerList)
        const validNames: Player[] = [];

        // playerList.filter((player) => { player !== undefined && player.name.trim().length > 0 });
        //console.log("after: " + playerList.filter((player) => { player !== undefined && player.name.trim().length > 0 }))
        console.log(playerList)
        playerList.forEach((player) => {
            if (player !== undefined && player.name.trim()) {
                console.log("playerName: " + player)
                validNames.push(player);
            }
        });

        if (validNames.length >= 2) {

            validNames.map((player) => {
                console.log("name:   " + player.name)
            })
            console.log("game can start validly.")
            setFinalPlayerList(validNames)
            setRenderGame(true);
        }
    }

    return (
        <Animated.View style={{...styles.box, ...animatedStyle}}>
        <SafeAreaView>
          <View style={styles.InsideSafeViewContainer}>
          <View style={styles.container}>
            {
                renderGame ? <GameContainer players={finalPlayerList}/>
                    :
                    <View style={styles.addPlayersContainer}>
                         <Text style={styles.title}>Kort fortalt</Text>
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
                                {/* <Text style={styles.allPlayersText}>
                                    {playerNames.map((playerName) => {
                                        if (playerName !== undefined) {

                                            if (playerName === playerNames[0]) {
                                                return playerName;
                                            } else if (playerName === "" && playerName === playerNames[1]) {
                                                return playerName;
                                            }
                                            return "," + playerName;
                                        }
                                        return "";
                                    })}
                                </Text > */}
                                {
                                [...Array(inputFields).keys()].map((i) => {
                                    //nameInputList.push()
                                    // i equals id of field
                                    return (
                                        <NameInput updatePlayerNames={updatePlayerNames} key={i} id={i}/>
                                    );
                                })}

                                {isMaxed ?
                                    <Pressable style={styles.maxPlayersButton} disabled={true}>
                                        <Text style={styles.buttonText}>Max spillere satt</Text>
                                    </Pressable>
                                    :
                                    <Pressable style={styles.addPlayerButton} onPress={() => addNewPlayerInput()}>
                                        <Text style={styles.buttonText}>+</Text>
                                    </Pressable>
                                }
                            </View>
                        </ScrollView>
                        <Pressable style={styles.startGameButton} onPress={() => startGame()}>
                            <Text style={styles.buttonText}>Start drikkinga!</Text>
                        </Pressable>
                    </View>}
        </View>
          </View>
        </SafeAreaView>
      </Animated.View>

    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
        borderColor: 'black',
        width: '55%',
        borderWidth: 5,
        borderRadius: 20,
        textAlign: 'center',
    },
    box:{
        width: '100%',
        height: '100%',
        backgroundColor: '#5AD2F4'
      },
      InsideSafeViewContainer: {
        // borderColor: 'green',
        // borderWidth: 5,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },
    nameInputView: {
        // borderColor: 'black',
        // borderWidth: 3,
        alignItems: 'center'
    },

    allPlayersText: {
        // borderColor: 'black',
        // borderWidth: 3,
    },

    nameInput: {
        backgroundColor: 'white',
        height: 40,
        margin: 12,
        // borderWidth: 5,
        // borderColor: 'black',
        borderRadius: 20,
        padding: 10,
        width: '50%',
        textAlign: 'center'
    },
    nameInputContainer: {
        flexDirection: 'row',
        // borderColor: 'black',
        // borderWidth: 5,
        justifyContent: 'center',
        alignItems: 'center'

    },
    nameContainer: {
        flex: 1,
        minWidth: '100%',
        minHeight: '100%',
        // borderColor: 'blue',
        // borderWidth: 5,
        alignItems: 'center',
       justifyContent: 'center',
        marginBottom: '15%',
    },
    deleteInputField: {
        borderColor: 'red',
        backgroundColor: 'red',
        // borderWidth: 2,
        // borderRadius: 20,
        width: '20%',
        height: 40,
        margin: 12,
        marginLeft: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },

    scrollViewContainer: {
        marginHorizontal: 20,
        width: '100%',
        // borderColor: 'green',
        // borderWidth: 5,
    },


    buttonText: {
        color: 'white',
        fontSize: 16,

    },

    addPlayerButton: {
        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: 20,
        elevation: 3,
        width: '40%',
        height: '7%',
        backgroundColor: 'teal',
    },
    maxPlayersButton: {
        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: 20,
        elevation: 3,
        width: '50%',
        height: '7%',
        backgroundColor: 'gray',
    },
    startGameButton: {
        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: 20,
        elevation: 3,
        width: '40%',
        height: '7%',
        backgroundColor: 'blue',
    },

    container: {
        height: '100%',
        width: '100%',
        // borderColor: 'yellow',
        // borderWidth: 5,
    },

    addPlayersContainer: {
        paddingTop: '10%',
        // borderColor: 'black',
        // borderWidth: 5,
        height: '100%',
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },

    numberOfPlayersText: {
        // borderColor: 'black',
        // borderWidth: 3,
        textAlign: 'center',
    }
})
