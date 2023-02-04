import React, { useEffect, useState } from "react";
import { GameContainerProps, Player } from "../types/types";
import { Announcement } from "../components/Announcement";
import { Pressable, StyleSheet, View } from "react-native";
import { changeScreenOrientation } from "../components/CommonMethods";

export default function GameContainer ({players, announcementList}: GameContainerProps) {

    // Keeps track of what announcement we're currently at. We begin at announcement 0
    const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
    const [isModifyingAnnouncemnetList, setIsModifyingAnnouncementList] = useState(true);

    // Change screen orientation to LANDSCAPE when game is initialized
    useEffect(() => {
        changeScreenOrientation("landscape").then(r => null);
        updateAnnouncementWithNames();
    }, [announcementList])

    const nextAnnouncement = () => {
        // Check if there is a next announcement
        if (currentAnnouncementIndex != announcementList.length - 1) {
            setCurrentAnnouncementIndex(currentAnnouncementIndex + 1);
        }
    }

    const previousAnnouncement = () => {
        // Check if there is a previous announcement
        if (currentAnnouncementIndex > 0) {
            setCurrentAnnouncementIndex(currentAnnouncementIndex - 1);
        }
    }

    // Update all announcements, and add in random names
    const updateAnnouncementWithNames = () => {

        let randomPlayerOrder: Player[] = findRandomPlayers(players.length);

        for (let i = 0; i < announcementList.length; i++) {

            announcementList[i].text = replaceTagsWithName(announcementList[i].text, randomPlayerOrder);
            if (!(announcementList[i].shouldHaveNextCards)) {
                randomPlayerOrder = findRandomPlayers(players.length);
            }
        }
        console.log("\n");
        announcementList.forEach(a => {
            console.log(a.text);
        })

        console.log("Length before: " + announcementList.length);
        console.log("Last element before: " + announcementList[announcementList.length - 1].text);

        // Pop last elements if they should have nextCards
        let removeLastElement = true;
        let count = 0;

        while (removeLastElement) {
            console.log("Trying: " + announcementList[announcementList.length - 1].text);
            if (announcementList[announcementList.length - 1].shouldHaveNextCards) {
                console.log("Popping!");
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

        console.log("Length after: " + announcementList.length);
        console.log("Last element after: " + announcementList[announcementList.length - 1].text);

        // Add the last card: Game is over!

        announcementList.push({
            text: "SPILLET ER OVER!",
            minRequiredPlayers: 1,
            backgroundColor: "yellow",
            shouldHaveNextCards: false,
            nextCards: []
        })

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

            while (!playerValid) {
                const randInt: number = Math.floor(Math.random() * (players.length - 1 + 1));
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
        console.log("Text: " + text);

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
                { !isModifyingAnnouncemnetList && announcementList.length != 0 && <Announcement announcement={announcementList[currentAnnouncementIndex]} />}
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