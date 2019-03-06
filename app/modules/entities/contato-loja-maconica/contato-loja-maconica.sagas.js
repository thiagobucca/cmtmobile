import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import ContatoLojaMaconicaActions from './contato-loja-maconica.reducer'

export function * getContatoLojaMaconica (api, action) {
  const { contatoLojaMaconicaId } = action
  // make the call to the api
  const apiCall = call(api.getContatoLojaMaconica, contatoLojaMaconicaId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ContatoLojaMaconicaActions.contatoLojaMaconicaSuccess(response.data))
  } else {
    yield put(ContatoLojaMaconicaActions.contatoLojaMaconicaFailure(response.data))
  }
}

export function * getContatoLojaMaconicas (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getContatoLojaMaconicas, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ContatoLojaMaconicaActions.contatoLojaMaconicaAllSuccess(response.data))
  } else {
    yield put(ContatoLojaMaconicaActions.contatoLojaMaconicaAllFailure(response.data))
  }
}

export function * updateContatoLojaMaconica (api, action) {
  const { contatoLojaMaconica } = action
  // make the call to the api
  const idIsNotNull = !!contatoLojaMaconica.id
  const apiCall = call(idIsNotNull ? api.updateContatoLojaMaconica : api.createContatoLojaMaconica, contatoLojaMaconica)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ContatoLojaMaconicaActions.contatoLojaMaconicaUpdateSuccess(response.data))
  } else {
    yield put(ContatoLojaMaconicaActions.contatoLojaMaconicaUpdateFailure(response.data))
  }
}

export function * deleteContatoLojaMaconica (api, action) {
  const { contatoLojaMaconicaId } = action
  // make the call to the api
  const apiCall = call(api.deleteContatoLojaMaconica, contatoLojaMaconicaId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ContatoLojaMaconicaActions.contatoLojaMaconicaDeleteSuccess())
  } else {
    yield put(ContatoLojaMaconicaActions.contatoLojaMaconicaDeleteFailure(response.data))
  }
}
