import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Animated } from 'react-native';
import {AnnouncementProps} from "../types/types";

export const Announcement: React.FC<{
    announcement: AnnouncementProps,
    direction: "right" | "left",
    firstRenderOfAnnouncements: true | false}> = (
        {announcement, direction, firstRenderOfAnnouncements}
) => {

    const [slideAnim] = useState(new Animated.Value(direction === "right" ? 500 : -500));
    const [fadeAnim] = useState(new Animated.Value(0))
    const [isAnimatingCurrentText, setIsAnimatingCurrentText] = useState(false);
    const [oldText, setOldText] = useState("");

    useEffect(() => {
        setIsAnimatingCurrentText(true);
        slideAnim.setValue(0);
        Animated.timing(
            slideAnim,
            {
                toValue: direction === "right" ? -300 : 300,
                duration: 300,
                useNativeDriver: true,
            }
        ).start(() => {
            setIsAnimatingCurrentText(false);
            slideAnim.setValue(direction === "right" ? 500 : -500);
            Animated.timing(
                slideAnim,
                {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }
            ).start();
            setOldText(announcement.text);
        });

        return () => {
            slideAnim.setValue(direction === "right" ? 500 : -500);
        }
    }, [announcement, direction])

    useEffect(() => {
        setOldText(announcement.text);
    }, [])

    useEffect(() => {
        if (isAnimatingCurrentText) {
            fadeAnim.setValue(1);
            Animated.timing(
                fadeAnim,
                {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true
                }
            ).start();
        }

    }, [isAnimatingCurrentText])

    useEffect(() => {
        if (!isAnimatingCurrentText) {
            fadeAnim.setValue(0);
            Animated.timing(
                fadeAnim,
                {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                }
            ).start();
        }

    }, [isAnimatingCurrentText])

    return (
        <View style={styles.container}>
            {announcement && (
                (!firstRenderOfAnnouncements ?
                    <Animated.View style={{transform: [{ translateX: slideAnim }], opacity: fadeAnim, width: "100%",}}>
                        <Text style={styles.text}>{!isAnimatingCurrentText ? announcement.text : oldText}</Text>
                    </Animated.View> : <Text style={styles.text}>{announcement.text}</Text>
                )
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
        fontSize: 20,
        fontWeight: "bold",
        width: "100%",
    }
});