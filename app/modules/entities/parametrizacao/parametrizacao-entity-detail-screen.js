import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { parametrizacaoEntityEditScreen } from '../../../navigation/layouts'

import ParametrizacaoActions from './parametrizacao.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './parametrizacao-entity-detail-screen-style'

class ParametrizacaoEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      parametrizacao: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getParametrizacao(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.parametrizacao) {
      this.setState({ parametrizacao: newProps.parametrizacao })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllParametrizacaos()
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
      'Delete Parametrizacao?',
      'Are you sure you want to delete the Parametrizacao?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteParametrizacao(this.props.data.entityId)
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
        <Text>ID: {this.state.parametrizacao.id}</Text>
        <Text testID='diaCobrancaConvenio'>DiaCobrancaConvenio: {this.state.parametrizacao.diaCobrancaConvenio}</Text>
        <Text testID='diaPagamentoLoja'>DiaPagamentoLoja: {this.state.parametrizacao.diaPagamentoLoja}</Text>
        <RoundedButton text='Edit' onPress={parametrizacaoEntityEditScreen.bind(this, { entityId: this.state.parametrizacao.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    parametrizacao: state.parametrizacaos.parametrizacao,
    deleting: state.parametrizacaos.deleting,
    errorDeleting: state.parametrizacaos.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getParametrizacao: (id) => dispatch(ParametrizacaoActions.parametrizacaoRequest(id)),
    getAllParametrizacaos: (options) => dispatch(ParametrizacaoActions.parametrizacaoAllRequest(options)),
    deleteParametrizacao: (id) => dispatch(ParametrizacaoActions.parametrizacaoDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParametrizacaoEntityDetailScreen)
