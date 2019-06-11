import { StyleSheet, Dimensions } from 'react-native'

import { ApplicationStyles, Metrics, Colors } from '../../../shared/themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.silver
  },
  row: {
    flex: 1,
    backgroundColor: Colors.fire,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'center'
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  label: {
    textAlign: 'center',
    color: Colors.snow
  },
  listContent: {
    marginTop: Metrics.baseMargin
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    // paddingLeft: 10,
    color: 'grey'
  },
  dateText: {
    // paddingLeft: 10,
    color: 'black',
    fontSize: 20
  },
  emptyText:
  {
    textAlign: 'center',
    fontSize:20,
    fontWeight:'bold',
    color: 'grey',
    marginTop: 10
  },
  searchContainer: {
    // position: 'absolute',
    // top: 0,
    // paddingTop: 20,
    borderBottomColor: '#bbb',
    backgroundColor: 'white',
  },
  headerText: {
    marginTop: Dimensions.get('window').height / 8,
    height: 40,
  },
    topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: Metrics.images.logo,
    width: Metrics.images.logo
  }
})
