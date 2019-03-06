import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight, View, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import CupomActions from './cupom.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { cupomEntityDetailScreen } from '../../../navigation/layouts'
import EstabelecimentoComercialActions from './../../entities/estabelecimento-comercial/estabelecimento-comercial.reducer'

import t from 'tcomb-form-native'
import { TextInputMask } from 'react-native-masked-text'
import maskedInputTemplate from '../../../../node_modules/tcomb-form-native/lib/templates/MaskedInputTemplate/MaskedInputTemplate'
import ImageFactory from 'react-native-image-picker-form'
import ImgToBase64 from 'react-native-image-base64';
import moment from 'moment';

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
        valor: t.String,
        estabelecimentoComercialId: this.getEstabelecimentoComercials(),
        numero: t.maybe(t.String),
        foto: t.String,
        usuarioId: t.Number
      }),
      formValue: { id: null},
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          data: {
            returnKeyType: 'next',
            template: maskedInputTemplate,
            placeholder: 'Exemplo: 10/02/2019',
            config: {
              mask: 'datetime',
              options:{
                format: 'DD/MM/YYYY'
              },
            },
            error: 'Preencha a Data de Nascimento.',
            onSubmitEditing: () => this.refs.form.getComponent('valor').refs.input._inputElement.focus(),
            testID: 'dataInput'
          },
          valor: {
            returnKeyType: 'next',
            template: maskedInputTemplate,
            placeholder: 'R$',
            maxLength: 10,
            config: {
              mask: 'money',
              options:{
                precision: 2,
                separator: ',',
                delimiter: '.',
                unit: 'R$',
                suffixUnit: ''
              },
            },
            error: 'Preencha o Valor.',
            // onSubmitEditing: () => this.refs.form.getComponent('numero').refs.input.focus(),
            testID: 'valorInput'
          },
          estabelecimentoComercialId: {
            returnKeyType: 'done',
            placeholder: 'Selecione',
            label: 'Estabelecimento Comercial',
            i18n: {
              optional: ''
            },
            onSubmitEditing: () => this.submitForm(),
            testID: 'estabelecimentoComercialIdInput'
          },
          numero: {
            returnKeyType: 'next',
            placeholder: 'Número Cupom',
            i18n: {
              optional: ''
            },
            testID: 'numeroInput'
          },
          foto: {
            label: 'Foto',
            config: {
              title: 'Escolher Foto',
              options: ['Abrir camera', 'Selecione da galeria', 'Cancelar']
              // Used on Android to style BottomSheet
            },
            error: 'Sem imagem',
            factory: ImageFactory
          },
          usuarioId: {
            hidden: true
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

      this.props.getAllEstabelecimentoComercials()

    if (this.props.data.entityId) {
      this.props.getCupom(this.props.data.entityId)
    } else {
       this.setState({formValue: { id: null }})
    }
  }

  getEstabelecimentoComercials = () => {

    const estabelecimentoComercials = {}
    this.props.estabelecimentoComercials.forEach(estabelecimentoComercial => {
     console.log(estabelecimentoComercial)
     estabelecimentoComercials[estabelecimentoComercial.id] = estabelecimentoComercial.nome ? estabelecimentoComercial.nome.toString() : estabelecimentoComercial.nome.toString()
    })

  return t.maybe(t.enums(estabelecimentoComercials))
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
        Alert.alert('Erro', 'Cupom já cadastrado.', [{text: 'OK'}])
        this.setState({
          success: false,
          requesting: false,
          updating: false
        })
      }
      else {
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
        Alert.alert('Success', 'Cupom enviado com sucesso.', alertOptions)
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
      estabelecimentoComercialId: value.estabelecimentoComercialId || null,
      usuarioId: value.usuarioId || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      data: value.data || null,
      valor: value.valor || null,
      numero: value.numero || null,
      foto: value.foto || null,
      estabelecimentoComercialId: value.estabelecimentoComercialId || null,
      usuarioId: value.usuarioId || null
    }
    return entity
  }

  submitForm () {


      const cupom = this.state.formValue

      if(cupom)
      {

        if(cupom.data == '' || cupom.data.length != 10)
        {
          Alert.alert('Erro', 'Data de nascimento inválida.', [{text: 'OK'}])
          return
        }
        if(!moment(cupom.data, 'DD-MM-YYYY').isValid())
        {
          Alert.alert('Erro', 'Data de nascimento inválida.', [{text: 'OK'}])
          return
        }

        if(cupom.valor == '')
        {
          Alert.alert('Erro', 'Valor inválido', [{text: 'OK'}])
          return

        }

        this.setState({
          updating: true
        })

      let foto = ImgToBase64.getBase64String('file://' + cupom.foto)
    .then(base64String => {
      foto = base64String
      cupom.foto = foto.replace("/9/", "")
      cupom.fotoContentType = "image/png"
      cupom.usuarioId = this.props.account.id
      cupom.data = moment.utc(moment(cupom.data, "DD/MM/YYYY")).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
      cupom.valor = cupom.valor.replace("R$", "").replace(",",".");
  console.log("logando state antes", this.state)
      this.setState({
        success: false,
        requesting: true,
        cupom
      })
      console.log("logando state depois", this.state)
      console.log("logando cupom",cupom)
      if (cupom) { // if validation fails, value will be null

        console.log("caiu if", cupom)
        this.props.updateCupom(cupom)
      }else
      {
        console.log("caiu else", cupom)
      }
      Alert.alert('Success', 'Cupom enviado com sucesso.', alertOptions)

      if(this.state.error)
      {
        this.setState({
          updating: false
        })
        console.log(this.state,'logando state')
        Alert.alert('Error', 'Somethinddddddg went wrong updating the entity', [{text: 'Erro'}])

      }

      Navigation.pop(this.props.componentId)

    })
    .catch(err => console.log(err));

     }



  }

  formChange (newValue) {
    this.setState({
      formValue: newValue
    })
  }

  render () {
    if (this.state.updating) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }else
    {
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
  }


const mapStateToProps = (state) => {
  return {
    estabelecimentoComercials: state.estabelecimentoComercials.estabelecimentoComercials || [],
    cupom: state.cupoms.cupom,
    account: state.account.account,
    fetching: state.cupoms.fetchingOne,
    updating: state.cupoms.updating,
    error: state.cupoms.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCupom: (id) => dispatch(CupomActions.cupomRequest(id)),
    getAllCupoms: (options) => dispatch(CupomActions.cupomAllRequest(options)),
    updateCupom: (cupom) => dispatch(CupomActions.cupomUpdateRequest(cupom)),
    getAllEstabelecimentoComercials: (options) => dispatch(EstabelecimentoComercialActions.estabelecimentoComercialAllRequest(options)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CupomEntityEditScreen)
