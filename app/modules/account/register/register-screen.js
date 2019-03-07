import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
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
    //let template = MaskedInputTemplate
   // Form.template = template
    OneSignal.init("1ee29f2c-4652-4629-ab1e-1d016cfad22e")
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.configure();
    Navigation.events().bindComponent(this)
    this.state = {
      formModel: t.struct({
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
      }),
      formValue: { login: null, password: null, confirmPassword: null, email: null, langKey: 'pt-br', firstName: null, dataNascimento: null, telefone: null, usuarioId: null,lojaMaconicaId: null, tipoPessoa: 'Macom' },
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
      account: {},
      jasper:{}
    }
    this.onChange = this.onChange.bind(this)
    this.submitUpdate = this.submitUpdate.bind(this)
    this.accountChange = this.accountChange.bind(this)
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

    this.setState({formOptions: formOptions, formValue: value});
  }



  submitUpdate () {



    this.setState({
      updating: true
    })

       const value = this.refs.form.getValue()
    if (value) { // if validation fails, value will be null
      // if (value.password !== value.confirmPassword) {
      //   Alert.alert('Erro', 'As senhas digitadas não são iguais.', [{text: 'OK'}])
      //   return
      // }
      if (value.email != '') {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
           if (reg.test(value.email) === false){
            Alert.alert('Erro', 'O Email digitado é inválido.', [{text: 'OK'}])
            return
           }
      }
      console.log(value,'log value')
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
    //jasper.dataNascimento = moment.utc(user.dataNascimento).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
    //Alert.alert('Erro Antes Moment Data', user.dataNascimento, [{text: 'OK'}])
    jasper.dataNascimento = moment(moment(user.dataNascimento, 'DD/MM/YYYY')).format("YYYY-MM-DDTHH:mm:ss.SSS").concat("Z")
    //Alert.alert('Erro Data', jasper.dataNascimento, [{text: 'OK'}])
    jasper.telefone = user.telefone.replace('(','').replace(')','').replace('-','').replace(" ","","g")
    jasper.deviceId = this.state.account.deviceId
    jasper.confirmPassword = jasper.password
    this.setState({jasper});
    this.setState({
      success: false,
      requesting: true
    })
    console.log('jasper',this.state.jasper)
    if (user) { // if validation fails, value will be null

      console.log('request',jasper)
        let x = this.props.register(jasper)
         debugger;
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

          if(this.props.error.errorKey == "emailexists")
          {
            Alert.alert('Erro', 'Email existente.', [{text: 'OK'}])
            return
          }

        }



        console.log(x,"retorno metodo")
        console.log(this.state, "retorno state")
        console.log(this.props, "retorno props")
      this.setState({
        success: true,
        fetching: false,
        formValue: { id: null }
      })
      Navigation.popToRoot(this.props.componentId)
      Alert.alert('Cadastro realizado com Sucesso!', 'Verifique seu e-mail.', [{text: 'OK'}])


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


  //   console.log(newProps, 'log props')
  //   console.log(this.state, 'log props')
  //  if (!newProps.fetching) {
  //     if (newProps.error) {
  //       Alert.alert('Erro', newProps.error, [{text: 'OK'}])
  //     } else if(!newProps.fetching) {
  //      console.log("sucesso")
  //       this.setState({
  //         success: true
  //       })
  //       Navigation.popToRoot(this.props.componentId)
  //       Alert.alert('Cadastro realizado3 com Sucesso!', 'Verifique seu e-mail.', [{text: 'OK'}])


  //     }
  //  }
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

     console.log(lojaMaconica)
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

    return (
      <KeyboardAwareScrollView>
        <ScrollView style={styles.container}>
          <Form
            ref='form'
            type={this.state.formModel}
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
