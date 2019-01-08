import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import ContatoLojaMaconicaActions from './contato-loja-maconica.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { contatoLojaMaconicaEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './contato-loja-maconica-entity-edit-screen-style'

let Form = t.form.Form

class ContatoLojaMaconicaEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        nome: t.maybe(t.String),
        telefone: t.maybe(t.String),
        email: t.maybe(t.String)
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
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'emailInput'
          }
        }
      },
      success: false,
      contatoLojaMaconica: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getContatoLojaMaconica(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.contatoLojaMaconica && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.contatoLojaMaconica)
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
        this.props.getAllContatoLojaMaconicas({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.contatoLojaMaconica.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: contatoLojaMaconicaEntityDetailScreen.bind(this, { entityId })
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
      email: value.email || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      nome: value.nome || null,
      telefone: value.telefone || null,
      email: value.email || null
    }
    return entity
  }

  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const contatoLojaMaconica = this.refs.form.getValue()
    if (contatoLojaMaconica) { // if validation fails, value will be null
      this.props.updateContatoLojaMaconica(this.formValueToEntity(contatoLojaMaconica))
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
    contatoLojaMaconica: state.contatoLojaMaconicas.contatoLojaMaconica,
    fetching: state.contatoLojaMaconicas.fetchingOne,
    updating: state.contatoLojaMaconicas.updating,
    error: state.contatoLojaMaconicas.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getContatoLojaMaconica: (id) => dispatch(ContatoLojaMaconicaActions.contatoLojaMaconicaRequest(id)),
    getAllContatoLojaMaconicas: (options) => dispatch(ContatoLojaMaconicaActions.contatoLojaMaconicaAllRequest(options)),
    updateContatoLojaMaconica: (contatoLojaMaconica) => dispatch(ContatoLojaMaconicaActions.contatoLojaMaconicaUpdateRequest(contatoLojaMaconica))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContatoLojaMaconicaEntityEditScreen)
