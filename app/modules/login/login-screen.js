import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Image, View, ScrollView, Text, TextInput, TouchableOpacity, TouchableHighlight, Animated, Dimensions, Keyboard, UIManager } from 'react-native'
import { Header } from 'react-native-elements';
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'

import styles from './login-screen.styles'
import { Images, Metrics } from '../../shared/themes'
import LoginActions from './login.reducer'
import { registerScreen, forgotPasswordScreen, launchScreen } from '../../navigation/layouts'
// import launchScreen from '../home/launch-screen';

const { State: TextInputState } = TextInput;

class LoginScreen extends React.Component {
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
      topLogo: { width: Metrics.screenWidth },
      shift: new Animated.Value(0)
    }
  }


  componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  componentWillReceiveProps (newProps) {
    // Did the login attempt complete?
    console.log(newProps,"log de newprops")
    if (!newProps.fetching) {
      if (newProps.error) {
        if (newProps.error === 'WRONG') {
          Alert.alert('Error', 'Login inválido.', [{text: 'OK'}])
          return
        }
      } else if (newProps.account) {
       Navigation.dismissModal(this.props.componentId)

      }
    }
  }

  handlePressLogin = () => {
    const { username, password } = this.state

    console.log('teste',this.state)

    if(username != '' && password != '')
    {
    // attempt a login - a saga is listening to pick it up from here.
    this.props.attemptLogin(username, password)
    }else
    {
      Alert.alert('Erro', 'Usuário ou Senha inválidos.', [{text: 'OK'}])
    }

  }

  handlePressRegister = () => {
    registerScreen()
    Navigation.dismissModal(this.props.componentId)
  }

  handlePressForgotPassword = () => {
    forgotPasswordScreen()
    Navigation.dismissModal(this.props.componentId)
  }

  handlePressPassword = () => {
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

  handleKeyboardDidShow = (event) => {
    const { height: windowHeight } = Dimensions.get('window');
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedField();
    UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
      const fieldHeight = height;
      const fieldTop = pageY;
      const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
      if (gap >= 0) {
        return;
      }
      Animated.timing(
        this.state.shift,
        {
          toValue: gap,
          duration: 1000,
          useNativeDriver: true,
        }
      ).start();
    });
  }

  handleKeyboardDidHide = () => {
    Animated.timing(
      this.state.shift,
      {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }
    ).start();
  }




  // render () {
  //   const { username, password } = this.state
  //   const { fetching } = this.props
  //   const editable = !fetching
  //   const textInputStyle = editable ? styles.textInput : styles.textInputReadonly
  //   return (
  //     <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[styles.container, {height: this.state.visibleHeight}]} keyboardShouldPersistTaps='always'>
  //       <Image source={Images.logoCmt} style={[styles.topLogo, this.state.topLogo]} />
  //       <View style={styles.form}>
  //       <View style={styles.row} >
  //           <Text style={styles.titleText}>
  //             {'Seja Bem-vindo ao App do CMT!'}
  //           </Text>
  //         </View>
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
  //           <TouchableOpacity testID='loginScreenCancelButton' style={styles.loginButtonWrapper} onPress={this.handlePressCancel}>
  //             <View style={styles.registerButton}>
  //               <Text style={styles.loginText}>Cadastre-se</Text>
  //             </View>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     </ScrollView>
  //   )
  // }

  render() {
    const { username, password, shift } = this.state
    const { fetching } = this.props
    const editable = !fetching
    const textInputStyle = editable ? styles.textInput : styles.textInputReadonly
    return (
      <Animated.View style={[styles.container, { transform: [{translateY: shift}] }]}>
              <TouchableHighlight style={styles.buttonContainer}>
            <Text style={styles.topText}>Bem-vindo ao CMT!</Text>
        </TouchableHighlight>
              <View>
          <Image source={Images.logoCmt} style={[styles.topLogo, this.state.topLogo]} />
        </View>
        <View style={styles.inputContainer}>
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

        <View style={styles.inputContainer}>
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

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.handlePressLogin}>
          <Text style={styles.loginText}>Entrar</Text>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.buttonContainer]} onPress={this.handlePressForgotPassword}>
            <Text style={styles.loginText}>Esqueci minha senha</Text>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.buttonContainer]} onPress={this.handlePressRegister}>
            <Text style={styles.loginText}>Cadastre-se</Text>
        </TouchableHighlight>
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
    logout: () => dispatch(LoginActions.logoutRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
