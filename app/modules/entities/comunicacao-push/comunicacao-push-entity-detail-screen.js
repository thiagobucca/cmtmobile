import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { comunicacaoPushEntityEditScreen } from '../../../navigation/layouts'

import ComunicacaoPushActions from './comunicacao-push.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './comunicacao-push-entity-detail-screen-style'

class ComunicacaoPushEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      comunicacaoPush: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getComunicacaoPush(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.comunicacaoPush) {
      this.setState({ comunicacaoPush: newProps.comunicacaoPush })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllComunicacaoPushes()
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
      'Delete ComunicacaoPush?',
      'Are you sure you want to delete the ComunicacaoPush?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteComunicacaoPush(this.props.data.entityId)
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
        <Text>ID: {this.state.comunicacaoPush.id}</Text>
        <Text testID='titulo'>Titulo: {this.state.comunicacaoPush.titulo}</Text>
        <Text testID='conteudoPush'>ConteudoPush: {this.state.comunicacaoPush.conteudoPush}</Text>
        <Text testID='tipoPessoa'>TipoPessoa: {this.state.comunicacaoPush.tipoPessoa}</Text>
        <RoundedButton text='Edit' onPress={comunicacaoPushEntityEditScreen.bind(this, { entityId: this.state.comunicacaoPush.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comunicacaoPush: state.comunicacaoPushes.comunicacaoPush,
    deleting: state.comunicacaoPushes.deleting,
    errorDeleting: state.comunicacaoPushes.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getComunicacaoPush: (id) => dispatch(ComunicacaoPushActions.comunicacaoPushRequest(id)),
    getAllComunicacaoPushes: (options) => dispatch(ComunicacaoPushActions.comunicacaoPushAllRequest(options)),
    deleteComunicacaoPush: (id) => dispatch(ComunicacaoPushActions.comunicacaoPushDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComunicacaoPushEntityDetailScreen)
