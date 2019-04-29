import React from 'react'
import { FlatList, Text, View } from 'react-native'
import styles from './styles/RecommendList.style'
import Indicator from './Indicator'

const RecommendList = ({ data, renderItem, isFetching }) => (
  <View style={styles.container}>
    <Text style={styles.titleLabel}>Recommend</Text>
    {isFetching ? (
      <Indicator />
    ) : (
      <FlatList
        style={styles.flatList}
        keyExtractor={item => item.id}
        horizontal
        data={data}
        renderItem={renderItem}
      />
    )}
  </View>
)

export default RecommendList
