import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import CupomActions from './cupom.reducer'

export function * getCupom (api, action) {
  const { cupomId } = action
  // make the call to the api
  const apiCall = call(api.getCupom, cupomId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CupomActions.cupomSuccess(response.data))
  } else {
    yield put(CupomActions.cupomFailure(response.data))
  }
}

export function * getCupoms (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getCupoms, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CupomActions.cupomAllSuccess(response.data))
  } else {
    yield put(CupomActions.cupomAllFailure(response.data))
  }
}

export function * updateCupom (api, action) {
  const { cupom } = action
  // make the call to the api
  const idIsNotNull = !!cupom.id
  const apiCall = call(idIsNotNull ? api.updateCupom : api.createCupom, cupom)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CupomActions.cupomUpdateSuccess(response.data))
  } else {
    yield put(CupomActions.cupomUpdateFailure(response.data))
  }
}

export function * deleteCupom (api, action) {
  const { cupomId } = action
  // make the call to the api
  const apiCall = call(api.deleteCupom, cupomId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CupomActions.cupomDeleteSuccess())
  } else {
    yield put(CupomActions.cupomDeleteFailure(response.data))
  }
}
