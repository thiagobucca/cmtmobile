import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import PerfilUsuarioActions from './perfil-usuario.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { perfilUsuarioEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './perfil-usuario-entity-edit-screen-style'

let Form = t.form.Form

class PerfilUsuarioEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        nomePerfil: t.maybe(t.String),
        bolAtivo: t.maybe(t.Boolean)
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          nomePerfil: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('bolAtivo').refs.input.focus(),
            testID: 'nomePerfilInput'
          },
          bolAtivo: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'bolAtivoInput'
          }
        }
      },
      success: false,
      perfilUsuario: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getPerfilUsuario(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.perfilUsuario && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.perfilUsuario)
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
        this.props.getAllPerfilUsuarios({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.perfilUsuario.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: perfilUsuarioEntityDetailScreen.bind(this, { entityId })
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
      nomePerfil: value.nomePerfil || null,
      bolAtivo: value.bolAtivo || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      nomePerfil: value.nomePerfil || null,
      bolAtivo: value.bolAtivo || null
    }
    return entity
  }

  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const perfilUsuario = this.refs.form.getValue()
    if (perfilUsuario) { // if validation fails, value will be null
      this.props.updatePerfilUsuario(this.formValueToEntity(perfilUsuario))
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
    perfilUsuario: state.perfilUsuarios.perfilUsuario,
    fetching: state.perfilUsuarios.fetchingOne,
    updating: state.perfilUsuarios.updating,
    error: state.perfilUsuarios.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPerfilUsuario: (id) => dispatch(PerfilUsuarioActions.perfilUsuarioRequest(id)),
    getAllPerfilUsuarios: (options) => dispatch(PerfilUsuarioActions.perfilUsuarioAllRequest(options)),
    updatePerfilUsuario: (perfilUsuario) => dispatch(PerfilUsuarioActions.perfilUsuarioUpdateRequest(perfilUsuario))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PerfilUsuarioEntityEditScreen)
