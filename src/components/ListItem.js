import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Rating } from 'react-native-elements'
import styles from './styles/ListItem.style'

const ListItem = ({ item, i }) => (
  <TouchableOpacity activeOpacity={0.5} style={styles.container}>
    <Text style={styles.indexIcon}>{i + 1}</Text>
    <Image
      style={i % 2 === 0 ? styles.iconOdd : styles.iconEven}
      source={{ uri: item.mediumImage }}
    />
    <View style={styles.contentContainer}>
      <Text style={styles.nameLabel} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.categoryLabel} numberOfLines={1}>
        {item.category}
      </Text>
      <View style={styles.ratingContainer}>
        <Rating
          imageSize={10}
          readonly
          startingValue={item.averageUserRating}
        />
        <Text style={styles.ratingLabel} numberOfLines={1}>
          ({item.userRatingCount ? item.userRatingCount : 0})
        </Text>
      </View>
    </View>
  </TouchableOpacity>
)

export default ListItem
