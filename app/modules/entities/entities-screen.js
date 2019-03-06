import React from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
// Styles
/*eslint-disable */
import RoundedButton from '../../shared/components/rounded-button/rounded-button'
import {
  cupomEntityScreen,
  agendaEventoEntityScreen,
  categoriaEstabelecimentoEntityScreen,
  estabelecimentoComercialEntityScreen,
  lojaMaconicaEntityScreen,
  contatoLojaMaconicaEntityScreen,
  usuarioEntityScreen,
  tipoOperacaoEntityScreen,
  parametrizacaoEntityScreen,
  contasPagarReceberEntityScreen,
  comunicacaoPushEntityScreen,
  comunicacaoPushLojaEntityScreen,
  perfilUsuarioEntityScreen,
  // ignite-jhipster-entity-screen-import-needle
} from '../../navigation/layouts'
/*eslint-enable */

import styles from './entities-screen.styles'

class EntitiesScreen extends React.Component {
  render () {
    return (
      <ScrollView style={styles.container}>
        <Text style={{ textAlign: 'center' }}>JHipster Entities will appear below</Text>
        <RoundedButton text='Cupom' onPress={cupomEntityScreen} testID='cupomEntityScreenButton' />
        <RoundedButton text='AgendaEvento' onPress={agendaEventoEntityScreen} testID='agendaEventoEntityScreenButton' />
        <RoundedButton text='CategoriaEstabelecimento' onPress={categoriaEstabelecimentoEntityScreen} testID='categoriaEstabelecimentoEntityScreenButton' />
        <RoundedButton text='EstabelecimentoComercial' onPress={estabelecimentoComercialEntityScreen} testID='estabelecimentoComercialEntityScreenButton' />
        <RoundedButton text='LojaMaconica' onPress={lojaMaconicaEntityScreen} testID='lojaMaconicaEntityScreenButton' />
        <RoundedButton text='ContatoLojaMaconica' onPress={contatoLojaMaconicaEntityScreen} testID='contatoLojaMaconicaEntityScreenButton' />
        <RoundedButton text='Usuario' onPress={usuarioEntityScreen} testID='usuarioEntityScreenButton' />
        <RoundedButton text='TipoOperacao' onPress={tipoOperacaoEntityScreen} testID='tipoOperacaoEntityScreenButton' />
        <RoundedButton text='Parametrizacao' onPress={parametrizacaoEntityScreen} testID='parametrizacaoEntityScreenButton' />
        <RoundedButton text='ContasPagarReceber' onPress={contasPagarReceberEntityScreen} testID='contasPagarReceberEntityScreenButton' />
        <RoundedButton text='ComunicacaoPush' onPress={comunicacaoPushEntityScreen} testID='comunicacaoPushEntityScreenButton' />
        <RoundedButton text='ComunicacaoPushLoja' onPress={comunicacaoPushLojaEntityScreen} testID='comunicacaoPushLojaEntityScreenButton' />
        <RoundedButton text='PerfilUsuario' onPress={perfilUsuarioEntityScreen} testID='perfilUsuarioEntityScreenButton' />
        {/* ignite-jhipster-entity-screen-needle */}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // for developer convenience
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // for developer convenience
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntitiesScreen)
