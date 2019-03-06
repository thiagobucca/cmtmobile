import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import LojaMaconicaActions from './loja-maconica.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { lojaMaconicaEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './loja-maconica-entity-edit-screen-style'

let Form = t.form.Form

class LojaMaconicaEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        codCnpj: t.maybe(t.String),
        nome: t.maybe(t.String),
        endereco: t.maybe(t.String),
        telefone: t.maybe(t.String),
        numero: t.maybe(t.Number),
        bolAtivo: t.maybe(t.Boolean)
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          codCnpj: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('nome').refs.input.focus(),
            testID: 'codCnpjInput'
          },
          nome: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('endereco').refs.input.focus(),
            testID: 'nomeInput'
          },
          endereco: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('telefone').refs.input.focus(),
            testID: 'enderecoInput'
          },
          telefone: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('numero').refs.input.focus(),
            testID: 'telefoneInput'
          },
          numero: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('bolAtivo').refs.input.focus(),
            testID: 'numeroInput'
          },
          bolAtivo: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'bolAtivoInput'
          }
        }
      },
      success: false,
      lojaMaconica: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getLojaMaconica(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.lojaMaconica && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.lojaMaconica)
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
        this.props.getAllLojaMaconicas({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.lojaMaconica.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: lojaMaconicaEntityDetailScreen.bind(this, { entityId })
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
      codCnpj: value.codCnpj || null,
      nome: value.nome || null,
      endereco: value.endereco || null,
      telefone: value.telefone || null,
      numero: value.numero || null,
      bolAtivo: value.bolAtivo || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      codCnpj: value.codCnpj || null,
      nome: value.nome || null,
      endereco: value.endereco || null,
      telefone: value.telefone || null,
      numero: value.numero || null,
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
    const lojaMaconica = this.refs.form.getValue()
    if (lojaMaconica) { // if validation fails, value will be null
      this.props.updateLojaMaconica(this.formValueToEntity(lojaMaconica))
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
    lojaMaconica: state.lojaMaconicas.lojaMaconica,
    fetching: state.lojaMaconicas.fetchingOne,
    updating: state.lojaMaconicas.updating,
    error: state.lojaMaconicas.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getLojaMaconica: (id) => dispatch(LojaMaconicaActions.lojaMaconicaRequest(id)),
    getAllLojaMaconicas: (options) => dispatch(LojaMaconicaActions.lojaMaconicaAllRequest(options)),
    updateLojaMaconica: (lojaMaconica) => dispatch(LojaMaconicaActions.lojaMaconicaUpdateRequest(lojaMaconica))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LojaMaconicaEntityEditScreen)
