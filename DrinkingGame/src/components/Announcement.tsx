import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Animated } from 'react-native';
import {AnnouncementProps} from "../types/types";

export const Announcement: React.FC<{announcement: AnnouncementProps, direction: "right" | "left"}> = ({announcement, direction}) => {

    const [slideAnim] = useState(new Animated.Value(direction === "right" ? 500 : -500));
    const [fadeAnim] = useState(new Animated.Value(0))

    useEffect(() => {
        Animated.timing(
            slideAnim,
            {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }
        ).start();

        return () => {
            slideAnim.setValue(direction === "right" ? 500 : -500);
        }
    }, [announcement, direction])

    useEffect(() => {
      Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }
        ).start();

        return () => {
            fadeAnim.setValue(0);
        }
    })

    return (
        <View style={styles.container}>
            {announcement && (
                <Animated.View
                    style={{
                        transform: [{ translateX: slideAnim }],
                        opacity: fadeAnim,
                        width: "100%",
                    }}
                >
                    <Text style={styles.text}>{announcement.text}</Text>
                </Animated.View>
            )}
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
        textAlign: "center",
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
        width: "100%",
    }
});