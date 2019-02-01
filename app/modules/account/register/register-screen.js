import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import LojaMaconicaActions from './../../entities/loja-maconica/loja-maconica.reducer'
import RegisterActions from '../register/register.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { UserActions } from '../../../shared/reducers/user.reducer'
import UsuarioActions from './../../entities/usuario/usuario.reducer'



import t from 'tcomb-form-native'
// Styles
import styles from './register-screen.styles'

let Form = t.form.Form

class RegisterScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      formModel: t.struct({
        firstName: t.String,
        dataNascimento: t.Date,
        login: t.String,
        password: t.String,
        confirmPassword: t.String,
        telefone: t.String,
        email: t.String,
        tipoPessoa: t.String,
        // lojaMaconicaId: this.getLojaMaconicas(),
        // usuarioId: this.getUsuarios(),
        lojaMaconicaId: t.Number,
        usuarioId: t.maybe(t.Number),
        langKey: t.String
      }),
      formValue: { login: null, password: null, confirmPassword: null, email: null, langKey: 'pt', firstName: null, dataNascimento: null, telefone: null, tipoPessoa: 'Macom', lojaMaconicaId: 1, usuarioId: null },
      formOptions: {
        fields: {
          firstName: {
            label: 'Nome',
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('dataNascimento').refs.input.focus()
          },
          dataNascimento: {
            label: 'Data de Nascimento',
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('login').refs.input.focus()
          },
          login: {
            label: 'Usuário',
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('password').refs.input.focus()
          },
          password: {
            label: 'Senha',
            secureTextEntry: true,
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('confirmPassword').refs.input.focus()
          },
          confirmPassword: {
            label: 'Confirmar Senha',
            secureTextEntry: true,
            returnKeyType: 'done',
            onSubmitEditing: () => this.refs.form.getComponent('telefone').refs.input.focus()
          },
          telefone: {
            label: 'Telefone',
            returnKeyType: 'done',
            onSubmitEditing: () => this.refs.form.getComponent('email').refs.input.focus()
          },
          email: {
            label: 'Email',
            returnKeyType: 'done',
            onSubmitEditing: () => this.refs.form.getComponent('tipoPessoa').refs.input.focus()
          },
          tipoPessoa: {
            label: 'Maçom?',
            returnKeyType: 'done',
            checked: true
          },
          lojaMaconicaId: {
            testID: 'lojaMaconicaIdInput',
            label: 'Loja Maconica',
            returnKeyType: 'done'
          },
          usuarioId: {
            testID: 'usuarioIdInput',
            label: 'Maçom Vinculado',
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitUpdate()
          },
          langKey: {
            hidden: true
          },
          usuarioId: {
            hidden: false
          }
        }
      },
      success: false,
      account: {}
    }
    this.onChange = this.onChange.bind(this)
    this.submitUpdate = this.submitUpdate.bind(this)
    this.accountChange = this.accountChange.bind(this)
  }

  onChange (value)
  {
    console.log("printando value",value)
// // tcomb immutability helpers
//     // https://github.com/gcanti/tcomb/blob/master/docs/API.md#updating-immutable-instances
//       console.log("logando options",this.state.formOptions)

//     var formOptions = t.update(this.state.formOptions, {
//       fields: {
//         lojaMaconicaId: {
//           hidden: {'$set': !value.tipoPessoa}
//         },
//         usuarioId: {
//           hidden: {'$set': value.tipoPessoa}
//         }
//       }
//     });
//     this.setState({formOptions: formOptions, formValue: value});
  }

  submitUpdate () {
    console.log("caiu update")
    this.setState({
      success: false
    })
    // call getValue() to get the values of the form
    const value = this.refs.form.getValue()
    if (value) { // if validation fails, value will be null
      if (value.password !== value.confirmPassword) {
        Alert.alert('Error', 'Passwords do not match', [{text: 'OK'}])
        return
      }
      this.props.register(value)
    }
  }

  componentWillReceiveProps (newProps) {

  //  if (!newProps.fetching) {
  //     if (newProps.error) {
  //       Alert.alert('Erro', newProps.error, [{text: 'OK'}])
  //     } else {
  //      console.log("sucesso")
  //       this.setState({
  //         success: true
  //       })
  //      Alert.alert('Cadastro realizado com Sucesso!', 'Verifique seu e-mail.', [{text: 'OK'}])
  //      Navigation.popToRoot(this.props.componentId)
  //     }
  //  }
  }

  componentWillMount () {


    //console.log("vai logar lojas maconicas")
    this.props.getAllLojaMaconicas()
    this.props.getAllUsuarios()
  }

  accountChange (newValue) {
    this.setState({
      accountValue: newValue
    })
  }
  getLojaMaconicas = () => {
    const lojaMaconicas = {}
    this.props.lojaMaconicas.forEach(lojaMaconica => {
     // console.log("logando lojas")
     // console.log(lojaMaconica)
      lojaMaconicas[lojaMaconica.nome] = lojaMaconica.nome ? lojaMaconica.nome.toString() : lojaMaconica.nome.toString()
    })
    return t.maybe(t.enums(lojaMaconicas))
  }

  getUsuarios = () => {
    const usuarios = {}
    console.log("logando antes for each", this.props)
    this.props.usuarios.forEach(usuario => {
      console.log("logando users")
      console.log(usuario)
      usuarios[usuario.firstName] = usuario.firstName ? usuario.firstName.toString() : usuario.login
    })
    return t.maybe(t.enums(usuarios))
  }



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
  console.log("logando states",state)
  return {
    lojaMaconicas: state.lojaMaconicas.lojaMaconicas || [],
    // users: state.users.users || [],
    usuarios: state.usuarios.usuarios || [],
    fetching: state.register.fetching,
    error: state.register.error
  }
}

const mapDispatchToProps = (dispatch) => {
  console.log(LojaMaconicaActions,UsuarioActions)
  return {
    getAllLojaMaconicas: (options) => dispatch(LojaMaconicaActions.lojaMaconicaAllRequest(options)),
    register: (account) => dispatch(RegisterActions.registerRequest(account)),
    // getAllUsers: (options) => dispatch(UserActions.userAllRequest(options))
    getAllUsuarios: (options) => dispatch(UsuarioActions.usuarioAllRequest(options))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
