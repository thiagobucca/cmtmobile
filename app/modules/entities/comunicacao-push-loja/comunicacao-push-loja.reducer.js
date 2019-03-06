import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  comunicacaoPushLojaRequest: ['comunicacaoPushLojaId'],
  comunicacaoPushLojaAllRequest: ['options'],
  comunicacaoPushLojaUpdateRequest: ['comunicacaoPushLoja'],
  comunicacaoPushLojaDeleteRequest: ['comunicacaoPushLojaId'],

  comunicacaoPushLojaSuccess: ['comunicacaoPushLoja'],
  comunicacaoPushLojaAllSuccess: ['comunicacaoPushLojas'],
  comunicacaoPushLojaUpdateSuccess: ['comunicacaoPushLoja'],
  comunicacaoPushLojaDeleteSuccess: [],

  comunicacaoPushLojaFailure: ['error'],
  comunicacaoPushLojaAllFailure: ['error'],
  comunicacaoPushLojaUpdateFailure: ['error'],
  comunicacaoPushLojaDeleteFailure: ['error']
})

export const ComunicacaoPushLojaTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  comunicacaoPushLoja: null,
  comunicacaoPushLojas: null,
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorDeleting: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    comunicacaoPushLoja: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    comunicacaoPushLojas: null
  })

// request to update from an api
export const updateRequest = (state) =>
  state.merge({
    updating: true
  })
// request to delete from an api
export const deleteRequest = (state) =>
  state.merge({
    deleting: true
  })

// successful api lookup for single entity
export const success = (state, action) => {
  const { comunicacaoPushLoja } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    comunicacaoPushLoja
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { comunicacaoPushLojas } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    comunicacaoPushLojas
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { comunicacaoPushLoja } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    comunicacaoPushLoja
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    comunicacaoPushLoja: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    comunicacaoPushLoja: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    comunicacaoPushLojas: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    comunicacaoPushLoja: state.comunicacaoPushLoja
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    comunicacaoPushLoja: state.comunicacaoPushLoja
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.COMUNICACAO_PUSH_LOJA_REQUEST]: request,
  [Types.COMUNICACAO_PUSH_LOJA_ALL_REQUEST]: allRequest,
  [Types.COMUNICACAO_PUSH_LOJA_UPDATE_REQUEST]: updateRequest,
  [Types.COMUNICACAO_PUSH_LOJA_DELETE_REQUEST]: deleteRequest,

  [Types.COMUNICACAO_PUSH_LOJA_SUCCESS]: success,
  [Types.COMUNICACAO_PUSH_LOJA_ALL_SUCCESS]: allSuccess,
  [Types.COMUNICACAO_PUSH_LOJA_UPDATE_SUCCESS]: updateSuccess,
  [Types.COMUNICACAO_PUSH_LOJA_DELETE_SUCCESS]: deleteSuccess,

  [Types.COMUNICACAO_PUSH_LOJA_FAILURE]: failure,
  [Types.COMUNICACAO_PUSH_LOJA_ALL_FAILURE]: allFailure,
  [Types.COMUNICACAO_PUSH_LOJA_UPDATE_FAILURE]: updateFailure,
  [Types.COMUNICACAO_PUSH_LOJA_DELETE_FAILURE]: deleteFailure
})
