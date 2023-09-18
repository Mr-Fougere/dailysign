import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Word from './components/Pages/Word';
import Alphabet from './components/Pages/Alphabet';

export default function App() {

  const [renderPage, setRenderPage] = useState()
  const [activepPage, setActivepPage] = useState('word')

  useEffect(() => {
    switch (activepPage) {
      case 'word':
        setRenderPage(<Word handlePage={setActivepPage}/>)
        break;
      case 'alphabet':
        setRenderPage(<Alphabet handlePage={setActivepPage}/>)
        break;
      default:
        break;
    }
  }, [activepPage])
  
  

  
  return (
    <View style={styles.viewPage}>
      {renderPage}
    </View>
  )
}
const styles = StyleSheet.create({
  viewPage: {
    flex:1,
  }})