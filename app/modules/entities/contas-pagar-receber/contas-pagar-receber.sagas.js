import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import ContasPagarReceberActions from './contas-pagar-receber.reducer'

export function * getContasPagarReceber (api, action) {
  const { contasPagarReceberId } = action
  // make the call to the api
  const apiCall = call(api.getContasPagarReceber, contasPagarReceberId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ContasPagarReceberActions.contasPagarReceberSuccess(response.data))
  } else {
    yield put(ContasPagarReceberActions.contasPagarReceberFailure(response.data))
  }
}

export function * getContasPagarRecebers (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getContasPagarRecebers, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ContasPagarReceberActions.contasPagarReceberAllSuccess(response.data))
  } else {
    yield put(ContasPagarReceberActions.contasPagarReceberAllFailure(response.data))
  }
}

export function * updateContasPagarReceber (api, action) {
  const { contasPagarReceber } = action
  // make the call to the api
  const idIsNotNull = !!contasPagarReceber.id
  const apiCall = call(idIsNotNull ? api.updateContasPagarReceber : api.createContasPagarReceber, contasPagarReceber)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ContasPagarReceberActions.contasPagarReceberUpdateSuccess(response.data))
  } else {
    yield put(ContasPagarReceberActions.contasPagarReceberUpdateFailure(response.data))
  }
}

export function * deleteContasPagarReceber (api, action) {
  const { contasPagarReceberId } = action
  // make the call to the api
  const apiCall = call(api.deleteContasPagarReceber, contasPagarReceberId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ContasPagarReceberActions.contasPagarReceberDeleteSuccess())
  } else {
    yield put(ContasPagarReceberActions.contasPagarReceberDeleteFailure(response.data))
  }
}
