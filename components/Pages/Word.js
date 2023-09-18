import { View, Text, Button, StyleSheet, ActivityIndicator, Image, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'

import axios from 'react-native-axios'
import Video from 'react-native-video';

let WordList = []
axios.get('https://gist.githubusercontent.com/cofinley/262765821e4defbc8ff2bdb3356a853b/raw/7abb0559bf7b39e9780684ae314d2d602197f3f6/frequency.txt')
  .then(function (response) {

    WordList = response.data.split(/\n/)
  })
  .catch(function (error) {
    console.log(error);
  });

const regexVideo1 = /(?<=<video src=")(.*?)(?="><\/video>)/g
const regexVideo2 = /(?<=<video src=\\")(.*?)(?="\\><\/video>)/g


export default function Word(props) {
  const [word, setWord] = useState("bonjour")
  const [videoUrls, setVideoUrls] = useState("")
  const [loading, setLoading] = useState(false)
  const [paused, setPaused] = useState(false)
  const [selectedVersion, setSelectedVersion] = useState(0)
  const [input, setInput] = useState("")
  let refVideoPlayer;
  function getVideo(word = 'bonjour') {
    axios.get('https://dico.elix-lsf.fr/dictionnaire/' + word)
      .then(function (response) {
        let urls = response.data.match(regexVideo1)
        if (urls == []) urls = response.data.match(regexVideo2)
        if (urls) {
          console.log(urls)
          setSelectedVersion(0)
          setVideoUrls(urls)
        } else {
          randomWord()
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function randomWord() {
    setWord(WordList[Math.floor(Math.random() * WordList.length)])
  }

  const renderItem = ({ item }) => (
    <Video
      ref={(ref) => refVideoPlayer = ref}
      source={{ uri: item }}
      resizeMode='contain'
      paused={paused}
      onError={(e) => console.log(e)}
      onLoadStart={() => setLoading(true)}
      onLoad={() => setLoading(false)}
      style={styles.video}
      onEnd={() => setLoading(false)}
    />
  );



  useEffect(() => {
    getVideo(word)
    console.log(word)
  }, [word])

  return (
    <View style={styles.screenView}>
      <TouchableOpacity
        onPress={() => props.handlePage('alphabet')}
      >
        <Text>ABC</Text>
      </TouchableOpacity>
      <View style={[styles.row, styles.searchingBar]} >
        <TextInput
          placeholder='Chercher un mot ...'
          onChangeText={setInput}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() => setWord(input.toLowerCase())}
        >
          <Image
            style={[styles.iconControl, styles.inverted]}
            source={require('../../assets/files/icons/arrow.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.video}>

        <Text style={styles.word}>{word}</Text>
        <Text >{selectedVersion + 1}/{videoUrls.length}</Text>
        <View style={styles.veiwVideoPlayer}>
          {videoUrls ?
            <FlatList
              horizontal={true}
              data={videoUrls}
              pagingEnabled
              showsHorizontalScrollIndicator
              bounces={false}
              renderItem={renderItem}
              keyExtractor={item => item}
            />
            : null}
          {loading
            ? <ActivityIndicator size="large" color="#00ff00" style={styles.loading} />
            : null}
        </View>

      </View>
      <View style={styles.viewControls}>
        <TouchableOpacity
          onPress={() => setPaused(false)}
        >
          <Image
            style={styles.iconControl}
            source={require('../../assets/files/icons/play.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setPaused(true)}
        >
          <Image
            style={styles.iconControl}
            source={require('../../assets/files/icons/pause.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => (setPaused(true), refVideoPlayer.seek(0), setTimeout(() => {
            setPaused(false)
          }, 10))}
        >
          <Image
            style={styles.iconControl}
            source={require('../../assets/files/icons/repeat.png')}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => randomWord()}
      >
        <Image
          source={require('../../assets/files/icons/hand.png')}
        />
      </TouchableOpacity>
    </View >


  )
}
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  }, searchingBar: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconControl: {
    width: 40,
    height: 40
  },
  viewControls: {
    flexDirection: 'row',
    marginBottom: 30
  }, word: {
    fontSize: 30,
    fontWeight: 'bold',
  }, veiwVideoPlayer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }, inverted: {
    transform: [{ rotate: "180deg" }]
  }, loading: {
    position: 'absolute',
    zIndex: 2
  }, input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },


})