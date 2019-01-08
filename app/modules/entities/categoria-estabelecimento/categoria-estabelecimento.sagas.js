import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import CategoriaEstabelecimentoActions from './categoria-estabelecimento.reducer'

export function * getCategoriaEstabelecimento (api, action) {
  const { categoriaEstabelecimentoId } = action
  // make the call to the api
  const apiCall = call(api.getCategoriaEstabelecimento, categoriaEstabelecimentoId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CategoriaEstabelecimentoActions.categoriaEstabelecimentoSuccess(response.data))
  } else {
    yield put(CategoriaEstabelecimentoActions.categoriaEstabelecimentoFailure(response.data))
  }
}

export function * getCategoriaEstabelecimentos (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getCategoriaEstabelecimentos, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CategoriaEstabelecimentoActions.categoriaEstabelecimentoAllSuccess(response.data))
  } else {
    yield put(CategoriaEstabelecimentoActions.categoriaEstabelecimentoAllFailure(response.data))
  }
}

export function * updateCategoriaEstabelecimento (api, action) {
  const { categoriaEstabelecimento } = action
  // make the call to the api
  const idIsNotNull = !!categoriaEstabelecimento.id
  const apiCall = call(idIsNotNull ? api.updateCategoriaEstabelecimento : api.createCategoriaEstabelecimento, categoriaEstabelecimento)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CategoriaEstabelecimentoActions.categoriaEstabelecimentoUpdateSuccess(response.data))
  } else {
    yield put(CategoriaEstabelecimentoActions.categoriaEstabelecimentoUpdateFailure(response.data))
  }
}

export function * deleteCategoriaEstabelecimento (api, action) {
  const { categoriaEstabelecimentoId } = action
  // make the call to the api
  const apiCall = call(api.deleteCategoriaEstabelecimento, categoriaEstabelecimentoId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CategoriaEstabelecimentoActions.categoriaEstabelecimentoDeleteSuccess())
  } else {
    yield put(CategoriaEstabelecimentoActions.categoriaEstabelecimentoDeleteFailure(response.data))
  }
}
