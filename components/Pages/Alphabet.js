import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import DisplayLetter from '../Alphabet/DisplayLetter'

export default function Alphabet(props) {


  return (
    <View style={styles.screenView}>
        <TouchableOpacity
        onPress={() => props.handlePage('word')}
      >
        <Image
                  source={require('../../assets/files/icons/abc.png')}
        />

      </TouchableOpacity>
    <DisplayLetter letter='a'></DisplayLetter>
    </View>
  )
}
const styles = StyleSheet.create({
    screenView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
})