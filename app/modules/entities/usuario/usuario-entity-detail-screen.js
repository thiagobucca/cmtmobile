import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { usuarioEntityEditScreen } from '../../../navigation/layouts'

import UsuarioActions from './usuario.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './usuario-entity-detail-screen-style'

class UsuarioEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      usuario: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getUsuario(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.usuario) {
      this.setState({ usuario: newProps.usuario })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllUsuarios()
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
      'Delete Usuario?',
      'Are you sure you want to delete the Usuario?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteUsuario(this.props.data.entityId)
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
        <Text>ID: {this.state.usuario.id}</Text>
        <Text testID='nome'>Nome: {this.state.usuario.nome}</Text>
        <Text testID='telefone'>Telefone: {this.state.usuario.telefone}</Text>
        <Text testID='email'>Email: {this.state.usuario.email}</Text>
        <Text testID='senha'>Senha: {this.state.usuario.senha}</Text>
        <Text testID='bolAtivo'>BolAtivo: {this.state.usuario.bolAtivo}</Text>
        <Text testID='perfilId'>PerfilId: {this.state.usuario.perfilId}</Text>
        <RoundedButton text='Edit' onPress={usuarioEntityEditScreen.bind(this, { entityId: this.state.usuario.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    usuario: state.usuarios.usuario,
    deleting: state.usuarios.deleting,
    errorDeleting: state.usuarios.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsuario: (id) => dispatch(UsuarioActions.usuarioRequest(id)),
    getAllUsuarios: (options) => dispatch(UsuarioActions.usuarioAllRequest(options)),
    deleteUsuario: (id) => dispatch(UsuarioActions.usuarioDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsuarioEntityDetailScreen)
