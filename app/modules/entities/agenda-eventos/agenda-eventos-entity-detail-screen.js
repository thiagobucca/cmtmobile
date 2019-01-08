import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { agendaEventoEntityEditScreen } from '../../../navigation/layouts'

import AgendaEventoActions from './agenda-eventos.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './agenda-eventos-entity-detail-screen-style'

class AgendaEventoEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      agendaEvento: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getAgendaEvento(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.agendaEvento) {
      this.setState({ agendaEvento: newProps.agendaEvento })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllAgendaEventos()
        Navigation.pop(this.props.componentId)
      } else {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{text: 'OK'}])
        this.setState({
          success: false,
          requesting: false
        })
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete AgendaEvento?',
      'Are you sure you want to delete the AgendaEvento?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteAgendaEvento(this.props.data.entityId)
            })
          }
        }
      ],
      { cancelable: false }
    )
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Text>ID: {this.state.agendaEvento.id}</Text>
        <Text testID='titulo'>Titulo: {this.state.agendaEvento.titulo}</Text>
        <Text testID='data'>Data: {this.state.agendaEvento.data}</Text>
        <Text testID='local'>Local: {this.state.agendaEvento.local}</Text>
        <Text testID='descricao'>Descricao: {this.state.agendaEvento.descricao}</Text>
        <Text testID='bolAtivo'>BolAtivo: {this.state.agendaEvento.bolAtivo}</Text>
        <RoundedButton text='Edit' onPress={agendaEventoEntityEditScreen.bind(this, { entityId: this.state.agendaEvento.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    agendaEvento: state.agendaEventos.agendaEvento,
    deleting: state.agendaEventos.deleting,
    errorDeleting: state.agendaEventos.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAgendaEvento: (id) => dispatch(AgendaEventoActions.agendaEventoRequest(id)),
    getAllAgendaEventos: (options) => dispatch(AgendaEventoActions.agendaEventoAllRequest(options)),
    deleteAgendaEvento: (id) => dispatch(AgendaEventoActions.agendaEventoDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaEventoEntityDetailScreen)
