import React, {useState} from 'react'
import {StyleSheet, Pressable, TextInput, View, Text} from 'react-native'
import { NameInputProps, updatePlayerNames } from '../types/types';

export default function NameInput({updatePlayerNames, id, key}: NameInputProps) {


    const [showView, setShowView] = useState(true)

    const removeInputField = () => {
        updatePlayerNames("", id, true)
        setShowView(false)

    }

    return (
        <View>

        {showView && 
            <View key={id} style={styles.nameInputContainer}>
                <TextInput key={id} placeholder={"Legg til navn"} style={styles.nameInput} onChangeText={(Text) => updatePlayerNames(Text, id, false)} />
                <Pressable key={id} style={styles.deleteInputField} onPress={() => removeInputField()}><Text>-</Text></Pressable>
            </View>

        }
             </View>
    );
}
const styles = StyleSheet.create({
    deleteInputField: {
        borderColor: 'black',
        borderWidth: 2,
        backgroundColor: 'red',

        borderRadius: 20,
        width: '20%',
        height: 40,
        margin: 12,
        marginLeft: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameInputContainer: {
        flexDirection: 'row',
        // borderColor: 'black',
        // borderWidth: 5,
        justifyContent: 'center',
        alignItems: 'center'
        
    },
    nameInput: {
        backgroundColor: 'white',
        height: 40,
        margin: 12,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 20,
        padding: 10,
        width: '50%',
        textAlign: 'center'
    }
})