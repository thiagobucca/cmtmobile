import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import ParametrizacaoActions from './parametrizacao.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { parametrizacaoEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './parametrizacao-entity-edit-screen-style'

let Form = t.form.Form

class ParametrizacaoEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        diaCobrancaConvenio: t.maybe(t.Number),
        diaPagamentoLoja: t.maybe(t.Number)
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          diaCobrancaConvenio: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('diaPagamentoLoja').refs.input.focus(),
            testID: 'diaCobrancaConvenioInput'
          },
          diaPagamentoLoja: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'diaPagamentoLojaInput'
          }
        }
      },
      success: false,
      parametrizacao: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getParametrizacao(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.parametrizacao && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.parametrizacao)
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
        this.props.getAllParametrizacaos({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.parametrizacao.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: parametrizacaoEntityDetailScreen.bind(this, { entityId })
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
      diaCobrancaConvenio: value.diaCobrancaConvenio || null,
      diaPagamentoLoja: value.diaPagamentoLoja || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      diaCobrancaConvenio: value.diaCobrancaConvenio || null,
      diaPagamentoLoja: value.diaPagamentoLoja || null
    }
    return entity
  }

  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const parametrizacao = this.refs.form.getValue()
    if (parametrizacao) { // if validation fails, value will be null
      this.props.updateParametrizacao(this.formValueToEntity(parametrizacao))
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
    parametrizacao: state.parametrizacaos.parametrizacao,
    fetching: state.parametrizacaos.fetchingOne,
    updating: state.parametrizacaos.updating,
    error: state.parametrizacaos.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getParametrizacao: (id) => dispatch(ParametrizacaoActions.parametrizacaoRequest(id)),
    getAllParametrizacaos: (options) => dispatch(ParametrizacaoActions.parametrizacaoAllRequest(options)),
    updateParametrizacao: (parametrizacao) => dispatch(ParametrizacaoActions.parametrizacaoUpdateRequest(parametrizacao))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParametrizacaoEntityEditScreen)
