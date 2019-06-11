import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight, View, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import LojaMaconicaActions from './../../entities/loja-maconica/loja-maconica.reducer'
import RegisterActions from '../register/register.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { UserActions } from '../../../shared/reducers/user.reducer'
import UsuarioActions from './../../entities/usuario/usuario.reducer'
import { TextInputMask } from 'react-native-masked-text'
import maskedInputTemplate from '../../../../node_modules/tcomb-form-native/lib/templates/MaskedInputTemplate/MaskedInputTemplate'
import OneSignal from 'react-native-onesignal'
import moment from 'moment';


import t from 'tcomb-form-native'
// Styles
import styles from './register-screen.styles'

let Form = t.form.Form

class RegisterScreen extends React.Component {
  constructor (props) {
    super(props)
    OneSignal.init("1ee29f2c-4652-4629-ab1e-1d016cfad22e")
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.configure();
    Navigation.events().bindComponent(this)
    this.state = {
      formValue: { login: null, password: null, confirmPassword: null, email: null, langKey: 'pt-br', firstName: null, dataNascimento: null, telefone: null, usuarioId: null, tipoPessoa: 'Macom' },
      formOptions: {
        fields: {
          firstName: {
            label: 'Nome',
            returnKeyType: 'next',
            error: 'Preencha o nome.',
            onSubmitEditing: () => this.refs.form.getComponent('dataNascimento').refs.input._inputElement.focus()
          },
          isMacon: {
            testID: 'Macom',
            label: 'Macom?',
            returnKeyType: 'done'
          },
          lojaMaconicaId: {
            returnKeyType: 'done',
            order: 'asc',
            hidden: true,
            label: 'Loja',
            i18n: {
              optional: ''
            },
            testID: 'lojaMaconicaIdInput'
          },
          dataNascimento: {
            label: 'Data de Nascimento',
            template: maskedInputTemplate,
          config: {
            mask: 'datetime',
            options:{
              format: 'DD/MM/YYYY'
            },
          },
            returnKeyType: 'next',
            error: 'Preencha a Data de Nascimento.',
            onSubmitEditing: () => this.refs.form.getComponent('login').refs.input.focus()
          },
          login: {
            label: 'Usuário',
            returnKeyType: 'next',
            error: 'Preencha o Usuário.',
            autoCapitalize: 'none',
            onSubmitEditing: () => this.refs.form.getComponent('password').refs.input.focus()
          },
          password: {
            label: 'Senha',
            secureTextEntry: true,
            returnKeyType: 'next',
            error: 'Preencha a Senha.',
            onSubmitEditing: () => this.refs.form.getComponent('confirmPassword').refs.input.focus()
          },
          confirmPassword: {
            label: 'Confirmar Senha',
            secureTextEntry: true,
            returnKeyType: 'next',
            error: 'Preencha a Confirmação de Senha.',
            onSubmitEditing: () => this.refs.form.getComponent('telefone').refs.input._inputElement.focus()
          },
          telefone: {
            label: 'Telefone',
            template: maskedInputTemplate,
            config: {
              mask: 'cel-phone',
              options:{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) '
              }
            },
            error: 'Preencha o Telefone.',
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('email').refs.input.focus()
          },
          email: {
            label: 'Email',
            returnKeyType: 'next',
            error: 'Preencha o Email.',
            autoCapitalize: 'none',
            onSubmitEditing: () => this.refs.form.getComponent('email').refs.input.focus()
          },
          placet: {
            label: 'Placet',
            returnKeyType: 'next',
            maxLength: 6,
            error: 'Preencha o Placet.',
            onSubmitEditing: () => this.refs.form.getComponent('firstName').refs.input.focus()
          },
          langKey: {
            hidden: true
          },
          tipoPessoa: {
            hidden: true
          }
        }
      },
      success: false,
      creating: false,
      account: {},
      jasper:{}
    }
    this.onChange = this.onChange.bind(this)
    this.submitUpdate = this.submitUpdate.bind(this)
    this.accountChange = this.accountChange.bind(this)
  }


  getFormModel()
  {

    return t.struct({
      isMacon: t.Boolean,
      lojaMaconicaId: this.getLojaMaconicas(),
      placet: t.String,
      firstName: t.String,
      dataNascimento: t.String,
      login: t.String,
      password: t.String,
      confirmPassword: t.String,
      telefone: t.String,
      email: t.String,
      tipoPessoa: t.String,
      langKey: t.String
    })
  }

  onChange (value)
  {


// tcomb immutability helpers
    // https://github.com/gcanti/tcomb/blob/master/docs/API.md#updating-immutable-instances


    var formOptions = t.update(this.state.formOptions, {

      fields: {
        lojaMaconicaId: {
          hidden: {'$set': !value.isMacon}
        }
      }
    });

    value.tipoPessoa = value.isMacon ? 'Macom' : 'Dependente'

    this.getLojaMaconicas()

    this.setState({formOptions: formOptions, formValue: value});
  }

  componentDidMount()
  {
    Alert.alert(JSON.stringify(this.props.error))

  }



  submitUpdate () {


    Alert.alert(JSON.stringify(this.props.error))
    this.setState({
      updating: true,
      creating: true
    })

       const value = this.refs.form.getValue()
    if (value) { // if validation fails, value will be null
      // if (value.password !== value.confirmPassword) {
      //   Alert.alert('Erro', 'As senhas digitadas não são iguais.', [{text: 'OK'}])
      //   return
      // }
      if (value.email != '') {
        const mail = value.email.trim()
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
           if (reg.test(mail) === false){
            Alert.alert('Erro', 'O Email digitado é inválido.', [{text: 'OK'}])
            return
           }
      }

      if ((value.lojaMaconicaId == null || value.lojaMaconicaId == '') && value.tipoPessoa == 'Macom') {
        // const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        //    if (reg.test(value.email) === false){
            Alert.alert('Erro', 'Favor preencher a Loja.', [{text: 'OK'}])
             return
        //    }
      }
      if(!moment(value.dataNascimento, 'DD/MM/YYYY').isValid())
      {
        Alert.alert('Erro', 'Data de nascimento inválida.', [{text: 'OK'}])
        return

      }


    const user = this.refs.form.getValue()
    let jasper = {...this.state.formValue};
    jasper.dataNascimento = moment(moment(user.dataNascimento, 'DD/MM/YYYY')).format("YYYY-MM-DDTHH:mm:ss.SSS").concat("Z")
    jasper.telefone = user.telefone.replace('(','').replace(')','').replace('-','').replace(" ","","g")
    jasper.deviceId = this.state.account.deviceId
    jasper.confirmPassword = jasper.password
    jasper.email = jasper.email.trim()
    this.setState({jasper});
    this.setState({
      success: false,
      requesting: true
    })

    if (user) { // if validation fails, value will be null

        if(this.props.error != null && this.props.error.errorKey != null)
        {

          if(this.props.error.errorKey == "idexists")
          {
            Alert.alert('Erro', 'Não foi encontrado Maçom para o Placet informado.', [{text: 'OK'}])
            return
          }

          if(this.props.error.errorKey == "userexists")
          {
            Alert.alert('Erro', 'Nome de usuário existente.', [{text: 'OK'}])
            return
          }

          Alert.alert(JSON.stringify(this.props.error))
          if(this.props.error.errorKey == "emailexists")
          {
            Alert.alert('Erro', 'Emaisl existente.', [{text: 'OK'}])
           // return
          }

        }

      this.setState({
        success: true,
        fetching: false
      })
      this.props.register(jasper)
    }else
    {
      Alert.alert('Atenção', 'Verifique as informações e tente novamente.', [{text: 'Erro'}])
    }
  }
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

  onIds = (device) => {

  this.setState({
    account : {...this.state.account,deviceId: device.userId}
  })


 //   this.props.updateAccount(this.state.account)
    if(device != null && device.userId !=  null && this.props.account != null && this.props.account.deviceId != null && device.userId)
    {
    //  this.setState({ deviceId: device.userId })
      //this.props.updateAccount(account)
    }
  }

  componentWillReceiveProps (newProps) {

    if(this.props.lojaMaconicas != null && this.props.lojaMaconicas.lenght == 0)
    {
      this.getLojaMaconicas()
    }





    if (!newProps.fetching && this.state.creating == true) {

      this.setState({
        creating : false
      })

      if (newProps.error) {

        if(newProps.error.errorKey == "placetexists")
        {
          Alert.alert('Erro', 'Placet já cadastrado.', [{text: 'OK'}])
          return
        }

        if(newProps.error.errorKey == "idexists")
        {
          Alert.alert('Erro', 'Não foi encontrado Maçom para o Placet informado.', [{text: 'OK'}])
          return
        }

        if(newProps.error.errorKey == "userexists")
        {
          Alert.alert('Erro', 'Nome de usuário existente.', [{text: 'OK'}])
          return
        }

        if(newProps.error.errorKey == "emailexists")
        {
          Alert.alert('Erro', 'Email existente.', [{text: 'OK'}])
          return
        }
      } else{

        Navigation.popToRoot(this.props.componentId)
        Alert.alert('Cadastro realizado com Sucesso!', '', [{text: 'OK'}])

      }
    }

  }

  componentWillMount () {


    //console.log("vai logar lojas maconicas")
    this.props.getAllLojaMaconicas()
    //this.props.getAllUsuarios()
  }

  accountChange (newValue) {
    this.setState({
      accountValue: newValue
    })
  }
  getLojaMaconicas = () => {


    const lojaMaconicas = {}
    this.props.lojaMaconicas.forEach(lojaMaconica => {

      lojaMaconicas[lojaMaconica.id] = lojaMaconica.nome ? lojaMaconica.nome.toString() : lojaMaconica.nome.toString()
    })




    return t.maybe(t.enums(lojaMaconicas))
  }


  // getUsuarios = () => {
  //   const usuarios = {}
  //   // console.log("logando antes for each", this.props)
  //   this.props.usuarios.forEach(usuario => {
  //   //  console.log("logando users")
  //   //  console.log(usuario)
  //     usuarios[usuario.id] = usuario.firstName ? usuario.firstName.toString() : usuario.login
  //   })
  //   return t.maybe(t.enums(usuarios))
  // }



  render () {
    // console.log(this.props.lojaMaconicas, "lojasmaconicas")
    // console.log(this.state, "state")
    // console.log(this.props.lojaMaconicas.length == 0, "true ou false")
    if (this.props.lojaMaconicas.length == 0) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }else
    {
      return (
        <KeyboardAwareScrollView>
          <ScrollView style={styles.container}>
            <Form
              ref='form'
              type={this.getFormModel()}
              options={this.state.formOptions}
              value={this.state.formValue}
              onChange={this.onChange}
            />
            <TouchableHighlight style={styles.button} onPress={this.submitUpdate} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableHighlight>
          </ScrollView>
        </KeyboardAwareScrollView>
      )

    }

  }
}

const mapStateToProps = (state) => {
 // console.log("logando states",state)
  return {
    lojaMaconicas: state.lojaMaconicas.lojaMaconicas || [],
    // users: state.users.users || [],
    fetching: state.register.fetching,
    updating: state.register.updating,
    error: state.register.error
  }
}

const mapDispatchToProps = (dispatch) => {
 // console.log(LojaMaconicaActions,UsuarioActions)
  return {
    getAllLojaMaconicas: (options) => dispatch(LojaMaconicaActions.lojaMaconicaAllRequest(options)),
    register: (account) => dispatch(RegisterActions.registerRequest(account)),
    // getAllUsers: (options) => dispatch(UserActions.userAllRequest(options))
    getAllUsuarios: (options) => dispatch(UsuarioActions.usuarioAllRequest(options))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
