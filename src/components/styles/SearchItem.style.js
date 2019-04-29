import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  keyboardAvoiding: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between'
  },
  searchBarContainer: {
    backgroundColor: '#fff',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent'
  },
  searchBarInputContainer: {
    backgroundColor: '#f1f1f1'
  }
})
