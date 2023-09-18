import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import Alpha from '../../assets/files/sign_alphabet.png'

export default function DisplayLetter(props) {
    const offsetLetter = offsetAlpha[props.letter]

    const styles = StyleSheet.create({
        image: {
            position: 'absolute',
            top: offsetLetter['x'],
            bottom: offsetLetter['y'],
            width: offsetLetter['width'],
            height: offsetAlpha['height'],
            borderWidth: 4,
            borderColor: 'black',
            borderStyle: 'solid'
        }
    })

    return (
        <View>
            <ImageBackground
                source={Alpha}
                // resizeMethod={'auto'}
                style={{
                    width: "100%",
                    padding: 50,
                    paddingVertical: 40,
                    overflow: 'hidden' // prevent image overflow the container
                }}
                imageStyle={{
                    resizeMode: "cover",
                    width:100,
                    height: 50, // the image height
                    top: undefined
                }}
            />
                <Text>DisplayLetter</Text>
        </View>
    )
}
