import React from 'react'
import { Alert, ScrollView, Text, View, Image } from 'react-native'
import { Card, ListItem, Button, Icon, Divider, Tile} from 'react-native-elements'

import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { cupomEntityEditScreen } from '../../../navigation/layouts'

import CupomActions from './cupom.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './cupom-entity-detail-screen-style'
import moment from 'moment';

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
        this.props.getCupomByUser({ page: this.state.page, sort: this.state.sort, size: this.state.size, usuario_id: this.props.account.id })
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

render () {
  return (
// implemented with Text and Button as children
<Card
  title='Detalhamento'
  image={{uri: this.state.cupom.foto}}
  imageStyle={{height:300, width:300, alignSelf: 'center', justifyContent: 'center'}}>
  <Text icon={<Icon name='home' color='#000000' />} style={{marginBottom: 10}}>
  <Text style={{fontWeight: "bold"}}> Est: </Text>
  <Text style={{fontSize: 12, flex: 1, alignSelf: 'center', justifyContent: 'center'}}>{this.state.cupom.estabelecimento}</Text>
  </Text>
  <Text style={{marginBottom: 10}}>
  <Text style={{fontWeight: "bold"}}> Valor: </Text>
  {'R$' + this.state.cupom.valor}
  </Text>
  <Text style={{marginBottom: 10}}>
  <Text style={{fontWeight: "bold"}}> Numero: </Text>
  {this.state.cupom.numero > 0 ? this.state.cupom.numero : "Não Informado"}
  </Text>
  <Text style={{marginBottom: 10}}>
  <Text style={{fontWeight: "bold"}}> Data: </Text>
  {moment.utc(this.state.cupom.data).format("DD/MM/YYYY")}
  </Text>
</Card>
  )
}


}

const mapStateToProps = (state) => {
  return {
    cupom: state.cupoms.cupom,
    account: state.account.account,
    cupomUser: state.cupoms.cupomUser,
    deleting: state.cupoms.deleting,
    errorDeleting: state.cupoms.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCupom: (id) => dispatch(CupomActions.cupomRequest(id)),
   // getAllCupoms: (options) => dispatch(CupomActions.cupomAllRequest(options)),
    getCupomByUser: (id) => dispatch(CupomActions.cupomUserRequest(id)),
    deleteCupom: (id) => dispatch(CupomActions.cupomDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CupomEntityDetailScreen)
