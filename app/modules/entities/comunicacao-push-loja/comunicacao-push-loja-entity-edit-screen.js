import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import ComunicacaoPushLojaActions from './comunicacao-push-loja.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { comunicacaoPushLojaEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './comunicacao-push-loja-entity-edit-screen-style'

let Form = t.form.Form

class ComunicacaoPushLojaEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        comunicacaoPushId: t.maybe(t.Number),
        lojaMaconicaId: t.maybe(t.Number)
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          comunicacaoPushId: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('lojaMaconicaId').refs.input.focus(),
            testID: 'comunicacaoPushIdInput'
          },
          lojaMaconicaId: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'lojaMaconicaIdInput'
          }
        }
      },
      success: false,
      comunicacaoPushLoja: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getComunicacaoPushLoja(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.comunicacaoPushLoja && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.comunicacaoPushLoja)
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
        this.props.getAllComunicacaoPushLojas({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.comunicacaoPushLoja.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: comunicacaoPushLojaEntityDetailScreen.bind(this, { entityId })
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
      comunicacaoPushId: value.comunicacaoPushId || null,
      lojaMaconicaId: value.lojaMaconicaId || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      comunicacaoPushId: value.comunicacaoPushId || null,
      lojaMaconicaId: value.lojaMaconicaId || null
    }
    return entity
  }

  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const comunicacaoPushLoja = this.refs.form.getValue()
    if (comunicacaoPushLoja) { // if validation fails, value will be null
      this.props.updateComunicacaoPushLoja(this.formValueToEntity(comunicacaoPushLoja))
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
    comunicacaoPushLoja: state.comunicacaoPushLojas.comunicacaoPushLoja,
    fetching: state.comunicacaoPushLojas.fetchingOne,
    updating: state.comunicacaoPushLojas.updating,
    error: state.comunicacaoPushLojas.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getComunicacaoPushLoja: (id) => dispatch(ComunicacaoPushLojaActions.comunicacaoPushLojaRequest(id)),
    getAllComunicacaoPushLojas: (options) => dispatch(ComunicacaoPushLojaActions.comunicacaoPushLojaAllRequest(options)),
    updateComunicacaoPushLoja: (comunicacaoPushLoja) => dispatch(ComunicacaoPushLojaActions.comunicacaoPushLojaUpdateRequest(comunicacaoPushLoja))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComunicacaoPushLojaEntityEditScreen)
