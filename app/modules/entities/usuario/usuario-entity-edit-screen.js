import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import UsuarioActions from './usuario.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { usuarioEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './usuario-entity-edit-screen-style'

let Form = t.form.Form

class UsuarioEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        nome: t.maybe(t.String),
        telefone: t.maybe(t.String),
        email: t.maybe(t.String),
        senha: t.maybe(t.String),
        bolAtivo: t.maybe(t.Boolean),
        perfilId: t.maybe(t.Number)
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          nome: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('telefone').refs.input.focus(),
            testID: 'nomeInput'
          },
          telefone: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('email').refs.input.focus(),
            testID: 'telefoneInput'
          },
          email: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('senha').refs.input.focus(),
            testID: 'emailInput'
          },
          senha: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('bolAtivo').refs.input.focus(),
            testID: 'senhaInput'
          },
          bolAtivo: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('perfilId').refs.input.focus(),
            testID: 'bolAtivoInput'
          },
          perfilId: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'perfilIdInput'
          }
        }
      },
      success: false,
      usuario: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getUsuario(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.usuario && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.usuario)
      })
    }

    // Did the update attempt complete?
    if (!newProps.updating && this.state.requesting) {
      if (newProps.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{text: 'OK'}])
        this.setState({
          success: false,
          requesting: false
        })
      } else {
        this.props.getAllUsuarios({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.usuario.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: usuarioEntityDetailScreen.bind(this, { entityId })
          })
        }
        this.setState({
          success: true,
          requesting: false,
          formValue: { id: null }
        })
        Navigation.pop(this.props.componentId)
        Alert.alert('Success', 'Entity saved successfully', alertOptions)
      }
    }
  }

  // convenience methods for customizing the mapping of the entity to/from the form value
  entityToFormValue = (value) => {
    if (!value) {
      return {}
    }
    return {
      id: value.id || null,
      nome: value.nome || null,
      telefone: value.telefone || null,
      email: value.email || null,
      senha: value.senha || null,
      bolAtivo: value.bolAtivo || null,
      perfilId: value.perfilId || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      nome: value.nome || null,
      telefone: value.telefone || null,
      email: value.email || null,
      senha: value.senha || null,
      bolAtivo: value.bolAtivo || null,
      perfilId: value.perfilId || null
    }
    return entity
  }

  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const usuario = this.refs.form.getValue()
    if (usuario) { // if validation fails, value will be null
      this.props.updateUsuario(this.formValueToEntity(usuario))
    }
  }

  formChange (newValue) {
    this.setState({
      formValue: newValue
    })
  }

  render () {
    return (
      <KeyboardAwareScrollView>
        <ScrollView style={styles.container} testID='entityScrollView'>
          <Form
            ref='form'
            type={this.state.formModel}
            options={this.state.formOptions}
            value={this.state.formValue}
            onChange={this.formChange}
          />
          <TouchableHighlight style={styles.button} onPress={this.submitForm} underlayColor='#99d9f4' testID='submitButton'>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </ScrollView>
      </KeyboardAwareScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    usuario: state.usuarios.usuario,
    fetching: state.usuarios.fetchingOne,
    updating: state.usuarios.updating,
    error: state.usuarios.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsuario: (id) => dispatch(UsuarioActions.usuarioRequest(id)),
    getAllUsuarios: (options) => dispatch(UsuarioActions.usuarioAllRequest(options)),
    updateUsuario: (usuario) => dispatch(UsuarioActions.usuarioUpdateRequest(usuario))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsuarioEntityEditScreen)
