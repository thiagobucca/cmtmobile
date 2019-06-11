import { StyleSheet } from 'react-native'

import { ApplicationStyles } from '../../../shared/themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    padding: 20
  },

  storyCounters: {
    width: 25,
  },


  iconCounter: {
    fontSize: 21,
    color: '#bbbbbb',
    textAlign: 'center',
  },

  iconCounterText: {
    color: '#bbbbbb',
    fontSize: 12,
    textAlign: 'center'
  },
})
