import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, View, Text} from "react-native";
import Entypo from 'react-native-vector-icons/Entypo'


export default function HomePage() {

    const [menuVisible, setMenuVisible] = useState(false)

    const openMenu = () => {
        console.log('Menu Pressed!')
        if (!menuVisible){
            setMenuVisible(true)
        } else {
            setMenuVisible(false)
        }
    }

    return (
        <View style={!menuVisible ? styles.inGameMenuContainerClosed : styles.inGameMenuContainerOpen}>
            <Pressable onPress={() => openMenu()}>
                <Entypo style={styles.menuIcon} name="menu" />
            </Pressable>
            {menuVisible && 
                <View style={styles.inGameMenu}>
                    <Pressable onPress={() => console.log("Legg til navn pressed")}><Text style={styles.menuText}>Legg til Navn</Text></Pressable>
                    <Pressable onPress={() => console.log("Settings pressed")}><Text style={styles.menuText}>Settings</Text></Pressable>
                    <Pressable onPress={() => console.log("Slutt spill pressed")}><Text style={styles.menuText}>Slutt spill</Text></Pressable>
                </View>
            }
        </View>

    )
}

const styles = StyleSheet.create({
    inGameMenuContainerClosed: {
        position: 'absolute',
        width: '5%',
        height: '5%',
        marginTop: '2%',
        right: 0,
        zIndex: 3,

    },
    inGameMenuContainerOpen: {
        position: 'absolute',
        width: '30%',
        height: '70%',
        marginTop: '2%',
        right: 0,
        zIndex: 3,

    },

    inGameMenu: {
        borderRadius: 20,
        marginTop: '15%',
        width: '80%',
        height: '60%',
        position: 'absolute',
        backgroundColor: 'rgba(35, 12, 48, 0.7)',
    },
    menuText: {
        fontSize: 18,
        marginTop: '10%',
        marginLeft: '10%',
        color: 'white',
        fontWeight: 'bold',
    },
    menuIcon: {
        fontSize: 25,
    },
});