import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import AgendaEventoActions from './agenda-eventos.reducer'
import LojaMaconicaActions from '../loja-maconica/loja-maconica.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { agendaEventoEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './agenda-eventos-entity-edit-screen-style'

let Form = t.form.Form

class AgendaEventoEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        titulo: t.maybe(t.String),
        data: t.maybe(t.Date),
        local: t.maybe(t.String),
        descricao: t.maybe(t.String),
        bolAtivo: t.maybe(t.Boolean),
        lojaMaconicaId: this.getLojaMaconicas()
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          lojaMaconicaId: {
            testID: 'lojaMaconicaIdInput',
            label: 'LojaMaconica'
          },
          titulo: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('data').refs.input.focus(),
            testID: 'tituloInput'
          },
          data: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('local').refs.input.focus(),
            testID: 'dataInput'
          },
          local: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('descricao').refs.input.focus(),
            testID: 'localInput'
          },
          descricao: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('bolAtivo').refs.input.focus(),
            testID: 'descricaoInput'
          },
          bolAtivo: {
            testID: 'bolAtivoInput'
          }
        }
      },
      success: false,
      agendaEvento: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getAgendaEvento(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
    this.props.getAllLojaMaconicas()
  }

  componentWillReceiveProps (newProps) {
    console.log("logando props")
    console.log(newProps)
    if (newProps.agendaEvento && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.agendaEvento)
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
        this.props.getAllAgendaEventos({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.agendaEvento.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: agendaEventoEntityDetailScreen.bind(this, { entityId })
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
      data: value.data || null,
      local: value.local || null,
      descricao: value.descricao || null,
      bolAtivo: value.bolAtivo || null,
      lojaMaconicaId: (value.lojaMaconica && value.lojaMaconica.id) ? value.lojaMaconica.id : null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      titulo: value.titulo || null,
      data: value.data || null,
      local: value.local || null,
      descricao: value.descricao || null,
      bolAtivo: value.bolAtivo || null
    }
    if (value.lojaMaconicaId) {
      entity.lojaMaconica = { id: value.lojaMaconicaId }
    }
    return entity
  }

  getLojaMaconicas = () => {
    const lojaMaconicas = {}
    this.props.lojaMaconicas.forEach(lojaMaconica => {
      lojaMaconicas[lojaMaconica.id] = lojaMaconica.id ? lojaMaconica.id.toString() : lojaMaconica.id.toString()
    })
    return t.maybe(t.enums(lojaMaconicas))
  }
  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const agendaEvento = this.refs.form.getValue()
    if (agendaEvento) { // if validation fails, value will be null
      this.props.updateAgendaEvento(this.formValueToEntity(agendaEvento))
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
    lojaMaconicas: state.lojaMaconicas.lojaMaconicas || [],
    agendaEvento: state.agendaEventos.agendaEvento,
    fetching: state.agendaEventos.fetchingOne,
    updating: state.agendaEventos.updating,
    error: state.agendaEventos.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllLojaMaconicas: (options) => dispatch(LojaMaconicaActions.lojaMaconicaAllRequest(options)),
    getAgendaEvento: (id) => dispatch(AgendaEventoActions.agendaEventoRequest(id)),
    getAllAgendaEventos: (options) => dispatch(AgendaEventoActions.agendaEventoAllRequest(options)),
    updateAgendaEvento: (agendaEvento) => dispatch(AgendaEventoActions.agendaEventoUpdateRequest(agendaEvento))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaEventoEntityEditScreen)
