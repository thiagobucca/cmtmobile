import React from 'react'
import { Alert, ScrollView, Text, View, Image } from 'react-native'
import { Card, ListItem, Button, Icon, Divider} from 'react-native-elements'

import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { cupomEntityEditScreen } from '../../../navigation/layouts'

import CupomActions from './cupom.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './cupom-entity-detail-screen-style'

class CupomEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      cupom: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getCupom(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.cupom) {
      this.setState({ cupom: newProps.cupom })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllCupoms()
        Navigation.pop(this.props.componentId)
      } else {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{text: 'OK'}])
        this.setState({
          success: false,
          requesting: false
        })
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Deletar Cupom?',
      'Tem certeza que deseja apagar o Cupom?',
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteCupom(this.props.data.entityId)
            })
          }
        }
      ],
      { cancelable: false }
    )
  }

//   render () {
//     return (
//       <ScrollView style={styles.container}>
//         {/* <Text>ID: {this.state.cupom.id}</Text>
//         <Text testID='data'>Data: {this.state.cupom.data}</Text>
//         <Text testID='valor'>Valor: {this.state.cupom.valor}</Text>
//         <Text testID='numero'>Numero: {this.state.cupom.numero}</Text>
//         <Text testID='foto'>Foto: {this.state.cupom.foto}</Text>
//         <Text testID='estabelecimentoComercialId'>EstabelecimentoComercialId: {this.state.cupom.estabelecimentoComercialId}</Text>
//         <RoundedButton text='Edit' onPress={cupomEntityEditScreen.bind(this, { entityId: this.state.cupom.id })} />
//         <RoundedButton text='Delete' onPress={this.confirmDelete} /> */}
//               <Card title="Local Modules">
//         {/*react-native-elements Card*/}
//           <Text style={styles.paragraph}>
//             This is a card from the react-native-elements
//           </Text>
//         </Card>
//       </ScrollView>
//     )
//   }
// }

render () {
  return (
// implemented with Text and Button as children
<Card
  title='Detalhamento'
  image={{uri: this.state.cupom.foto}}
  imageStyle={{height:300, width:300}}>
  <Text style={{marginBottom: 10}}>
  Estabelecimento: {this.state.cupom.estabelecimento}
  </Text>
  <Text style={{marginBottom: 10}}>
  Valor: {this.state.cupom.valor}
  </Text>
  <Text style={{marginBottom: 10}}>
  Numero: {this.state.cupom.numero > 0 ? this.state.cupom.numero : "Não Informado"}
  </Text>
  <Text style={{marginBottom: 10}}>
  Data: {this.state.cupom.data}
  </Text>
  <RoundedButton text='Deletar' onPress={this.confirmDelete} />
</Card>
  )
}
}

const mapStateToProps = (state) => {
  return {
    cupom: state.cupoms.cupom,
    deleting: state.cupoms.deleting,
    errorDeleting: state.cupoms.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCupom: (id) => dispatch(CupomActions.cupomRequest(id)),
    getAllCupoms: (options) => dispatch(CupomActions.cupomAllRequest(options)),
    deleteCupom: (id) => dispatch(CupomActions.cupomDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CupomEntityDetailScreen)
