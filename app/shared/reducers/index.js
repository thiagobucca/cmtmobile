import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'

import configureStore from './create-store'
import rootSaga from '../sagas'
import ReduxPersist from '../../config/redux-persist'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  appState: require('./app-state.reducer').reducer,
  users: require('./user.reducer').reducer,
  usuarios: require('../../modules/entities/usuario/usuario.reducer').reducer,
  perfilUsuarios: require('../../modules/entities/perfil-usuario/perfil-usuario.reducer').reducer,
  estabelecimentoComercials: require('../../modules/entities/estabelecimento-comercial/estabelecimento-comercial.reducer').reducer,
  agendaEventos: require('../../modules/entities/agenda-eventos/agenda-eventos.reducer').reducer,
  lojaMaconicas: require('../../modules/entities/loja-maconica/loja-maconica.reducer').reducer,
  contatoLojaMaconicas: require('../../modules/entities/contato-loja-maconica/contato-loja-maconica.reducer').reducer,
  categoriaEstabelecimentos: require('../../modules/entities/categoria-estabelecimento/categoria-estabelecimento.reducer').reducer,
  comunicacaoPushes: require('../../modules/entities/comunicacao-push/comunicacao-push.reducer').reducer,
  // ignite-jhipster-redux-store-import-needle
  account: require('./account.reducer').reducer,
  login: require('../../modules/login/login.reducer').reducer,
  register: require('../../modules/account/register/register.reducer').reducer,
  changePassword: require('../../modules/account/password/change-password.reducer').reducer,
  forgotPassword: require('../../modules/account/password-reset/forgot-password.reducer').reducer
})

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
