import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import ComunicacaoPushLojaActions from './comunicacao-push-loja.reducer'

export function * getComunicacaoPushLoja (api, action) {
  const { comunicacaoPushLojaId } = action
  // make the call to the api
  const apiCall = call(api.getComunicacaoPushLoja, comunicacaoPushLojaId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ComunicacaoPushLojaActions.comunicacaoPushLojaSuccess(response.data))
  } else {
    yield put(ComunicacaoPushLojaActions.comunicacaoPushLojaFailure(response.data))
  }
}

export function * getComunicacaoPushLojas (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getComunicacaoPushLojas, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ComunicacaoPushLojaActions.comunicacaoPushLojaAllSuccess(response.data))
  } else {
    yield put(ComunicacaoPushLojaActions.comunicacaoPushLojaAllFailure(response.data))
  }
}

export function * updateComunicacaoPushLoja (api, action) {
  const { comunicacaoPushLoja } = action
  // make the call to the api
  const idIsNotNull = !!comunicacaoPushLoja.id
  const apiCall = call(idIsNotNull ? api.updateComunicacaoPushLoja : api.createComunicacaoPushLoja, comunicacaoPushLoja)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ComunicacaoPushLojaActions.comunicacaoPushLojaUpdateSuccess(response.data))
  } else {
    yield put(ComunicacaoPushLojaActions.comunicacaoPushLojaUpdateFailure(response.data))
  }
}

export function * deleteComunicacaoPushLoja (api, action) {
  const { comunicacaoPushLojaId } = action
  // make the call to the api
  const apiCall = call(api.deleteComunicacaoPushLoja, comunicacaoPushLojaId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ComunicacaoPushLojaActions.comunicacaoPushLojaDeleteSuccess())
  } else {
    yield put(ComunicacaoPushLojaActions.comunicacaoPushLojaDeleteFailure(response.data))
  }
}
