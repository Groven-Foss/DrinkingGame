import React, { useEffect, useState } from "react";
import { AnnouncementProps, GameContainerProps, Player, SpecialAnnouncementProps } from "../types/types";
import { Announcement } from "../components/Announcement";
import { Pressable, StyleSheet, View } from "react-native";
import { addSpecialAnnouncementToList, changeScreenOrientation } from "../components/CommonMethods";

export default function GameContainer ({ players, announcementList }: GameContainerProps) {
    console.log("rendering GameContainer");

    // Keeps track of what announcement we're currently at. We begin at announcement 0
    const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
    const [isModifyingAnnouncemnetList, setIsModifyingAnnouncementList] = useState(true);
    const [modifiedAnnouncementList, setModifiedAnnouncementList] = useState<AnnouncementProps[]>([]);
    const [renderAnnouncementDirection, setRenderAnnouncementDirection] = useState("right"); // Direction - used for animation in Announcement.tsx

    // Variables - avoid animations the first time we render an Announcement
    const [isFirstRenderOfGameContainer, setIsFirstRenderOfGameContainer] = useState<boolean>(true);
    const [isFirstRenderOfAnnouncement, setIsFirstRenderOfAnnouncement] = useState<boolean>(true);

    // Special announcements
    const specialAnnouncements: SpecialAnnouncementProps[] = require('../../specialCards.json');
    const [shouldAddAllSpecialAnnouncements, setShouldAddAllSpecialAnnouncemnets] = useState<boolean>(true);

    useEffect(() => {
        // Change screen orientation to LANDSCAPE when game is initialized
        changeScreenOrientation("landscape").then(r => null);

        // Add special announcements
        if (specialAnnouncements.length > 0) {
            addSpecialAnnouncements(specialAnnouncements);
        }

        // Update announcements with player-names
        updateAnnouncementWithNames();
    }, [announcementList, specialAnnouncements])

    useEffect(() => {
        // Add the last card to the announcementList: Game is Over
        if (!isModifyingAnnouncemnetList) {
            setModifiedAnnouncementList(modifiedAnnouncementList => [...modifiedAnnouncementList, {
                text: "SPILLET ER OVER!",
                minRequiredPlayers: 2,
                backgroundColor: "yellow",
                shouldHaveNextCards: false,
                nextCards: []
            }]);
        }
    }, [isModifyingAnnouncemnetList])

    const nextAnnouncement = () => {
        // Check if there is a next announcement
        if (currentAnnouncementIndex != modifiedAnnouncementList.length - 1) {

            // Avoid animation for the first announcement
            setIsFirstRenderOfAnnouncement(false);

            if (renderAnnouncementDirection === "right") {
                setCurrentAnnouncementIndex(currentAnnouncementIndex + 1);
            } else {
                setRenderAnnouncementDirection("right");
            }
        }
    }

    const previousAnnouncement = () => {
        // Check if there is a previous announcement
        if (currentAnnouncementIndex > 0) {
            if (renderAnnouncementDirection === "left") {
                setCurrentAnnouncementIndex(currentAnnouncementIndex - 1);
            } else {
                setRenderAnnouncementDirection("left");
            }
        }
    }

    useEffect(() => {
        if (isFirstRenderOfGameContainer) {
            setIsFirstRenderOfGameContainer(false);
        } else {
            if (renderAnnouncementDirection === "left") {
                setCurrentAnnouncementIndex(currentAnnouncementIndex - 1);
            } else if (renderAnnouncementDirection === "right") {
                setCurrentAnnouncementIndex(currentAnnouncementIndex + 1);
            }
        }
    }, [renderAnnouncementDirection])

    // Add all special announcements
    const addSpecialAnnouncements = (specialAnnouncements: SpecialAnnouncementProps[]) => {
        if (shouldAddAllSpecialAnnouncements) {
            specialAnnouncements.forEach(specialAnnouncement => {
                announcementList = addSpecialAnnouncementToList(specialAnnouncement, announcementList);
            })
        }
    }

    // Update all announcements, and add in random names
    const updateAnnouncementWithNames = () => {
        console.log("Update announcement with names!");

        setModifiedAnnouncementList([]);

        let randomPlayerOrder: Player[] = findRandomPlayers(players.length);

        for (let i = 0; i < announcementList.length; i++) {

            const modifiedAnnouncement: AnnouncementProps = {} as AnnouncementProps;

            modifiedAnnouncement.text = replaceTagsWithName(announcementList[i].text, randomPlayerOrder);
            modifiedAnnouncement.minRequiredPlayers = announcementList[i].minRequiredPlayers;
            modifiedAnnouncement.backgroundColor = announcementList[i].backgroundColor;
            modifiedAnnouncement.shouldHaveNextCards = announcementList[i].shouldHaveNextCards;
            modifiedAnnouncement.nextCards = announcementList[i].nextCards;

            if (!(announcementList[i].shouldHaveNextCards)) {
                randomPlayerOrder = findRandomPlayers(players.length);
            }

            setModifiedAnnouncementList(modifiedAnnouncementList => [...modifiedAnnouncementList, modifiedAnnouncement]);
        }

        // Pop last elements if they should have nextCards
        let removeLastElement = true;
        let count = 0;

        while (removeLastElement) {
            if (announcementList[announcementList.length - 1].shouldHaveNextCards) {
                announcementList.pop();
            } else {
                removeLastElement = false;
            }

            // Avoid infinite loop
            count += 1;
            if (count >= 20) {
                break;
            }
        }

        setIsModifyingAnnouncementList(false);
    }


    /**
     * Find random players
     * Used for replacing #1 and #2 in Announcements
     *
     * @param {number} playerCount Number of players to return
     * @return {Player[]} A list of Players
     */
    const findRandomPlayers = (playerCount: number): Player[] => {
        console.log("-------------KJØRER-----------");
        // Error handling
        if (playerCount > players.length) {
            console.log("arg: playerCount is too high in findRandomPlayers()");
            return []
        }

        // Find players and avoid duplicates
        const playersToReturn: Player[] = [];
        const usedIndexes: number[] = [];

        for (let i = 0; i < playerCount; i++) {
            let playerValid: boolean = false;
            let count: number = 0;
            console.log(players);
            console.log(playersToReturn);
            console.log(usedIndexes);

            while (!playerValid) {
                const randInt: number = Math.floor(Math.random() * (players.length - 1 + 1));
                console.log(randInt);
                if (!usedIndexes.includes(randInt)) {
                    if (!playersToReturn.includes(players[randInt])) {
                        playersToReturn.push(players[randInt]);
                        usedIndexes.push(randInt);
                        playerValid = true;
                    }
                }

                // Error handling
                count += 1;
                if (count >= 20) {
                    console.log("Infinite loop");
                    break;
                }
            }
        }

        console.log(playersToReturn);
        return playersToReturn;
    }

    /**
     * Replace hashtags with names in announcements
     *
     * @param {string} text Text to modify
     * @param {Player[]} selectedPlayers List of Players
     * @return {string} modified string, where hashtags have been replaced with random names
     */
    const replaceTagsWithName = (text: string, selectedPlayers: Player[]) => {
        let namesToReplace: number = 0;

        if (text.indexOf("#1") != -1) {
            namesToReplace += 1;
            if (text.indexOf("#2") != -1) {
                namesToReplace += 1;
                if (text.indexOf("#3") != -1) {
                    namesToReplace += 1;
                    if (text.indexOf("#4") != -1) {
                        namesToReplace += 1;
                    }
                }
            }
        }

        let newText: string = text;

        if (namesToReplace > selectedPlayers.length) {
            console.log("Error: namesToReplace: " + namesToReplace + " is bigger than selectedPlayers: " + selectedPlayers);
            return text;
        }

        for (let i = 1; i <= namesToReplace; i++) {
            newText = newText.replaceAll("#" + i.toString(), selectedPlayers[i-1].name);
        }

        return newText;
    }


    return (
        <View style={styles.container}>
            <View style={styles.nextButtonView}>
                
                <Pressable style={{width: "100%", height: "100%", }} onPress={() => nextAnnouncement()} />
            </View>

            <View style={styles.textView}>
                { !isModifyingAnnouncemnetList
                    && modifiedAnnouncementList.length != 0
                    && (renderAnnouncementDirection === "right" || renderAnnouncementDirection === "left")
                    && <Announcement firstRenderOfAnnouncements={isFirstRenderOfAnnouncement} direction={renderAnnouncementDirection} announcement={modifiedAnnouncementList[currentAnnouncementIndex]} />
                }
            </View>

            <View style={styles.prevButtonView}>
                <Pressable style={{width: "100%", height: "100%"}} onPress={() => previousAnnouncement()} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row-reverse",
        height: "100%",
        width: "100%",
    },

    textView: {
        zIndex: 1,
        width: "100%",
        height: "100%"
    },

    nextButtonView: {
        zIndex: 2,
        position: "absolute",
        left: 0,
        height: "100%",
        width: "50%",
    },

    prevButtonView: {
        zIndex: 2,
        position:"absolute",
        right: 0,
        height: "100%",
        width: "50%",
    }
});