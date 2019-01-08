import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { perfilUsuarioEntityEditScreen } from '../../../navigation/layouts'

import PerfilUsuarioActions from './perfil-usuario.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './perfil-usuario-entity-detail-screen-style'

class PerfilUsuarioEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      perfilUsuario: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getPerfilUsuario(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.perfilUsuario) {
      this.setState({ perfilUsuario: newProps.perfilUsuario })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllPerfilUsuarios()
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
      'Delete PerfilUsuario?',
      'Are you sure you want to delete the PerfilUsuario?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deletePerfilUsuario(this.props.data.entityId)
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
        <Text>ID: {this.state.perfilUsuario.id}</Text>
        <Text testID='nomePerfil'>NomePerfil: {this.state.perfilUsuario.nomePerfil}</Text>
        <Text testID='bolAtivo'>BolAtivo: {this.state.perfilUsuario.bolAtivo}</Text>
        <RoundedButton text='Edit' onPress={perfilUsuarioEntityEditScreen.bind(this, { entityId: this.state.perfilUsuario.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    perfilUsuario: state.perfilUsuarios.perfilUsuario,
    deleting: state.perfilUsuarios.deleting,
    errorDeleting: state.perfilUsuarios.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPerfilUsuario: (id) => dispatch(PerfilUsuarioActions.perfilUsuarioRequest(id)),
    getAllPerfilUsuarios: (options) => dispatch(PerfilUsuarioActions.perfilUsuarioAllRequest(options)),
    deletePerfilUsuario: (id) => dispatch(PerfilUsuarioActions.perfilUsuarioDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PerfilUsuarioEntityDetailScreen)
