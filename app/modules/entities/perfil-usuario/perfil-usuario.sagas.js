import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import PerfilUsuarioActions from './perfil-usuario.reducer'

export function * getPerfilUsuario (api, action) {
  const { perfilUsuarioId } = action
  // make the call to the api
  const apiCall = call(api.getPerfilUsuario, perfilUsuarioId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(PerfilUsuarioActions.perfilUsuarioSuccess(response.data))
  } else {
    yield put(PerfilUsuarioActions.perfilUsuarioFailure(response.data))
  }
}

export function * getPerfilUsuarios (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getPerfilUsuarios, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(PerfilUsuarioActions.perfilUsuarioAllSuccess(response.data))
  } else {
    yield put(PerfilUsuarioActions.perfilUsuarioAllFailure(response.data))
  }
}

export function * updatePerfilUsuario (api, action) {
  const { perfilUsuario } = action
  // make the call to the api
  const idIsNotNull = !!perfilUsuario.id
  const apiCall = call(idIsNotNull ? api.updatePerfilUsuario : api.createPerfilUsuario, perfilUsuario)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(PerfilUsuarioActions.perfilUsuarioUpdateSuccess(response.data))
  } else {
    yield put(PerfilUsuarioActions.perfilUsuarioUpdateFailure(response.data))
  }
}

export function * deletePerfilUsuario (api, action) {
  const { perfilUsuarioId } = action
  // make the call to the api
  const apiCall = call(api.deletePerfilUsuario, perfilUsuarioId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(PerfilUsuarioActions.perfilUsuarioDeleteSuccess())
  } else {
    yield put(PerfilUsuarioActions.perfilUsuarioDeleteFailure(response.data))
  }
}
