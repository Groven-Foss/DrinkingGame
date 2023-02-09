import React, { useState } from 'react'
import { StyleSheet, Text, View, useWindowDimensions, SafeAreaView, Animated, TouchableWithoutFeedback, Image } from 'react-native';
import imageLeft1 from '../images_bubble_left/kort_fortalt_msg_1.png';
import imageLeft2 from '../images_bubble_left/kort_fortalt_msg_2.png';
import imageLeft3 from '../images_bubble_left/kort_fortalt_msg_3.png';
import imageLeft4 from '../images_bubble_left/kort_fortalt_msg_4.png';
import imageLeft5 from '../images_bubble_left/kort_fortalt_msg_5.png';
import imageLeft6 from '../images_bubble_left/kort_fortalt_msg_6.png';
import imageLeft7 from '../images_bubble_left/kort_fortalt_msg_7.png';
import imageLeft8 from '../images_bubble_left/kort_fortalt_msg_8.png';
import imageLeft9 from '../images_bubble_left/kort_fortalt_msg_9.png';
import imageRight1 from '../images_bubble_right/kort_fortalt_msg_1.png';
import imageRight2 from '../images_bubble_right/kort_fortalt_msg_2.png';
import imageRight3 from '../images_bubble_right/kort_fortalt_msg_3.png';
import imageRight4 from '../images_bubble_right/kort_fortalt_msg_4.png';
import imageRight5 from '../images_bubble_right/kort_fortalt_msg_5.png';
import imageRight6 from '../images_bubble_right/kort_fortalt_msg_6.png';
import imageRight7 from '../images_bubble_right/kort_fortalt_msg_7.png';
import imageRight8 from '../images_bubble_right/kort_fortalt_msg_8.png';
import imageRight9 from '../images_bubble_right/kort_fortalt_msg_9.png';

export default function IntroToApp() {

    const imagesLeft= [
        imageLeft1,
        imageLeft2,
        imageLeft3,
        imageLeft4,
        imageLeft5,
        imageLeft6,
        imageLeft7,
        imageLeft8,
        imageLeft9,
        ];
    const imagesRight= [
        imageRight1,
        imageRight2,
        imageRight3,
        imageRight4,
        imageRight5,
        imageRight6,
        imageRight7,
        imageRight8,
        imageRight9,
        ];

        const  msgCounter = 5
        const [msgFilterLeft] = useState([0])
        const [msgFilterRight] = useState([0])
        const [animation] = useState(new Animated.Value(0))

        const boxInterpolation = animation.interpolate({
            inputRange: [0, 1],
            outputRange: ["rgb(211,211,211)", "rgb(168,54,235)"]
        })
    
        const animatedStyle = {
            backgroundColor: boxInterpolation
        }
    
        function cycleAnimation() {
            Animated.sequence([
                Animated.timing(animation, {
                    toValue: 1,
                    duration: 20000,
                    delay: 1000,
                    useNativeDriver: false
                }),
                Animated.timing(animation, {
                    toValue: 0,
                    duration: 5000,
                    useNativeDriver: false
                })
            ]).start(event => {
                if (event.finished) {
                    cycleAnimation();
                }
            });
        }
        cycleAnimation();

    
        const generateMsg = (i: number) => {

            let randomNr: number = Math.floor(Math.random() * 9)
            
        
            if (i == 1 || i == 3 || i == 5){
        
              while (msgFilterLeft.includes(randomNr)){
                randomNr = Math.floor(Math.random() * 9)
              }
              console.log(randomNr)
              console.log(msgFilterLeft)
              return <Image source={imagesLeft[randomNr]} key={i} style={{ width: 230, height: 100, alignSelf: 'flex-start'}} />
        
            }
            else {
              while (msgFilterRight.includes(randomNr)){
                randomNr = Math.floor(Math.random() * 9)
              }
              return <Image source={imagesRight[randomNr]} key={i} style={{ width: 230, height: 100, alignSelf: 'flex-end'}} />
            }
          };
    return(
        <Animated.View style={{ ...styles.box, ...animatedStyle }}>

    <View style={styles.introContainer}>
         {
            
            [...Array(msgCounter).keys()].map((i) => {
              return generateMsg(i)
            })
        
        }
      {/* <HomePage /> */}
    </View>
    </Animated.View>
    )
}

const styles = StyleSheet.create({
    introContainer: {
       marginBottom: '20%',
       flex: 1,
       flexDirection: 'column-reverse'
    },
    box: {
        width: '100%',
        height: '100%',
        backgroundColor: '#5AD2F4'
    },
   
  });