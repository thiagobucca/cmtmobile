import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { contasPagarReceberEntityEditScreen } from '../../../navigation/layouts'

import ContasPagarReceberActions from './contas-pagar-receber.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './contas-pagar-receber-entity-detail-screen-style'

class ContasPagarReceberEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      contasPagarReceber: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getContasPagarReceber(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.contasPagarReceber) {
      this.setState({ contasPagarReceber: newProps.contasPagarReceber })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllContasPagarRecebers()
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
      'Delete ContasPagarReceber?',
      'Are you sure you want to delete the ContasPagarReceber?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteContasPagarReceber(this.props.data.entityId)
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
        <Text>ID: {this.state.contasPagarReceber.id}</Text>
        <Text testID='data'>Data: {this.state.contasPagarReceber.data}</Text>
        <Text testID='valor'>Valor: {this.state.contasPagarReceber.valor}</Text>
        <Text testID='statusLancamento'>StatusLancamento: {this.state.contasPagarReceber.statusLancamento}</Text>
        <Text testID='usuarioId'>UsuarioId: {this.state.contasPagarReceber.usuarioId}</Text>
        <Text testID='lojaMaconicaId'>LojaMaconicaId: {this.state.contasPagarReceber.lojaMaconicaId}</Text>
        <Text testID='estabelecimentoComercialId'>EstabelecimentoComercialId: {this.state.contasPagarReceber.estabelecimentoComercialId}</Text>
        <Text testID='tipoOperacaoId'>TipoOperacaoId: {this.state.contasPagarReceber.tipoOperacaoId}</Text>
        <RoundedButton text='Edit' onPress={contasPagarReceberEntityEditScreen.bind(this, { entityId: this.state.contasPagarReceber.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    contasPagarReceber: state.contasPagarRecebers.contasPagarReceber,
    deleting: state.contasPagarRecebers.deleting,
    errorDeleting: state.contasPagarRecebers.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getContasPagarReceber: (id) => dispatch(ContasPagarReceberActions.contasPagarReceberRequest(id)),
    getAllContasPagarRecebers: (options) => dispatch(ContasPagarReceberActions.contasPagarReceberAllRequest(options)),
    deleteContasPagarReceber: (id) => dispatch(ContasPagarReceberActions.contasPagarReceberDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContasPagarReceberEntityDetailScreen)
