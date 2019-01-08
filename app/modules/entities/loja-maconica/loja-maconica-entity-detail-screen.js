import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { lojaMaconicaEntityEditScreen } from '../../../navigation/layouts'

import LojaMaconicaActions from './loja-maconica.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './loja-maconica-entity-detail-screen-style'

class LojaMaconicaEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      lojaMaconica: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getLojaMaconica(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.lojaMaconica) {
      this.setState({ lojaMaconica: newProps.lojaMaconica })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllLojaMaconicas()
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
      'Delete LojaMaconica?',
      'Are you sure you want to delete the LojaMaconica?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteLojaMaconica(this.props.data.entityId)
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
        <Text>ID: {this.state.lojaMaconica.id}</Text>
        <Text testID='codCnpj'>CodCnpj: {this.state.lojaMaconica.codCnpj}</Text>
        <Text testID='nome'>Nome: {this.state.lojaMaconica.nome}</Text>
        <Text testID='endereco'>Endereco: {this.state.lojaMaconica.endereco}</Text>
        <Text testID='telefone'>Telefone: {this.state.lojaMaconica.telefone}</Text>
        <Text testID='numero'>Numero: {this.state.lojaMaconica.numero}</Text>
        <Text testID='bolAtivo'>BolAtivo: {this.state.lojaMaconica.bolAtivo}</Text>
        <RoundedButton text='Edit' onPress={lojaMaconicaEntityEditScreen.bind(this, { entityId: this.state.lojaMaconica.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    lojaMaconica: state.lojaMaconicas.lojaMaconica,
    deleting: state.lojaMaconicas.deleting,
    errorDeleting: state.lojaMaconicas.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getLojaMaconica: (id) => dispatch(LojaMaconicaActions.lojaMaconicaRequest(id)),
    getAllLojaMaconicas: (options) => dispatch(LojaMaconicaActions.lojaMaconicaAllRequest(options)),
    deleteLojaMaconica: (id) => dispatch(LojaMaconicaActions.lojaMaconicaDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LojaMaconicaEntityDetailScreen)
