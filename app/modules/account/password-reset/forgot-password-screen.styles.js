import { StyleSheet } from 'react-native'

import { ApplicationStyles, Colors } from '../../../shared/themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    padding: 20
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: Colors.greenCMT,
    borderColor: Colors.greenCMT,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: Colors.buttonCMT,
  },
  loginText: {
    textAlign: 'center',
    color: Colors.silver,
    fontWeight: "bold"
  }
})
