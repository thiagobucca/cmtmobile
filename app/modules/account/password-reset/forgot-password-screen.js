import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Navigation, HeaderBackButton } from 'react-native-navigation'
import t from 'tcomb-form-native'

import ForgotPasswordActions from './forgot-password.reducer'
import styles from './forgot-password-screen.styles'
// import _ from 'lodash';

let Form = t.form.Form


class ForgotPasswordScreen extends React.Component {
  static navigationOptions = {
    title: 'Details',
  };
  constructor (props) {
    super(props)
//     const stylesheet = _.cloneDeep(t.form.Form.stylesheet);
// // overriding the text color
// stylesheet.textbox.normal.height = 45,
// stylesheet.textbox.normal.flexDirection = 'row',
// // stylesheet.textbox.normal.justifyContent = 'center',
// stylesheet.textbox.normal.alignItems = 'center',
// stylesheet.textbox.normal.marginBottom = 20,
// // stylesheet.textbox.normal.width = 250,
// stylesheet.textbox.normal.borderRadius = 30

// Form.defaultProps.stylesheet = stylesheet
    Navigation.events().bindComponent(this)
    this.state = {
      formModel: t.struct({
        email: t.String
      }),
      formValue: this.props.forgotPassword,
      formOptions: {
        email: {
          returnKeyType: 'done',
          onSubmitEditing: () => this.submitForm()
          // ,stylesheet: _.cloneDeep(stylesheet)
        }
      },
      success: false
    }
    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  submitForm () {
    this.setState({
      success: false
    })
    // call getValue() to get the values of the form
    const value = this.refs.form.getValue()
    if (value) { // if validation fails, value will be null
      this.props.resetPassword(value.email)
    }
  }

componentWillMount()
{

}

  componentWillReceiveProps (newProps) {
    // Did the update attempt complete?
    if (!newProps.fetching) {
      console.log(newProps, 'nwqperosaSjaosjioJIOSA')
      if (newProps.error) {
        if (newProps.error === 'WRONG') {
          Alert.alert('Erro', 'Erro ao resetar a senha, contate o suporte.', [{text: 'OK'}])
        }
      } else {
        this.setState({
          success: true
        })
        Alert.alert('Successo', 'Email enviado com sucesso.', [{text: 'OK'}])
        Navigation.popToRoot(this.props.componentId)
      }
    }
  }

  formChange (newValue) {
    this.setState({
      formValue: newValue
    })
  }

  // render () {
  //   return (
  //     <KeyboardAwareScrollView>
  //       <ScrollView style={styles.container}>
  //         <Form
  //           ref='form'
  //           type={this.state.formModel}
  //           options={this.state.formOptions}
  //           value={this.state.formValue}
  //           onChange={this.formChange}
  //         />
  //         <TouchableHighlight style={styles.button} onPress={this.submitForm} underlayColor='#99d9f4'>
  //           <Text style={styles.buttonText}>Resetar Senha</Text>
  //         </TouchableHighlight>
  //       </ScrollView>
  //     </KeyboardAwareScrollView>
  //   )
  // }

  render() {
    return (
      <View style={styles.container}>
      <Form
            ref='form'
            type={this.state.formModel}
            options={this.state.formOptions}
            value={this.state.formValue}
            onChange={this.formChange}
          />
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.submitForm}>
          <Text style={styles.loginText}>Resetar Senha</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.forgotPassword.fetching,
    error: state.forgotPassword.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: (email) => dispatch(ForgotPasswordActions.forgotPasswordRequest(email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen)
