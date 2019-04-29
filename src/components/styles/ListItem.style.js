import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16
  },
  indexIcon: {
    marginRight: 16,
    fontSize: 12,
    color: '#777'
  },
  iconOdd: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 10
  },
  iconEven: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 30
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    marginRight: 16
  },
  nameLabel: { flex: 1, fontSize: 14 },
  categoryLabel: {
    flex: 1,
    fontSize: 12,
    color: '#777'
  },
  ratingContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  ratingLabel: { fontSize: 10, color: '#777', marginLeft: 4 }
})
