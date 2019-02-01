import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
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
      'Delete Cupom?',
      'Are you sure you want to delete the Cupom?',
      [
        {text: 'Cancel', style: 'cancel'},
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
      <ScrollView style={styles.container}>
        <Text>ID: {this.state.cupom.id}</Text>
        <Text testID='data'>Data: {this.state.cupom.data}</Text>
        <Text testID='valor'>Valor: {this.state.cupom.valor}</Text>
        <Text testID='numero'>Numero: {this.state.cupom.numero}</Text>
        <Text testID='foto'>Foto: {this.state.cupom.foto}</Text>
        <Text testID='estabelecimentoComercialId'>EstabelecimentoComercialId: {this.state.cupom.estabelecimentoComercialId}</Text>
        <RoundedButton text='Edit' onPress={cupomEntityEditScreen.bind(this, { entityId: this.state.cupom.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
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
