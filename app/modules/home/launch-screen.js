import React from 'react'
import PropTypes from 'prop-types'
import { Alert, ScrollView, Text, TextInput, Image, View, TouchableOpacity, BackHandler, Animated, TouchableHighlight } from 'react-native'
import { Navigation } from 'react-native-navigation'

import { Images, Metrics } from '../../shared/themes'
import styles from './launch-screen.styles'
import { connect } from 'react-redux'
import LoginActions from '../login/login.reducer'
import AccountActions from '../../shared/reducers/account.reducer'
import OneSignal from 'react-native-onesignal'
import { registerScreen, forgotPasswordScreen, cupomEntityEditScreen, comunicacaoPushEntityScreen } from '../../navigation/layouts'


class LaunchScreen extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    attemptLogin: PropTypes.func
  }

  constructor (props) {
    super(props)
    OneSignal.init("1ee29f2c-4652-4629-ab1e-1d016cfad22e")
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.configure();
    Navigation.events().bindComponent(this)
    this.state = {
      username: '',
      password: '',
      deviceId: '',
      account:{...this.props.account} ,
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth },
      shift: new Animated.Value(0)
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

  componentWillMount()
  {
    //  console.log("state mount",this.state)
    //  console.log("props mount",this.props)
  }

  componentWillReceiveProps (newProps) {
    // Did the login attempt complete?
    if (!newProps.fetching) {
      if (newProps.error) {
        if (newProps.error === 'WRONG') {
          Alert.alert('Erro', 'Login Inválido', [{text: 'OK'}])

        }
      } else if (newProps.account) {

        if(this.state.deviceId != '' && this.state.deviceId != newProps.account.deviceId)
        {
          this.props.updateAccount({...newProps.account,deviceId : this.state.deviceId})
        }
        //this.showSideMenu()
        //Alert.alert('Sucesso', 'Login Correto', [{text: 'OK'}])
        //Navigation.dismissModal(this.props.componentId)
        this.setState({ password: '', username: '' })

      }
    }
  }


 handlePressLogin = () => {
  const { username, password } = this.state

  if (username === '') {
    Alert.alert('Erro', 'Usuário não informado.', [{text: 'OK'}])
    return

  }

  if (password === '') {
    Alert.alert('Erro', 'Senha não informada.', [{text: 'OK'}])
    return
  }

  this.props.attemptLogin(username, password)
}


  handlePressCupom = () => {

    cupomEntityEditScreen({entityId: null})
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

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);

    // if(this.state != null)
    // {
    //   Alert.alert('Erro', 'State criado', [{text: 'OK'}])
    //   Alert.alert('Erro', this.state, [{text: 'OK'}])
    // }else
    // {
    //   Alert.alert('Erro', 'State naocriado', [{text: 'OK'}])
    // }

    // if(this.props != null)
    // {
    //   Alert.alert('Erro', 'Prop criado', [{text: 'OK'}])
    //   Alert.alert('Erro', this.props, [{text: 'OK'}])
    // }else
    // {
    //   Alert.alert('Erro', 'Prop nao criado', [{text: 'OK'}])
    // }

    // if(this.state.account != null && this.state.account.login != '')
    // {
      comunicacaoPushEntityScreen()
    // }
  }

  onIds = (device) => {

     console.log('Device info: ', device.userId);
     this.setState({
      deviceId : device.userId
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

  displayCupom()
  {
    if (!this.props.account) {
      return <Text></Text>;
  } else {
      return              <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.handlePressCupom}  >
      <Text style={styles.loginText}>Cadastrar Cupom</Text>
    </TouchableHighlight>

  }
  }

  displayWelcome() {
    if (!this.props.account) {
        return <Text></Text>;
    } else {
        return         <View style={[styles.buttonContainer]}>
        <Text style={styles.topText}>Olá, {this.props.account.firstName}</Text>
    </View>


    }
}

displayStore() {
  if (!this.props.account) {
      return <Text></Text>;
  } else {
      return         <View style={[styles.storeContainer]}>
      <Text style={styles.topText}>Loja: {this.props.account.loja}</Text>
  </View>


  }
}

displayPlacet() {
  if (!this.props.account) {
      return <Text></Text>;
  } else {
      return      <View style={[styles.buttonContainer]}>
      <Text style={styles.placetText}>Placet: {this.props.account.placet}</Text>
  </View>

  }
}

  displayForgotPassword() {
    if (this.props.account) {
        return <Text></Text>;
    } else {
        return         <TouchableHighlight style={[styles.buttonContainer]} onPress={this.handlePressForgotPassword}>
        <Text style={styles.loginText}>Esqueci minha senha</Text>
    </TouchableHighlight>


    }
}

displayRegister() {
  if (this.props.account) {
      return <Text></Text>;
  } else {
      return                <TouchableHighlight style={[styles.buttonContainer]} onPress={this.handlePressRegister}>
      <Text style={styles.loginText}>Cadastre-se</Text>
  </TouchableHighlight>


  }
}

displayPassword(password,editable) {
  if (this.props.account) {
      return <Text></Text>;
  } else {
      return                <View style={styles.inputContainer}>
      <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/ios-glyphs/48/000000/key.png'}}/>

      <TextInput style={styles.inputs}
          ref='password'
          testID='loginScreenPassword'
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
          placeholder='Digite sua Senha'
          />
    </View>


  }
}

displayEnter()
{
  if (this.props.account) {
    return <Text></Text>;
} else {
    return              <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.handlePressLogin}>
    <Text style={styles.loginText}>Entrar</Text>
  </TouchableHighlight>

}
}


// displayPush()
// {
//   if (!this.props.account) {
//     return <Text></Text>;
// } else {
//     return              <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.handlePush}>
//     <Text style={styles.loginText}>Push</Text>
//   </TouchableHighlight>

// }
// }

displayUsername(username,editable) {
  if (this.props.account) {
      return <Text></Text>;
  } else {
      return                <View style={styles.inputContainer}>
      <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/ios-glyphs/48/000000/user-male.png'}}/>
      <TextInput style={styles.inputs}
          // placeholder="Usuario"
          // underlineColorAndroid='transparent'
          // onChangeText={(email) => this.setState({email})}
                        ref='username'
          testID='loginScreenUsername'
          value={username}
          editable={editable}
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={this.handleChangeUsername}
          underlineColorAndroid='transparent'
          onSubmitEditing={() => this.refs.password.focus()}
          placeholder='Digite seu Usuário'
          />
    </View>


  }
}

handlePressRegister = () => {
  registerScreen()
 // Navigation.dismissModal(this.props.componentId)
}

handlePressForgotPassword = () => {
  forgotPasswordScreen()
 // Navigation.dismissModal(this.props.componentId)
}

  // render () {
  //   const { username, password } = this.state
  //   const { fetching } = this.props
  //   const editable = !fetching
  //   console.log(this.state,"logstate")
  //   const textInputStyle = editable ? styles.textInput : styles.textInputReadonly
  //   return (
  //     <View style={styles.mainContainer} testID='launchScreen'>
  //       <Image style={styles.backgroundImage} resizeMode='stretch' />
  //       <ScrollView style={styles.container}>
  //         <View style={styles.centered}>
  //           <Image source={Images.logoCmt} style={styles.logo} />
  //         </View>
  //         <View>{this.displayJsxMessage()}</View>
  //         <View style={styles.section} >
  //           <Text style={styles.loginText}>
  //             Olá, {!this.state.account ? 'Irmão' : this.state.account.firstName}
  //           </Text>
  //           <Text style={styles.loginText}>
  //             {!this.state.account.loja ? 'Irmão' : this.state.account.loja}
  //           </Text>
  //         </View>
  //         <TouchableOpacity testID='loginScreenLoginButton' style={[styles.buttonContainer,styles.loginButton]} onPress={cupomEntityEditScreen.bind({ entityId: null })}>
  //               <Text style={styles.loginText}>Novo Cupom</Text>
  //           </TouchableOpacity>


  //       {/* <View style={styles.form}>
  //         <View style={styles.row}>
  //           <Text style={styles.rowLabel}>Usuário</Text>
  //           <TextInput
  //             ref='username'
  //             testID='loginScreenUsername'
  //             style={textInputStyle}
  //             value={username}
  //             editable={editable}
  //             keyboardType='default'
  //             returnKeyType='next'
  //             autoCapitalize='none'
  //             autoCorrect={false}
  //             onChangeText={this.handleChangeUsername}
  //             underlineColorAndroid='transparent'
  //             onSubmitEditing={() => this.refs.password.focus()}
  //             placeholder='Digite seu Usuário' />
  //         </View>

  //         <View style={styles.row}>
  //           <Text style={styles.rowLabel}>Senha</Text>
  //           <TextInput
  //             ref='password'
  //             testID='loginScreenPassword'
  //             style={textInputStyle}
  //             value={password}
  //             editable={editable}
  //             keyboardType='default'
  //             returnKeyType='go'
  //             autoCapitalize='none'
  //             autoCorrect={false}
  //             secureTextEntry
  //             onChangeText={this.handleChangePassword}
  //             underlineColorAndroid='transparent'
  //             onSubmitEditing={this.handlePressLogin}
  //             placeholder='Digite sua Senha' />
  //         </View>

  //         <View style={[styles.loginRow]}>
  //           <TouchableOpacity testID='loginScreenLoginButton' style={styles.loginButtonWrapper} onPress={this.handlePressLogin}>
  //             <View style={styles.loginButton}>
  //               <Text style={styles.loginText}>Entrar</Text>
  //             </View>
  //           </TouchableOpacity>
  //         </View>
  //       </View> */}

  //       </ScrollView>
  //     </View>
  //   )
  // }

  render() {
    const { username, password, shift } = this.state
    const { fetching } = this.props
    const editable = !fetching
    const textInputStyle = editable ? styles.textInput : styles.textInputReadonly
    return (
      <Animated.View style={[styles.container, { transform: [{translateY: shift}] }]}>
                 {this.displayWelcome()}
              <View>
          <Image source={Images.logoCmt} style={[styles.topLogo, this.state.topLogo]} />
        </View>

        {this.displayStore()}
        {this.displayPlacet()}
        {this.displayCupom()}
        {this.displayUsername()}
        {this.displayPassword()}
        {this.displayEnter()}
        {this.displayForgotPassword()}
        {this.displayRegister()}
      </Animated.View>
    );
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
    updateAccount: (account) => dispatch(AccountActions.accountUpdateRequest(account)),
    logout: () => dispatch(LoginActions.logoutRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)

