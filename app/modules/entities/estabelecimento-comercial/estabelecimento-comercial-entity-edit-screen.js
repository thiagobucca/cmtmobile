import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import EstabelecimentoComercialActions from './estabelecimento-comercial.reducer'
import CategoriaEstabelecimentoActions from '../categoria-estabelecimento/categoria-estabelecimento.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { estabelecimentoComercialEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './estabelecimento-comercial-entity-edit-screen-style'

let Form = t.form.Form

class EstabelecimentoComercialEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        bolMatriz: t.maybe(t.Boolean),
        codCnpj: t.maybe(t.String),
        nome: t.maybe(t.String),
        endereco: t.maybe(t.String),
        telefone: t.maybe(t.String),
        logo: t.maybe(t.String),
        taxaConvenio: t.maybe(t.Number),
        bolAtivo: t.maybe(t.Boolean),
        categoriaEstabelecimentoId: this.getCategoriaEstabelecimentos(),
        estabelecimentoComercialId: this.getEstabelecimentoComercials()
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          categoriaEstabelecimentoId: {
            testID: 'categoriaEstabelecimentoIdInput',
            label: 'Categoria'
          },
          estabelecimentoComercialId: {
            testID: 'estabelecimentoComercialIdInput',
            label: 'Matriz'
          },
          bolMatriz: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('codCnpj').refs.input.focus(),
            testID: 'bolMatrizInput'
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
            onSubmitEditing: () => this.refs.form.getComponent('logo').refs.input.focus(),
            testID: 'telefoneInput'
          },
          logo: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('taxaConvenio').refs.input.focus(),
            testID: 'logoInput'
          },
          taxaConvenio: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('bolAtivo').refs.input.focus(),
            testID: 'taxaConvenioInput'
          },
          bolAtivo: {
            testID: 'bolAtivoInput'
          }
        }
      },
      success: false,
      estabelecimentoComercial: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getEstabelecimentoComercial(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
    this.props.getAllCategoriaEstabelecimentos()
    this.props.getAllEstabelecimentoComercials()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.estabelecimentoComercial && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.estabelecimentoComercial)
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
        this.props.getAllEstabelecimentoComercials({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.estabelecimentoComercial.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: estabelecimentoComercialEntityDetailScreen.bind(this, { entityId })
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
      bolMatriz: value.bolMatriz || null,
      codCnpj: value.codCnpj || null,
      nome: value.nome || null,
      endereco: value.endereco || null,
      telefone: value.telefone || null,
      logo: value.logo || null,
      taxaConvenio: value.taxaConvenio || null,
      bolAtivo: value.bolAtivo || null,
      categoriaEstabelecimentoId: (value.categoriaEstabelecimento && value.categoriaEstabelecimento.id) ? value.categoriaEstabelecimento.id : null,
      estabelecimentoComercialId: (value.estabelecimentoComercial && value.estabelecimentoComercial.id) ? value.estabelecimentoComercial.id : null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      bolMatriz: value.bolMatriz || null,
      codCnpj: value.codCnpj || null,
      nome: value.nome || null,
      endereco: value.endereco || null,
      telefone: value.telefone || null,
      logo: value.logo || null,
      taxaConvenio: value.taxaConvenio || null,
      bolAtivo: value.bolAtivo || null
    }
    if (value.categoriaEstabelecimentoId) {
      entity.categoriaEstabelecimento = { id: value.categoriaEstabelecimentoId }
    }
    if (value.estabelecimentoComercialId) {
      entity.estabelecimentoComercial = { id: value.estabelecimentoComercialId }
    }
    return entity
  }

  getCategoriaEstabelecimentos = () => {
    const categoriaEstabelecimentos = {}
    this.props.categoriaEstabelecimentos.forEach(categoriaEstabelecimento => {
      categoriaEstabelecimentos[categoriaEstabelecimento.id] = categoriaEstabelecimento.id ? categoriaEstabelecimento.id.toString() : categoriaEstabelecimento.id.toString()
    })
    return t.maybe(t.enums(categoriaEstabelecimentos))
  }
  getEstabelecimentoComercials = () => {
    const estabelecimentoComercials = {}
    this.props.estabelecimentoComercials.forEach(estabelecimentoComercial => {
      estabelecimentoComercials[estabelecimentoComercial.id] = estabelecimentoComercial.id ? estabelecimentoComercial.id.toString() : estabelecimentoComercial.id.toString()
    })
    return t.maybe(t.enums(estabelecimentoComercials))
  }
  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const estabelecimentoComercial = this.refs.form.getValue()
    debugger;
    if (estabelecimentoComercial) { // if validation fails, value will be null
      this.props.updateEstabelecimentoComercial(this.formValueToEntity(estabelecimentoComercial))
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
    categoriaEstabelecimentos: state.categoriaEstabelecimentos.categoriaEstabelecimentos || [],
    estabelecimentoComercials: state.estabelecimentoComercials.estabelecimentoComercials || [],
    estabelecimentoComercial: state.estabelecimentoComercials.estabelecimentoComercial,
    fetching: state.estabelecimentoComercials.fetchingOne,
    updating: state.estabelecimentoComercials.updating,
    error: state.estabelecimentoComercials.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCategoriaEstabelecimentos: (options) => dispatch(CategoriaEstabelecimentoActions.categoriaEstabelecimentoAllRequest(options)),
    getEstabelecimentoComercial: (id) => dispatch(EstabelecimentoComercialActions.estabelecimentoComercialRequest(id)),
    getAllEstabelecimentoComercials: (options) => dispatch(EstabelecimentoComercialActions.estabelecimentoComercialAllRequest(options)),
    updateEstabelecimentoComercial: (estabelecimentoComercial) => dispatch(EstabelecimentoComercialActions.estabelecimentoComercialUpdateRequest(estabelecimentoComercial))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EstabelecimentoComercialEntityEditScreen)
