import React from 'react'
import { SectionList, View } from 'react-native'
import styles from './styles/InfiniteList.style'

const renderSectionSeparator = () => {
  return <View style={styles.sectionSeparator} />
}

const renderItemSeparator = () => {
  return <View style={styles.itemSeparator} />
}

const InfiniteList = ({
  sections,
  renderItem,
  onEndReached,
  renderSectionFooter
}) => (
  <SectionList
    contentContainerStyle={styles.sectionListContentContainer}
    contentInsetAdjustmentBehavior="always"
    keyboardDismissMode="on-drag"
    keyExtractor={item => item.id}
    ItemSeparatorComponent={renderItemSeparator}
    SectionSeparatorComponent={renderSectionSeparator}
    sections={sections}
    renderItem={renderItem}
    onEndReached={onEndReached}
    onEndReachedThreshold={0.5}
    renderSectionFooter={renderSectionFooter}
  />
)

export default InfiniteList
