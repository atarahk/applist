import React from 'react'
import { Text, View } from 'react-native'
import styles from './styles/NoSearch.style'

const NoSearch = () => (
  <View style={styles.container}>
    <Text style={styles.messageLabel}>
      We couldn't find anything match your searching, please try other keywords!
    </Text>
  </View>
)

export default NoSearch
