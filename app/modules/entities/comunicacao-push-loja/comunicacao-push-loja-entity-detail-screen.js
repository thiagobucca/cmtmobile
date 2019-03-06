import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { comunicacaoPushLojaEntityEditScreen } from '../../../navigation/layouts'

import ComunicacaoPushLojaActions from './comunicacao-push-loja.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './comunicacao-push-loja-entity-detail-screen-style'

class ComunicacaoPushLojaEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      comunicacaoPushLoja: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getComunicacaoPushLoja(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.comunicacaoPushLoja) {
      this.setState({ comunicacaoPushLoja: newProps.comunicacaoPushLoja })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllComunicacaoPushLojas()
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
      'Delete ComunicacaoPushLoja?',
      'Are you sure you want to delete the ComunicacaoPushLoja?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteComunicacaoPushLoja(this.props.data.entityId)
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
        <Text>ID: {this.state.comunicacaoPushLoja.id}</Text>
        <Text testID='comunicacaoPushId'>ComunicacaoPushId: {this.state.comunicacaoPushLoja.comunicacaoPushId}</Text>
        <Text testID='lojaMaconicaId'>LojaMaconicaId: {this.state.comunicacaoPushLoja.lojaMaconicaId}</Text>
        <RoundedButton text='Edit' onPress={comunicacaoPushLojaEntityEditScreen.bind(this, { entityId: this.state.comunicacaoPushLoja.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comunicacaoPushLoja: state.comunicacaoPushLojas.comunicacaoPushLoja,
    deleting: state.comunicacaoPushLojas.deleting,
    errorDeleting: state.comunicacaoPushLojas.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getComunicacaoPushLoja: (id) => dispatch(ComunicacaoPushLojaActions.comunicacaoPushLojaRequest(id)),
    getAllComunicacaoPushLojas: (options) => dispatch(ComunicacaoPushLojaActions.comunicacaoPushLojaAllRequest(options)),
    deleteComunicacaoPushLoja: (id) => dispatch(ComunicacaoPushLojaActions.comunicacaoPushLojaDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComunicacaoPushLojaEntityDetailScreen)
