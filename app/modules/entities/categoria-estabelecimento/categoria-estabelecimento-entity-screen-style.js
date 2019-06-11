import { StyleSheet } from 'react-native'

import { ApplicationStyles, Metrics, Colors } from '../../../shared/themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  // container: {
  //   flex: 1,
  //   backgroundColor: Colors.background
  // },
  // row: {
  //   flex: 1,
  //   backgroundColor: Colors.fire,
  //   marginVertical: Metrics.smallMargin,
  //   justifyContent: 'center'
  // },
  // boldLabel: {
  //   fontWeight: 'bold',
  //   alignSelf: 'center',
  //   color: Colors.snow,
  //   textAlign: 'center',
  //   marginBottom: Metrics.smallMargin
  // },
  // label: {
  //   textAlign: 'center',
  //   color: Colors.snow
  // },
  // listContent: {
  //   marginTop: Metrics.baseMargin
  // }
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.backCMT
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
  },
  GridViewContainer: {
   flex:1,
   justifyContent: 'center',
   alignItems: 'center',
   height: 100,
   margin: 5,
   backgroundColor: "#e5e5e5",
   borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 1
},
GridViewTextLayout: {
   fontSize: 13,
  //  fontWeight: 'bold',
   justifyContent: 'center',
   color: Colors.black,
   padding: 10,
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
GridViewBadge: {
  fontSize: 15,
 //  fontWeight: 'bold',
  justifyContent: 'center',
  backgroundColor: '#489EFE',
  color: '#FFFFFF'
},
GridViewImageLayout: {
  fontSize: 13,
  //  fontWeight: 'bold',
   justifyContent: 'center',
   color: Colors.black,
   padding: 10,
   resizeMode: 'contain'
}
})
