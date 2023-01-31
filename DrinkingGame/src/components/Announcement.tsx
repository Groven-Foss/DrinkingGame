import React from "react";
import {StyleSheet, View, Text} from 'react-native';
import {AnnouncementProps} from "../types/types";

export const Announcement: React.FC<{announcement: AnnouncementProps}> = ({announcement}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{announcement.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        height: "100%",
        width: "100%",
    },

    text: {
        transform: [{rotate: '90deg'}],
        textAlign: "center",
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
        width: "100%",
    }
});