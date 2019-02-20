import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { estabelecimentoComercialEntityEditScreen } from '../../../navigation/layouts'

import EstabelecimentoComercialActions from './estabelecimento-comercial.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './estabelecimento-comercial-entity-detail-screen-style'
// import OneSignal from 'react-native-onesignal';

class EstabelecimentoComercialEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      estabelecimentoComercial: {},
      deleting: false
    }
    // OneSignal.init("7585cd39-1585-4551-b020-c53000678f4b");

    // OneSignal.addEventListener('received', this.onReceived);
    // OneSignal.addEventListener('opened', this.onOpened);
    // OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillMount () {
    this.props.getEstabelecimentoComercial(this.props.data.entityId)
  }

  componentWillUnmount() {
    // OneSignal.removeEventListener('received', this.onReceived);
    // OneSignal.removeEventListener('opened', this.onOpened);
    // OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  componentWillReceiveProps (newProps) {
    if (newProps.estabelecimentoComercial) {
      this.setState({ estabelecimentoComercial: newProps.estabelecimentoComercial })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllEstabelecimentoComercials()
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
      'Delete EstabelecimentoComercial?',
      'Are you sure you want to delete the EstabelecimentoComercial?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteEstabelecimentoComercial(this.props.data.entityId)
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

        <Text>ID: {this.state.estabelecimentoComercial.id}</Text>
        <Text testID='bolMatriz'>BolMatriz: {this.state.estabelecimentoComercial.bolMatriz}</Text>
        <Text testID='codCnpj'>CodCnpj: {this.state.estabelecimentoComercial.codCnpj}</Text>
        <Text testID='nome'>Nome: {this.state.estabelecimentoComercial.nome}</Text>
        <Text testID='endereco'>Endereco: {this.state.estabelecimentoComercial.endereco}</Text>
        <Text testID='telefone'>Telefone: {this.state.estabelecimentoComercial.telefone}</Text>
        <Text testID='logo'>Logo: {this.state.estabelecimentoComercial.logo}</Text>
        <Text testID='taxaConvenio'>TaxaConvenio: {this.state.estabelecimentoComercial.taxaConvenio}</Text>
        <Text testID='bolAtivo'>BolAtivo: {this.state.estabelecimentoComercial.bolAtivo}</Text>
        <RoundedButton text='Edit' onPress={estabelecimentoComercialEntityEditScreen.bind(this, { entityId: this.state.estabelecimentoComercial.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    estabelecimentoComercial: state.estabelecimentoComercials.estabelecimentoComercial,
    deleting: state.estabelecimentoComercials.deleting,
    errorDeleting: state.estabelecimentoComercials.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getEstabelecimentoComercial: (id) => dispatch(EstabelecimentoComercialActions.estabelecimentoComercialRequest(id)),
    getAllEstabelecimentoComercials: (options) => dispatch(EstabelecimentoComercialActions.estabelecimentoComercialAllRequest(options)),
    deleteEstabelecimentoComercial: (id) => dispatch(EstabelecimentoComercialActions.estabelecimentoComercialDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EstabelecimentoComercialEntityDetailScreen)
