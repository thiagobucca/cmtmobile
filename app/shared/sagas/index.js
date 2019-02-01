import { takeLatest, all } from 'redux-saga/effects'
import API from '../services/api'
import FixtureAPI from '../services/fixture-api'
import DebugConfig from '../../config/debug-config'

/* ------------- Types ------------- */

import { StartupTypes } from '../reducers/startup.reducer'
import { LoginTypes } from '../../modules/login/login.reducer'
import { AccountTypes } from '../../shared/reducers/account.reducer'
import { RegisterTypes } from '../../modules/account/register/register.reducer'
import { ForgotPasswordTypes } from '../../modules/account/password-reset/forgot-password.reducer'
import { ChangePasswordTypes } from '../../modules/account/password/change-password.reducer'
import { UserTypes } from '../../shared/reducers/user.reducer'
import { AgendaEventosTypes } from '../../shared/reducers/agenda-eventos.reducer'
import { UsuarioTypes } from '../../modules/entities/usuario/usuario.reducer'
import { PerfilUsuarioTypes } from '../../modules/entities/perfil-usuario/perfil-usuario.reducer'
import { EstabelecimentoComercialTypes } from '../../modules/entities/estabelecimento-comercial/estabelecimento-comercial.reducer'
import { AgendaEventoTypes } from '../../modules/entities/agenda-eventos/agenda-eventos.reducer'
import { LojaMaconicaTypes } from '../../modules/entities/loja-maconica/loja-maconica.reducer'
import { ContatoLojaMaconicaTypes } from '../../modules/entities/contato-loja-maconica/contato-loja-maconica.reducer'
import { CategoriaEstabelecimentoTypes } from '../../modules/entities/categoria-estabelecimento/categoria-estabelecimento.reducer'
import { ComunicacaoPushTypes } from '../../modules/entities/comunicacao-push/comunicacao-push.reducer'
import { CupomTypes } from '../../modules/entities/cupom/cupom.reducer'
// ignite-jhipster-saga-redux-import-needle

/* ------------- Sagas ------------- */

