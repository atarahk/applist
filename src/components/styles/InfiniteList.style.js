import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  sectionSeparator: {
    height: 0.5,
    backgroundColor: '#ddd'
  },
  itemSeparator: {
    height: 1,
    backgroundColor: '#ddd',
    marginLeft: 16
  },
  sectionListContentContainer: { flexGrow: 1, paddingBottom: 44 },
  titleLabel: { padding: 16, fontSize: 24 },
  container: { flexDirection: 'row', alignItems: 'stretch' }
})
