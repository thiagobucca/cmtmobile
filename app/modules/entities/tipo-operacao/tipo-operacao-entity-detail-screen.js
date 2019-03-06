import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { tipoOperacaoEntityEditScreen } from '../../../navigation/layouts'

import TipoOperacaoActions from './tipo-operacao.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './tipo-operacao-entity-detail-screen-style'

class TipoOperacaoEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      tipoOperacao: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getTipoOperacao(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.tipoOperacao) {
      this.setState({ tipoOperacao: newProps.tipoOperacao })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllTipoOperacaos()
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
      'Delete TipoOperacao?',
      'Are you sure you want to delete the TipoOperacao?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteTipoOperacao(this.props.data.entityId)
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
        <Text>ID: {this.state.tipoOperacao.id}</Text>
        <Text testID='nomeOperacao'>NomeOperacao: {this.state.tipoOperacao.nomeOperacao}</Text>
        <Text testID='tipoLancamento'>TipoLancamento: {this.state.tipoOperacao.tipoLancamento}</Text>
        <Text testID='bolAtivo'>BolAtivo: {this.state.tipoOperacao.bolAtivo}</Text>
        <RoundedButton text='Edit' onPress={tipoOperacaoEntityEditScreen.bind(this, { entityId: this.state.tipoOperacao.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tipoOperacao: state.tipoOperacaos.tipoOperacao,
    deleting: state.tipoOperacaos.deleting,
    errorDeleting: state.tipoOperacaos.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTipoOperacao: (id) => dispatch(TipoOperacaoActions.tipoOperacaoRequest(id)),
    getAllTipoOperacaos: (options) => dispatch(TipoOperacaoActions.tipoOperacaoAllRequest(options)),
    deleteTipoOperacao: (id) => dispatch(TipoOperacaoActions.tipoOperacaoDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TipoOperacaoEntityDetailScreen)
