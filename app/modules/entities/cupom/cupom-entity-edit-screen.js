import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import CupomActions from './cupom.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { cupomEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'
import ImageFactory from 'react-native-image-picker-form'
import ImgToBase64 from 'react-native-image-base64';

import styles from './cupom-entity-edit-screen-style'

let Form = t.form.Form

class CupomEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.Number,
        data: t.String,
        valor: t.Number,
        numero: t.String,
        foto: t.String,
        estabelecimentoComercialId: t.Number
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          data: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('valor').refs.input.focus(),
            testID: 'dataInput'
          },
          valor: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('numero').refs.input.focus(),
            testID: 'valorInput'
          },
          numero: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('foto').refs.input.focus(),
            testID: 'numeroInput'
          },
          // foto: {
          //   returnKeyType: 'next',
          //   onSubmitEditing: () => this.refs.form.getComponent('estabelecimentoComercialId').refs.input.focus(),
          //   testID: 'fotoInput'
          // },
          foto: {
            label: 'Foto',
            config: {
              title: 'Selecione o Cupom',
              options: ['Abrir camera', 'Selecione da galeria', 'Cancelar']
              // Used on Android to style BottomSheet
            },
            error: 'Sem imagem',
            factory: ImageFactory
          },
          estabelecimentoComercialId: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'estabelecimentoComercialIdInput'
          }
        }
      },
      success: false,
      cupom: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getCupom(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.cupom && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.cupom)
      })
    }

    // Did the update attempt complete?
    if (!newProps.updating && this.state.requesting) {
      if (newProps.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{text: 'OK'}])
        this.setState({
          success: false,
          requesting: false
        })
      } else {
        this.props.getAllCupoms({page: 0, sort: 'id,asc', size: 20})
        const entityId = newProps.cupom.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: cupomEntityDetailScreen.bind(this, { entityId })
          })
        }
        this.setState({
          success: true,
          requesting: false,
          formValue: { id: null }
        })
        Navigation.pop(this.props.componentId)
        Alert.alert('Success', 'Entity saved successfully', alertOptions)
      }
    }
  }

  // convenience methods for customizing the mapping of the entity to/from the form value
  entityToFormValue = (value) => {
    if (!value) {
      return {}
    }
    return {
      id: value.id || null,
      data: value.data || null,
      valor: value.valor || null,
      numero: value.numero || null,
      foto: value.foto || null,
      estabelecimentoComercialId: value.estabelecimentoComercialId || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      data: value.data || null,
      valor: value.valor || null,
      numero: value.numero || null,
      foto: value.foto || null,
      estabelecimentoComercialId: value.estabelecimentoComercialId || null
    }
    return entity
  }

  submitForm () {


   // call getValue() to get the values of the form
    const cupom = this.state.formValue
    let foto = ImgToBase64.getBase64String('file://' + cupom.foto)
  .then(base64String => {
    foto = base64String
    cupom.foto = foto.replace("/9/", "")
    cupom.fotoContentType = "image/png"
    console.log("logando foto", foto)
    console.log("logando cupom", cupom)
console.log("logando state antes", this.state)
    this.setState({
      success: false,
      requesting: true,
      cupom
    })
    console.log("logando state depois", this.state)
    if (cupom) { // if validation fails, value will be null

      console.log("caiu if", cupom)
      this.props.updateCupom(this.formValueToEntity(cupom))
    }
    Navigation.pop(this.props.componentId)
   // Alert.alert('Sucesso', 'Cupom enviado.')
  })
  .catch(err => console.log(err));

  }

  formChange (newValue) {
    this.setState({
      formValue: newValue
    })
  }

  render () {
    return (
      <KeyboardAwareScrollView>
        <ScrollView style={styles.container} testID='entityScrollView'>
          <Form
            ref='form'
            type={this.state.formModel}
            options={this.state.formOptions}
            value={this.state.formValue}
            onChange={this.formChange}
          />
          <TouchableHighlight style={styles.button} onPress={this.submitForm} underlayColor='#99d9f4' testID='submitButton'>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableHighlight>
        </ScrollView>
      </KeyboardAwareScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cupom: state.cupoms.cupom,
    fetching: state.cupoms.fetchingOne,
    updating: state.cupoms.updating,
    error: state.cupoms.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCupom: (id) => dispatch(CupomActions.cupomRequest(id)),
    getAllCupoms: (options) => dispatch(CupomActions.cupomAllRequest(options)),
    updateCupom: (cupom) => dispatch(CupomActions.cupomUpdateRequest(cupom))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CupomEntityEditScreen)
