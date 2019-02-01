import React from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'

// Styles
/*eslint-disable */
import RoundedButton from '../../shared/components/rounded-button/rounded-button'
import {
  usuarioEntityScreen,
  perfilUsuarioEntityScreen,
  estabelecimentoComercialEntityScreen,
  agendaEventoEntityScreen,
  lojaMaconicaEntityScreen,
  contatoLojaMaconicaEntityScreen,
  categoriaEstabelecimentoEntityScreen,
  comunicacaoPushEntityScreen,
  cupomEntityScreen,
  // ignite-jhipster-entity-screen-import-needle
} from '../../navigation/layouts'
/*eslint-enable */

import styles from './entities-screen.styles'

class EntitiesScreen extends React.Component {
  render () {
    return (
      <ScrollView style={styles.container}>
        <Text style={{ textAlign: 'center' }}>JHipster Entities will appear below</Text>
        <RoundedButton text='Usuario' onPress={usuarioEntityScreen} testID='usuarioEntityScreenButton' />
        <RoundedButton text='PerfilUsuario' onPress={perfilUsuarioEntityScreen} testID='perfilUsuarioEntityScreenButton' />
        <RoundedButton text='EstabelecimentoComercial' onPress={estabelecimentoComercialEntityScreen} testID='estabelecimentoComercialEntityScreenButton' />
        <RoundedButton text='AgendaEvento' onPress={agendaEventoEntityScreen} testID='agendaEventoEntityScreenButton' />
        <RoundedButton text='LojaMaconica' onPress={lojaMaconicaEntityScreen} testID='lojaMaconicaEntityScreenButton' />
        <RoundedButton text='ContatoLojaMaconica' onPress={contatoLojaMaconicaEntityScreen} testID='contatoLojaMaconicaEntityScreenButton' />
        <RoundedButton text='CategoriaEstabelecimento' onPress={categoriaEstabelecimentoEntityScreen} testID='categoriaEstabelecimentoEntityScreenButton' />
        <RoundedButton text='ComunicacaoPush' onPress={comunicacaoPushEntityScreen} testID='comunicacaoPushEntityScreenButton' />
        <RoundedButton text='Cupom' onPress={cupomEntityScreen} testID='cupomEntityScreenButton' />
        {/* {ignite-jhipster-entity-screen-needle} */}
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
