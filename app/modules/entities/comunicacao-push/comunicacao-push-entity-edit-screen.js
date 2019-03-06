import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import ComunicacaoPushActions from './comunicacao-push.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { comunicacaoPushEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './comunicacao-push-entity-edit-screen-style'

let Form = t.form.Form
const TipoPessoa = t.enums({
  Macom: 'Macom',
  Dependente: 'Dependente'
})

class ComunicacaoPushEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        titulo: t.maybe(t.String),
        conteudoPush: t.maybe(t.String),
        tipoPessoa: t.maybe(TipoPessoa)
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          titulo: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('conteudoPush').refs.input.focus(),
            testID: 'tituloInput'
          },
          conteudoPush: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('tipoPessoa').refs.input.focus(),
            testID: 'conteudoPushInput'
          },
          tipoPessoa: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'tipoPessoaInput'
          }
        }
      },
      success: false,
      comunicacaoPush: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getComunicacaoPush(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.comunicacaoPush && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.comunicacaoPush)
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
        this.props.getAllComunicacaoPushes({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.comunicacaoPush.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: comunicacaoPushEntityDetailScreen.bind(this, { entityId })
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
      titulo: value.titulo || null,
      conteudoPush: value.conteudoPush || null,
      tipoPessoa: value.tipoPessoa || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      titulo: value.titulo || null,
      conteudoPush: value.conteudoPush || null,
      tipoPessoa: value.tipoPessoa || null
    }
    return entity
  }

  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const comunicacaoPush = this.refs.form.getValue()
    if (comunicacaoPush) { // if validation fails, value will be null
      this.props.updateComunicacaoPush(this.formValueToEntity(comunicacaoPush))
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
    comunicacaoPush: state.comunicacaoPushes.comunicacaoPush,
    fetching: state.comunicacaoPushes.fetchingOne,
    updating: state.comunicacaoPushes.updating,
    error: state.comunicacaoPushes.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getComunicacaoPush: (id) => dispatch(ComunicacaoPushActions.comunicacaoPushRequest(id)),
    getAllComunicacaoPushes: (options) => dispatch(ComunicacaoPushActions.comunicacaoPushAllRequest(options)),
    updateComunicacaoPush: (comunicacaoPush) => dispatch(ComunicacaoPushActions.comunicacaoPushUpdateRequest(comunicacaoPush))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComunicacaoPushEntityEditScreen)
