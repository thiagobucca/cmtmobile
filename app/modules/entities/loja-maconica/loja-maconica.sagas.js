import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import LojaMaconicaActions from './loja-maconica.reducer'

export function * getLojaMaconica (api, action) {
  const { lojaMaconicaId } = action
  // make the call to the api
  const apiCall = call(api.getLojaMaconica, lojaMaconicaId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(LojaMaconicaActions.lojaMaconicaSuccess(response.data))
  } else {
    yield put(LojaMaconicaActions.lojaMaconicaFailure(response.data))
  }
}

export function * getLojaMaconicas (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getLojaMaconicas, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(LojaMaconicaActions.lojaMaconicaAllSuccess(response.data))
  } else {
    yield put(LojaMaconicaActions.lojaMaconicaAllFailure(response.data))
  }
}

export function * updateLojaMaconica (api, action) {
  const { lojaMaconica } = action
  // make the call to the api
  const idIsNotNull = !!lojaMaconica.id
  const apiCall = call(idIsNotNull ? api.updateLojaMaconica : api.createLojaMaconica, lojaMaconica)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(LojaMaconicaActions.lojaMaconicaUpdateSuccess(response.data))
  } else {
    yield put(LojaMaconicaActions.lojaMaconicaUpdateFailure(response.data))
  }
}

export function * deleteLojaMaconica (api, action) {
  const { lojaMaconicaId } = action
  // make the call to the api
  const apiCall = call(api.deleteLojaMaconica, lojaMaconicaId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(LojaMaconicaActions.lojaMaconicaDeleteSuccess())
  } else {
    yield put(LojaMaconicaActions.lojaMaconicaDeleteFailure(response.data))
  }
}
