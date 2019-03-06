import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import ParametrizacaoActions from './parametrizacao.reducer'

export function * getParametrizacao (api, action) {
  const { parametrizacaoId } = action
  // make the call to the api
  const apiCall = call(api.getParametrizacao, parametrizacaoId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ParametrizacaoActions.parametrizacaoSuccess(response.data))
  } else {
    yield put(ParametrizacaoActions.parametrizacaoFailure(response.data))
  }
}

export function * getParametrizacaos (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getParametrizacaos, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ParametrizacaoActions.parametrizacaoAllSuccess(response.data))
  } else {
    yield put(ParametrizacaoActions.parametrizacaoAllFailure(response.data))
  }
}

export function * updateParametrizacao (api, action) {
  const { parametrizacao } = action
  // make the call to the api
  const idIsNotNull = !!parametrizacao.id
  const apiCall = call(idIsNotNull ? api.updateParametrizacao : api.createParametrizacao, parametrizacao)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ParametrizacaoActions.parametrizacaoUpdateSuccess(response.data))
  } else {
    yield put(ParametrizacaoActions.parametrizacaoUpdateFailure(response.data))
  }
}

export function * deleteParametrizacao (api, action) {
  const { parametrizacaoId } = action
  // make the call to the api
  const apiCall = call(api.deleteParametrizacao, parametrizacaoId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ParametrizacaoActions.parametrizacaoDeleteSuccess())
  } else {
    yield put(ParametrizacaoActions.parametrizacaoDeleteFailure(response.data))
  }
}
