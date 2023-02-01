import React, {useEffect, useState} from "react";
import {AnnouncementProps, PlayerList} from "../types/types";
import {Announcement} from "../components/Announcement";
import {Pressable, StyleSheet, View} from "react-native";
import { changeScreenOrientation } from "../components/CommonMethods"

// This should be included after merge
// export const GameContainer: React.FC<{playerList: PlayerList}> = ({playerList}) => {

export const GameContainer: React.FC<{playerList: PlayerList}> = ({playerList}) => {

    const announcementCardsList: AnnouncementProps[] = require('../../cards.json');

    // Keeps track of what announcement we're currently at. We begin at announcement 0
    const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);

    // Change screen orientation to LANDSCAPE when game is initialized
    useEffect(() => {
        changeScreenOrientation("landscape").then(r => null);
    }, [announcementCardsList])

    const nextAnnouncement = () => {
        // Check if there is a next announcement
        if (currentAnnouncementIndex != announcementCardsList.length - 1) {
            setCurrentAnnouncementIndex(currentAnnouncementIndex + 1);
        }
    }

    const previousAnnouncement = () => {
        // Check if there is a previous announcement
        if (currentAnnouncementIndex > 0) {
            setCurrentAnnouncementIndex(currentAnnouncementIndex - 1);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.nextButtonView}>
                <Pressable style={{width: "100%", height: "100%", }} onPress={() => nextAnnouncement()} />
            </View>

            <View style={styles.textView}>
                { announcementCardsList && <Announcement announcement={announcementCardsList[currentAnnouncementIndex]} /> }
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