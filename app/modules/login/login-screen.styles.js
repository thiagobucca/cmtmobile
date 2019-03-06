import { StyleSheet } from 'react-native'

import { Colors, Metrics } from '../../shared/themes'

export default StyleSheet.create({
  // container: {
  //   paddingTop: 70,
  //   backgroundColor: Colors.backCMT
  // },
  form: {
    backgroundColor: Colors.snow,
    margin: Metrics.baseMargin,
    borderRadius: 4
  },
  row: {
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  rowLabel: {
    color: Colors.charcoal
  },
  textInput: {
    height: 40,
    color: Colors.coal
  },
  textInputReadonly: {
    height: 40,
    color: Colors.steel
  },
  loginRow: {
    paddingBottom: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection: 'row'
  },
  loginButtonWrapper: {
    flex: 1
  },
  // loginButton: {
  //   flex: 1,
  //   borderWidth: 1,
  //   borderColor: Colors.transparent,
  //   backgroundColor: Colors.buttonCMT,
  //   borderRadius: 2,
  //   padding: 6
  // },
    registerButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.transparent,
    backgroundColor: Colors.steel,
    borderRadius: 2,
    padding: 6
  },
  topText: {
    textAlign: 'center',
    color: Colors.silver,
    fontWeight: "bold",
    fontSize:20,
  },
  loginText: {
    textAlign: 'center',
    color: Colors.silver,
    fontWeight: "bold"
  },
  titleText: {
    textAlign: 'center',
    color: Colors.black,
    fontWeight: "bold"
  },
  topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    marginBottom: 15
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backCMT,
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:5,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:5,
  },
  loginButton: {
    backgroundColor: Colors.buttonCMT,
  },
  otherButton: {
    borderColor: Colors.snow,
    backgroundColor: Colors.backCMT
  }
})
