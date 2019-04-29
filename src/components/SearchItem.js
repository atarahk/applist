import React, { Component } from 'react'
import { SafeAreaView, KeyboardAvoidingView } from 'react-native'
import { SearchBar } from 'react-native-elements'
import styles from './styles/SearchItem.style'

class SearchItem extends Component {
  state = {
    queries: ''
  }

  onChangeText = queries => {
    this.setState({ queries })
    this.props.onqueriesChanged(queries)
  }

  render() {
    const { children, searchPlaceholder } = this.props
    const { queries } = this.state
    return (
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoiding}
          behavior="padding"
          enabled
        >
          <SearchBar
            placeholder={searchPlaceholder}
            onChangeText={this.onChangeText}
            value={queries}
            round
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.searchBarInputContainer}
          />
          {children}
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
}

export default SearchItem
