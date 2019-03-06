import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import EstabelecimentoComercialActions from './estabelecimento-comercial.reducer'

export function * getEstabelecimentoComercial (api, action) {
  const { estabelecimentoComercialId } = action
  // make the call to the api
  const apiCall = call(api.getEstabelecimentoComercial, estabelecimentoComercialId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(EstabelecimentoComercialActions.estabelecimentoComercialSuccess(response.data))
  } else {
    yield put(EstabelecimentoComercialActions.estabelecimentoComercialFailure(response.data))
  }
}

export function * getEstabelecimentoComercials (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getEstabelecimentoComercials, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(EstabelecimentoComercialActions.estabelecimentoComercialAllSuccess(response.data))
  } else {
    yield put(EstabelecimentoComercialActions.estabelecimentoComercialAllFailure(response.data))
  }
}

export function * updateEstabelecimentoComercial (api, action) {
  const { estabelecimentoComercial } = action
  // make the call to the api
  const idIsNotNull = !!estabelecimentoComercial.id
  const apiCall = call(idIsNotNull ? api.updateEstabelecimentoComercial : api.createEstabelecimentoComercial, estabelecimentoComercial)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(EstabelecimentoComercialActions.estabelecimentoComercialUpdateSuccess(response.data))
  } else {
    yield put(EstabelecimentoComercialActions.estabelecimentoComercialUpdateFailure(response.data))
  }
}

export function * deleteEstabelecimentoComercial (api, action) {
  const { estabelecimentoComercialId } = action
  // make the call to the api
  const apiCall = call(api.deleteEstabelecimentoComercial, estabelecimentoComercialId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(EstabelecimentoComercialActions.estabelecimentoComercialDeleteSuccess())
  } else {
    yield put(EstabelecimentoComercialActions.estabelecimentoComercialDeleteFailure(response.data))
  }
}
