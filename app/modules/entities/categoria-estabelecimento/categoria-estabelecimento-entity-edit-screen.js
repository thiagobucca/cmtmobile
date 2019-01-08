import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import CategoriaEstabelecimentoActions from './categoria-estabelecimento.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { categoriaEstabelecimentoEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './categoria-estabelecimento-entity-edit-screen-style'

let Form = t.form.Form

class CategoriaEstabelecimentoEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        nome: t.maybe(t.String),
        bolAtivo: t.maybe(t.Boolean)
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          nome: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('bolAtivo').refs.input.focus(),
            testID: 'nomeInput'
          },
          bolAtivo: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'bolAtivoInput'
          }
        }
      },
      success: false,
      categoriaEstabelecimento: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getCategoriaEstabelecimento(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.categoriaEstabelecimento && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.categoriaEstabelecimento)
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
        this.props.getAllCategoriaEstabelecimentos({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.categoriaEstabelecimento.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: categoriaEstabelecimentoEntityDetailScreen.bind(this, { entityId })
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
      bolAtivo: value.bolAtivo || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      nome: value.nome || null,
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
    const categoriaEstabelecimento = this.refs.form.getValue()
    if (categoriaEstabelecimento) { // if validation fails, value will be null
      this.props.updateCategoriaEstabelecimento(this.formValueToEntity(categoriaEstabelecimento))
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
    categoriaEstabelecimento: state.categoriaEstabelecimentos.categoriaEstabelecimento,
    fetching: state.categoriaEstabelecimentos.fetchingOne,
    updating: state.categoriaEstabelecimentos.updating,
    error: state.categoriaEstabelecimentos.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoriaEstabelecimento: (id) => dispatch(CategoriaEstabelecimentoActions.categoriaEstabelecimentoRequest(id)),
    getAllCategoriaEstabelecimentos: (options) => dispatch(CategoriaEstabelecimentoActions.categoriaEstabelecimentoAllRequest(options)),
    updateCategoriaEstabelecimento: (categoriaEstabelecimento) => dispatch(CategoriaEstabelecimentoActions.categoriaEstabelecimentoUpdateRequest(categoriaEstabelecimento))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriaEstabelecimentoEntityEditScreen)
