import React, {useState} from 'react'
import {StyleSheet, Pressable, TextInput, View, Text} from 'react-native'
import { NameInputProps, updatePlayerNames } from '../types/types';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'

export default function NameInput({updatePlayerNames, id, isAutoFocus}: NameInputProps) {

    const [showView, setShowView] = useState(true)

    const removeInputField = () => {
        updatePlayerNames("", id, true)
        setShowView(false)
        id = 100
    }

    return (
        <View>
            {showView && 
            <View key={id} style={styles.nameInputContainer}>
                <TextInput key={id} placeholder={"Legg til navn"} autoFocus={isAutoFocus} style={styles.nameInput} onChangeText={(Text) => updatePlayerNames(Text, id, false)} />
                <Pressable key={id + 1000} style={styles.deleteInputField} onPress={() => removeInputField()}><Entypo style={styles.removePlayerIcon} name="minus" /></Pressable>
            </View>
            }
        </View>
    );
}
const styles = StyleSheet.create({
    removePlayerIcon: {
        fontSize: 15
    },
    deleteInputField: {
        borderWidth: 2,
        backgroundColor: 'red',
        borderRadius: 20,
        width: '15%',
        height: 40,
        margin: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameInputContainer: {
        flexDirection: 'row',
        // borderColor: 'black',
        // borderWidth: 5,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 0.7
    },
    nameInput: {
        backgroundColor: 'white',
        height: 40,
        margin: 12,
        marginRight: 0,
        borderWidth: 2,
        borderRadius: 20,
        padding: 0,
        width: '60%',
        textAlign: 'center'
    }
})