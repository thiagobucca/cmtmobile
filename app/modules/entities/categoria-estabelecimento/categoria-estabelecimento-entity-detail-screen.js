import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { categoriaEstabelecimentoEntityEditScreen } from '../../../navigation/layouts'

import CategoriaEstabelecimentoActions from './categoria-estabelecimento.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './categoria-estabelecimento-entity-detail-screen-style'

class CategoriaEstabelecimentoEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      categoriaEstabelecimento: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getCategoriaEstabelecimento(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.categoriaEstabelecimento) {
      this.setState({ categoriaEstabelecimento: newProps.categoriaEstabelecimento })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllCategoriaEstabelecimentos()
        Navigation.pop(this.props.componentId)
      } else {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{text: 'OK'}])
        this.setState({
          success: false,
          requesting: false
        })
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete CategoriaEstabelecimento?',
      'Are you sure you want to delete the CategoriaEstabelecimento?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteCategoriaEstabelecimento(this.props.data.entityId)
            })
          }
        }
      ],
      { cancelable: false }
    )
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Text>ID: {this.state.categoriaEstabelecimento.id}</Text>
        <Text testID='nome'>Nome: {this.state.categoriaEstabelecimento.nome}</Text>
        <Text testID='bolAtivo'>BolAtivo: {this.state.categoriaEstabelecimento.bolAtivo}</Text>
        <RoundedButton text='Edit' onPress={categoriaEstabelecimentoEntityEditScreen.bind(this, { entityId: this.state.categoriaEstabelecimento.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categoriaEstabelecimento: state.categoriaEstabelecimentos.categoriaEstabelecimento,
    deleting: state.categoriaEstabelecimentos.deleting,
    errorDeleting: state.categoriaEstabelecimentos.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoriaEstabelecimento: (id) => dispatch(CategoriaEstabelecimentoActions.categoriaEstabelecimentoRequest(id)),
    getAllCategoriaEstabelecimentos: (options) => dispatch(CategoriaEstabelecimentoActions.categoriaEstabelecimentoAllRequest(options)),
    deleteCategoriaEstabelecimento: (id) => dispatch(CategoriaEstabelecimentoActions.categoriaEstabelecimentoDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriaEstabelecimentoEntityDetailScreen)
