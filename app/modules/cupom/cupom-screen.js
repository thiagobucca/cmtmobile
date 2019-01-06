import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Image, View, ScrollView, Text, TextInput, TouchableOpacity, SectionList } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'

import styles from './cupom-screen.styles'
import { Images, Metrics } from '../../shared/themes'
import LoginActions from '../login/login.reducer'

import TextInputMask from 'react-native-text-input-mask';

class CupomScreen extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    attemptLogin: PropTypes.func
  }

  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      username: '',
      password: '',
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth }
    }
  }

  componentWillReceiveProps (newProps) {
    // Did the login attempt complete?
    if (!newProps.fetching) {
      if (newProps.error) {
        if (newProps.error === 'WRONG') {
          Alert.alert('Error', 'Invalid login', [{text: 'OK'}])
        }
      } else if (newProps.account) {
        Navigation.dismissModal(this.props.componentId)
      }
    }
  }

  handlePressLogin = () => {
    const { username, password } = this.state
    // attempt a login - a saga is listening to pick it up from here.
    this.props.attemptLogin(username, password)
  }
  handlePressCancel = () => {
    this.props.logout()
    Navigation.dismissModal(this.props.componentId)
  }

  handleChangeUsername = (text) => {
    this.setState({ username: text })
  }

  handleChangePassword = (text) => {
    this.setState({ password: text })
  }

  render () {
    const { username, password } = this.state
    const { fetching } = this.props
    const editable = !fetching
    const textInputStyle = editable ? styles.textInput : styles.textInputReadonly
    return (
      <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[styles.container, {height: this.state.visibleHeight}]} keyboardShouldPersistTaps='always'>
        <Image source={Images.logoLogin} style={[styles.topLogo, this.state.topLogo]} />
        <View style={styles.form}>

        <View style={styles.row}>
            <Text style={styles.rowLabel}>Data</Text>
            <TextInputMask
  refInput={ref => { this.input = ref }}
  placeholder='Insira a Data do Cupom'
  onChangeText={(formatted, extracted) => {
    console.log(formatted) // +1 (123) 456-78-90
    console.log(extracted) // 1234567890
  }}
  mask={"[00]/[00]/[0000]"}
/>


          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Valor</Text>
            <TextInputMask
  refInput={ref => { this.input = ref }}
  placeholder='Insira o Valor do Cupom'
  onChangeText={(formatted, extracted) => {
    console.log(formatted) // +1 (123) 456-78-90
    console.log(extracted) // 1234567890
  }}
  mask={"R$[0000].[00]"}
/>


          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Número</Text>
            <TextInputMask
  refInput={ref => { this.input = ref }}
  placeholder='Insira o Número do Cupom'
  onChangeText={(formatted, extracted) => {
    console.log(formatted) // +1 (123) 456-78-90
    console.log(extracted) // 1234567890
  }}
  mask={"[00000000]"}
/>


          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Foto</Text>
            <View style={styles.loginButton}>
                <Text style={styles.loginText}>Foto Cupom</Text>
              </View>


          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Estabelecimento Comercial</Text>
            <SectionList
  renderItem={({item, index, section}) => <Text key={index}>{item}</Text>}
  renderSectionHeader={({section: {title}}) => (
    <Text style={{fontWeight: 'bold'}}>{title}</Text>
  )}
  sections={[
    {data: ['Loja1', 'Loja2']}
  ]}
  keyExtractor={(item, index) => item + index}
/>


          </View>

          <View style={[styles.loginRow]}>
            <TouchableOpacity testID='loginScreenLoginButton' style={styles.loginButtonWrapper} onPress={this.handlePressLogin}>
              <View style={styles.loginButton}>
                <Text style={styles.loginText}>Salvar Cupom</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity testID='loginScreenCancelButton' style={styles.loginButtonWrapper} onPress={this.handlePressCancel}>
              <View style={styles.loginButton}>
                <Text style={styles.loginText}>Cancelar</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account.account,
    fetching: state.login.fetching,
    error: state.login.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password)),
    logout: () => dispatch(LoginActions.logoutRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CupomScreen)