import { startup } from './startup.saga'
import { login, logout, loginLoad } from '../../modules/login/login.sagas'
import { register } from '../../modules/account/register/register.sagas'
import { forgotPassword } from '../../modules/account/password-reset/forgot-password.sagas'
import { changePassword } from '../../modules/account/password/change-password.sagas'
import { getAccount, updateAccount } from '../../shared/sagas/account.sagas'
import { getUser, getUsers, updateUser, deleteUser } from '../../shared/sagas/user.sagas'
import { getUsuario, getUsuarios, updateUsuario, deleteUsuario } from '../../modules/entities/usuario/usuario.sagas'
import { getPerfilUsuario, getPerfilUsuarios, updatePerfilUsuario, deletePerfilUsuario } from '../../modules/entities/perfil-usuario/perfil-usuario.sagas'
import { getEstabelecimentoComercial, getEstabelecimentoComercials, updateEstabelecimentoComercial, deleteEstabelecimentoComercial } from '../../modules/entities/estabelecimento-comercial/estabelecimento-comercial.sagas'
import { getAgendaEvento, getAgendaEventos, updateAgendaEvento, deleteAgendaEvento } from '../../modules/entities/agenda-eventos/agenda-eventos.sagas'
import { getLojaMaconica, getLojaMaconicas, updateLojaMaconica, deleteLojaMaconica } from '../../modules/entities/loja-maconica/loja-maconica.sagas'
import { getContatoLojaMaconica, getContatoLojaMaconicas, updateContatoLojaMaconica, deleteContatoLojaMaconica } from '../../modules/entities/contato-loja-maconica/contato-loja-maconica.sagas'
import { getCategoriaEstabelecimento, getCategoriaEstabelecimentos, updateCategoriaEstabelecimento, deleteCategoriaEstabelecimento } from '../../modules/entities/categoria-estabelecimento/categoria-estabelecimento.sagas'
import { getComunicacaoPush, getComunicacaoPushes, updateComunicacaoPush, deleteComunicacaoPush } from '../../modules/entities/comunicacao-push/comunicacao-push.sagas'
import { getCupom, getCupoms, updateCupom, deleteCupom } from '../../modules/entities/cupom/cupom.sagas'
// ignite-jhipster-saga-method-import-needle

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // JHipster accounts
    takeLatest(LoginTypes.LOGIN_LOAD, loginLoad, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout, api),
    takeLatest(RegisterTypes.REGISTER_REQUEST, register, api),
    takeLatest(ForgotPasswordTypes.FORGOT_PASSWORD_REQUEST, forgotPassword, api),
    takeLatest(ChangePasswordTypes.CHANGE_PASSWORD_REQUEST, changePassword, api),

    takeLatest(UsuarioTypes.USUARIO_REQUEST, getUsuario, api),
    takeLatest(UsuarioTypes.USUARIO_ALL_REQUEST, getUsuarios, api),
    takeLatest(UsuarioTypes.USUARIO_UPDATE_REQUEST, updateUsuario, api),
    takeLatest(UsuarioTypes.USUARIO_DELETE_REQUEST, deleteUsuario, api),

    takeLatest(PerfilUsuarioTypes.PERFIL_USUARIO_REQUEST, getPerfilUsuario, api),
    takeLatest(PerfilUsuarioTypes.PERFIL_USUARIO_ALL_REQUEST, getPerfilUsuarios, api),
    takeLatest(PerfilUsuarioTypes.PERFIL_USUARIO_UPDATE_REQUEST, updatePerfilUsuario, api),
    takeLatest(PerfilUsuarioTypes.PERFIL_USUARIO_DELETE_REQUEST, deletePerfilUsuario, api),

    takeLatest(EstabelecimentoComercialTypes.ESTABELECIMENTO_COMERCIAL_REQUEST, getEstabelecimentoComercial, api),
    takeLatest(EstabelecimentoComercialTypes.ESTABELECIMENTO_COMERCIAL_ALL_REQUEST, getEstabelecimentoComercials, api),
    takeLatest(EstabelecimentoComercialTypes.ESTABELECIMENTO_COMERCIAL_UPDATE_REQUEST, updateEstabelecimentoComercial, api),
    takeLatest(EstabelecimentoComercialTypes.ESTABELECIMENTO_COMERCIAL_DELETE_REQUEST, deleteEstabelecimentoComercial, api),

    takeLatest(AgendaEventoTypes.AGENDA_EVENTO_REQUEST, getAgendaEvento, api),
    takeLatest(AgendaEventoTypes.AGENDA_EVENTO_ALL_REQUEST, getAgendaEventos, api),
    takeLatest(AgendaEventoTypes.AGENDA_EVENTO_UPDATE_REQUEST, updateAgendaEvento, api),
    takeLatest(AgendaEventoTypes.AGENDA_EVENTO_DELETE_REQUEST, deleteAgendaEvento, api),

    takeLatest(LojaMaconicaTypes.LOJA_MACONICA_REQUEST, getLojaMaconica, api),
    takeLatest(LojaMaconicaTypes.LOJA_MACONICA_ALL_REQUEST, getLojaMaconicas, api),
    takeLatest(LojaMaconicaTypes.LOJA_MACONICA_UPDATE_REQUEST, updateLojaMaconica, api),
    takeLatest(LojaMaconicaTypes.LOJA_MACONICA_DELETE_REQUEST, deleteLojaMaconica, api),

    takeLatest(ContatoLojaMaconicaTypes.CONTATO_LOJA_MACONICA_REQUEST, getContatoLojaMaconica, api),
    takeLatest(ContatoLojaMaconicaTypes.CONTATO_LOJA_MACONICA_ALL_REQUEST, getContatoLojaMaconicas, api),
    takeLatest(ContatoLojaMaconicaTypes.CONTATO_LOJA_MACONICA_UPDATE_REQUEST, updateContatoLojaMaconica, api),
    takeLatest(ContatoLojaMaconicaTypes.CONTATO_LOJA_MACONICA_DELETE_REQUEST, deleteContatoLojaMaconica, api),

    takeLatest(CategoriaEstabelecimentoTypes.CATEGORIA_ESTABELECIMENTO_REQUEST, getCategoriaEstabelecimento, api),
    takeLatest(CategoriaEstabelecimentoTypes.CATEGORIA_ESTABELECIMENTO_ALL_REQUEST, getCategoriaEstabelecimentos, api),
    takeLatest(CategoriaEstabelecimentoTypes.CATEGORIA_ESTABELECIMENTO_UPDATE_REQUEST, updateCategoriaEstabelecimento, api),
    takeLatest(CategoriaEstabelecimentoTypes.CATEGORIA_ESTABELECIMENTO_DELETE_REQUEST, deleteCategoriaEstabelecimento, api),

    takeLatest(ComunicacaoPushTypes.COMUNICACAO_PUSH_REQUEST, getComunicacaoPush, api),
    takeLatest(ComunicacaoPushTypes.COMUNICACAO_PUSH_ALL_REQUEST, getComunicacaoPushes, api),
    takeLatest(ComunicacaoPushTypes.COMUNICACAO_PUSH_UPDATE_REQUEST, updateComunicacaoPush, api),
    takeLatest(ComunicacaoPushTypes.COMUNICACAO_PUSH_DELETE_REQUEST, deleteComunicacaoPush, api),

    takeLatest(CupomTypes.CUPOM_REQUEST, getCupom, api),
    takeLatest(CupomTypes.CUPOM_ALL_REQUEST, getCupoms, api),
    takeLatest(CupomTypes.CUPOM_UPDATE_REQUEST, updateCupom, api),
    takeLatest(CupomTypes.CUPOM_DELETE_REQUEST, deleteCupom, api),
    // ignite-jhipster-saga-redux-connect-needle

    takeLatest(UserTypes.USER_REQUEST, getUser, api),
    takeLatest(UserTypes.USER_ALL_REQUEST, getUsers, api),
    takeLatest(UserTypes.USER_UPDATE_REQUEST, updateUser, api),
    takeLatest(UserTypes.USER_DELETE_REQUEST, deleteUser, api),

    takeLatest(AccountTypes.ACCOUNT_REQUEST, getAccount, api),
    takeLatest(AccountTypes.ACCOUNT_UPDATE_REQUEST, updateAccount, api),
    takeLatest(AgendaEventosTypes.AGENDA_EVENTOS_REQUEST, getAgendaEventos, api)
  ])
}
