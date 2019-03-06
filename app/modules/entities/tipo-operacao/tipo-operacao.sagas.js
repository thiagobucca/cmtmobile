import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import TipoOperacaoActions from './tipo-operacao.reducer'

export function * getTipoOperacao (api, action) {
  const { tipoOperacaoId } = action
  // make the call to the api
  const apiCall = call(api.getTipoOperacao, tipoOperacaoId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TipoOperacaoActions.tipoOperacaoSuccess(response.data))
  } else {
    yield put(TipoOperacaoActions.tipoOperacaoFailure(response.data))
  }
}

export function * getTipoOperacaos (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getTipoOperacaos, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TipoOperacaoActions.tipoOperacaoAllSuccess(response.data))
  } else {
    yield put(TipoOperacaoActions.tipoOperacaoAllFailure(response.data))
  }
}

export function * updateTipoOperacao (api, action) {
  const { tipoOperacao } = action
  // make the call to the api
  const idIsNotNull = !!tipoOperacao.id
  const apiCall = call(idIsNotNull ? api.updateTipoOperacao : api.createTipoOperacao, tipoOperacao)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TipoOperacaoActions.tipoOperacaoUpdateSuccess(response.data))
  } else {
    yield put(TipoOperacaoActions.tipoOperacaoUpdateFailure(response.data))
  }
}

export function * deleteTipoOperacao (api, action) {
  const { tipoOperacaoId } = action
  // make the call to the api
  const apiCall = call(api.deleteTipoOperacao, tipoOperacaoId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(TipoOperacaoActions.tipoOperacaoDeleteSuccess())
  } else {
    yield put(TipoOperacaoActions.tipoOperacaoDeleteFailure(response.data))
  }
}
