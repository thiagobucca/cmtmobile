import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import ComunicacaoPushActions from './comunicacao-push.reducer'

export function * getComunicacaoPush (api, action) {
  const { comunicacaoPushId } = action
  // make the call to the api
  const apiCall = call(api.getComunicacaoPush, comunicacaoPushId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ComunicacaoPushActions.comunicacaoPushSuccess(response.data))
  } else {
    yield put(ComunicacaoPushActions.comunicacaoPushFailure(response.data))
  }
}

export function * getComunicacaoPushes (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getComunicacaoPushes, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ComunicacaoPushActions.comunicacaoPushAllSuccess(response.data))
  } else {
    yield put(ComunicacaoPushActions.comunicacaoPushAllFailure(response.data))
  }
}

export function * updateComunicacaoPush (api, action) {
  const { comunicacaoPush } = action
  // make the call to the api
  const idIsNotNull = !!comunicacaoPush.id
  const apiCall = call(idIsNotNull ? api.updateComunicacaoPush : api.createComunicacaoPush, comunicacaoPush)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ComunicacaoPushActions.comunicacaoPushUpdateSuccess(response.data))
  } else {
    yield put(ComunicacaoPushActions.comunicacaoPushUpdateFailure(response.data))
  }
}

export function * deleteComunicacaoPush (api, action) {
  const { comunicacaoPushId } = action
  // make the call to the api
  const apiCall = call(api.deleteComunicacaoPush, comunicacaoPushId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ComunicacaoPushActions.comunicacaoPushDeleteSuccess())
  } else {
    yield put(ComunicacaoPushActions.comunicacaoPushDeleteFailure(response.data))
  }
}
