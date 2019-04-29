import React from 'react'
import { Text, Image, TouchableOpacity } from 'react-native'
import styles from './styles/RecommendItem.style'

const RecommendItem = ({ item }) => (
  <TouchableOpacity activeOpacity={0.5} style={styles.container}>
    <Image style={styles.appIcon} source={{ uri: item.mediumImage }} />
    <Text style={styles.nameLabel} numberOfLines={1}>
      {item.name}
    </Text>
    <Text style={styles.categoryLabel} numberOfLines={1}>
      {item.category}
    </Text>
  </TouchableOpacity>
)

export default RecommendItem
