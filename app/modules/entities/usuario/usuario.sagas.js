import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import UsuarioActions from './usuario.reducer'

export function * getUsuario (api, action) {
  const { usuarioId } = action
  // make the call to the api
  const apiCall = call(api.getUsuario, usuarioId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UsuarioActions.usuarioSuccess(response.data))
  } else {
    yield put(UsuarioActions.usuarioFailure(response.data))
  }
}

export function * getUsuarios (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getUsuarios, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UsuarioActions.usuarioAllSuccess(response.data))
  } else {
    yield put(UsuarioActions.usuarioAllFailure(response.data))
  }
}

export function * updateUsuario (api, action) {
  const { usuario } = action
  // make the call to the api
  const idIsNotNull = !!usuario.id
  const apiCall = call(idIsNotNull ? api.updateUsuario : api.createUsuario, usuario)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UsuarioActions.usuarioUpdateSuccess(response.data))
  } else {
    yield put(UsuarioActions.usuarioUpdateFailure(response.data))
  }
}

export function * deleteUsuario (api, action) {
  const { usuarioId } = action
  // make the call to the api
  const apiCall = call(api.deleteUsuario, usuarioId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UsuarioActions.usuarioDeleteSuccess())
  } else {
    yield put(UsuarioActions.usuarioDeleteFailure(response.data))
  }
}
