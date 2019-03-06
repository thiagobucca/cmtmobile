import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import TipoOperacaoActions from './tipo-operacao.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { tipoOperacaoEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './tipo-operacao-entity-edit-screen-style'

let Form = t.form.Form
const TipoLancamento = t.enums({
  Credito: 'Credito',
  Debito: 'Debito'
})

class TipoOperacaoEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        nomeOperacao: t.maybe(t.String),
        tipoLancamento: t.maybe(TipoLancamento),
        bolAtivo: t.maybe(t.Boolean)
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          nomeOperacao: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('tipoLancamento').refs.input.focus(),
            testID: 'nomeOperacaoInput'
          },
          tipoLancamento: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('bolAtivo').refs.input.focus(),
            testID: 'tipoLancamentoInput'
          },
          bolAtivo: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'bolAtivoInput'
          }
        }
      },
      success: false,
      tipoOperacao: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getTipoOperacao(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.tipoOperacao && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.tipoOperacao)
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
        this.props.getAllTipoOperacaos({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.tipoOperacao.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: tipoOperacaoEntityDetailScreen.bind(this, { entityId })
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
      nomeOperacao: value.nomeOperacao || null,
      tipoLancamento: value.tipoLancamento || null,
      bolAtivo: value.bolAtivo || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      nomeOperacao: value.nomeOperacao || null,
      tipoLancamento: value.tipoLancamento || null,
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
    const tipoOperacao = this.refs.form.getValue()
    if (tipoOperacao) { // if validation fails, value will be null
      this.props.updateTipoOperacao(this.formValueToEntity(tipoOperacao))
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
    tipoOperacao: state.tipoOperacaos.tipoOperacao,
    fetching: state.tipoOperacaos.fetchingOne,
    updating: state.tipoOperacaos.updating,
    error: state.tipoOperacaos.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTipoOperacao: (id) => dispatch(TipoOperacaoActions.tipoOperacaoRequest(id)),
    getAllTipoOperacaos: (options) => dispatch(TipoOperacaoActions.tipoOperacaoAllRequest(options)),
    updateTipoOperacao: (tipoOperacao) => dispatch(TipoOperacaoActions.tipoOperacaoUpdateRequest(tipoOperacao))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TipoOperacaoEntityEditScreen)
