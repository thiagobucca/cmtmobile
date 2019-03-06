import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import ContasPagarReceberActions from './contas-pagar-receber.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { contasPagarReceberEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './contas-pagar-receber-entity-edit-screen-style'

let Form = t.form.Form
const StatusLancamento = t.enums({
  Aberto: 'Aberto',
  Baixado: 'Baixado'
})

class ContasPagarReceberEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        data: t.maybe(t.Date),
        valor: t.maybe(t.Number),
        statusLancamento: t.maybe(StatusLancamento),
        usuarioId: t.maybe(t.Number),
        lojaMaconicaId: t.maybe(t.Number),
        estabelecimentoComercialId: t.maybe(t.Number),
        tipoOperacaoId: t.maybe(t.Number)
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          data: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('valor').refs.input.focus(),
            testID: 'dataInput'
          },
          valor: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('statusLancamento').refs.input.focus(),
            testID: 'valorInput'
          },
          statusLancamento: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('usuarioId').refs.input.focus(),
            testID: 'statusLancamentoInput'
          },
          usuarioId: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('lojaMaconicaId').refs.input.focus(),
            testID: 'usuarioIdInput'
          },
          lojaMaconicaId: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('estabelecimentoComercialId').refs.input.focus(),
            testID: 'lojaMaconicaIdInput'
          },
          estabelecimentoComercialId: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('tipoOperacaoId').refs.input.focus(),
            testID: 'estabelecimentoComercialIdInput'
          },
          tipoOperacaoId: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'tipoOperacaoIdInput'
          }
        }
      },
      success: false,
      contasPagarReceber: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getContasPagarReceber(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.contasPagarReceber && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.contasPagarReceber)
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
        this.props.getAllContasPagarRecebers({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.contasPagarReceber.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: contasPagarReceberEntityDetailScreen.bind(this, { entityId })
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
      data: value.data || null,
      valor: value.valor || null,
      statusLancamento: value.statusLancamento || null,
      usuarioId: value.usuarioId || null,
      lojaMaconicaId: value.lojaMaconicaId || null,
      estabelecimentoComercialId: value.estabelecimentoComercialId || null,
      tipoOperacaoId: value.tipoOperacaoId || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      data: value.data || null,
      valor: value.valor || null,
      statusLancamento: value.statusLancamento || null,
      usuarioId: value.usuarioId || null,
      lojaMaconicaId: value.lojaMaconicaId || null,
      estabelecimentoComercialId: value.estabelecimentoComercialId || null,
      tipoOperacaoId: value.tipoOperacaoId || null
    }
    return entity
  }

  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const contasPagarReceber = this.refs.form.getValue()
    if (contasPagarReceber) { // if validation fails, value will be null
      this.props.updateContasPagarReceber(this.formValueToEntity(contasPagarReceber))
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
    contasPagarReceber: state.contasPagarRecebers.contasPagarReceber,
    fetching: state.contasPagarRecebers.fetchingOne,
    updating: state.contasPagarRecebers.updating,
    error: state.contasPagarRecebers.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getContasPagarReceber: (id) => dispatch(ContasPagarReceberActions.contasPagarReceberRequest(id)),
    getAllContasPagarRecebers: (options) => dispatch(ContasPagarReceberActions.contasPagarReceberAllRequest(options)),
    updateContasPagarReceber: (contasPagarReceber) => dispatch(ContasPagarReceberActions.contasPagarReceberUpdateRequest(contasPagarReceber))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContasPagarReceberEntityEditScreen)
