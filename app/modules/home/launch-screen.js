import React from 'react'
import PropTypes from 'prop-types'
import { Alert, ScrollView, Text, TextInput, Image, View, TouchableOpacity, BackHandler } from 'react-native'
import { Navigation } from 'react-native-navigation'

import FontAwesome, { Icons } from 'react-native-fontawesome';
import { Images, Metrics } from '../../shared/themes'
import styles from './launch-screen.styles'
import { connect } from 'react-redux'
import LoginActions from '../login/login.reducer'
import Icon from 'react-native-vector-icons/FontAwesome';

class LaunchScreen extends React.Component {
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

  hideSideMenu () {
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          visible: false
        }
      }
    })
  }

  showSideMenu () {
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          visible: true
        }
      }
    })
  }

  componentWillReceiveProps (newProps) {
    // Did the login attempt complete?
    if (!newProps.fetching) {
      if (newProps.error) {
        if (newProps.error === 'WRONG') {
          Alert.alert('Erro', 'Login Inválido', [{text: 'OK'}])
        }
      } else if (newProps.account) {
        console.log("ok")
        this.showSideMenu()
        //Alert.alert('Sucesso', 'Login Correto', [{text: 'OK'}])
        //Navigation.dismissModal(this.props.componentId)
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
    //Navigation.dismissModal(this.props.componentId)
  }

  handleChangeUsername = (text) => {
    this.setState({ username: text })
  }

  handleChangePassword = (text) => {
    this.setState({ password: text })
  }

  componentDidMount () {

    BackHandler.addEventListener('hardwareBackPress', () => {
      this.hideSideMenu()
    })
  }

  componentDidAppear () {
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          enabled: true
        }
      }
    })
  }
  showSideMenu () {
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          visible: true
        }
      }
    })
  }

  navigationButtonPressed ({ buttonId }) {
    this.showSideMenu()
  }

  render () {
    const { username, password } = this.state
    const { fetching } = this.props
    const editable = !fetching
    const textInputStyle = editable ? styles.textInput : styles.textInputReadonly
    return (
      <View style={styles.mainContainer} testID='launchScreen'>
        <Image style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.logoCmt} style={styles.logo} />
          </View>

          <View style={styles.section} >
            <Text style={styles.loginText}>
              {'Seja Bem-vindo ao App do CMT!'}
            </Text>
          </View>
        <View style={styles.form}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Usuário</Text>
            <TextInput
              ref='username'
              testID='loginScreenUsername'
              style={textInputStyle}
              value={username}
              editable={editable}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.handleChangeUsername}
              underlineColorAndroid='transparent'
              onSubmitEditing={() => this.refs.password.focus()}
              placeholder='Digite seu Usuário' />
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Senha</Text>
            <TextInput
              ref='password'
              testID='loginScreenPassword'
              style={textInputStyle}
              value={password}
              editable={editable}
              keyboardType='default'
              returnKeyType='go'
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry
              onChangeText={this.handleChangePassword}
              underlineColorAndroid='transparent'
              onSubmitEditing={this.handlePressLogin}
              placeholder='Digite sua Senha' />
          </View>

          <View style={[styles.loginRow]}>
            <TouchableOpacity testID='loginScreenLoginButton' style={styles.loginButtonWrapper} onPress={this.handlePressLogin}>
              <View style={styles.loginButton}>
                <Text style={styles.loginText}>Entrar</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        </ScrollView>
      </View>





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

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)

