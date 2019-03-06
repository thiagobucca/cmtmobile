import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  tipoOperacaoRequest: ['tipoOperacaoId'],
  tipoOperacaoAllRequest: ['options'],
  tipoOperacaoUpdateRequest: ['tipoOperacao'],
  tipoOperacaoDeleteRequest: ['tipoOperacaoId'],

  tipoOperacaoSuccess: ['tipoOperacao'],
  tipoOperacaoAllSuccess: ['tipoOperacaos'],
  tipoOperacaoUpdateSuccess: ['tipoOperacao'],
  tipoOperacaoDeleteSuccess: [],

  tipoOperacaoFailure: ['error'],
  tipoOperacaoAllFailure: ['error'],
  tipoOperacaoUpdateFailure: ['error'],
  tipoOperacaoDeleteFailure: ['error']
})

export const TipoOperacaoTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  tipoOperacao: null,
  tipoOperacaos: null,
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
    tipoOperacao: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    tipoOperacaos: null
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
  const { tipoOperacao } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    tipoOperacao
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { tipoOperacaos } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    tipoOperacaos
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { tipoOperacao } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    tipoOperacao
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    tipoOperacao: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    tipoOperacao: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    tipoOperacaos: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    tipoOperacao: state.tipoOperacao
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    tipoOperacao: state.tipoOperacao
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TIPO_OPERACAO_REQUEST]: request,
  [Types.TIPO_OPERACAO_ALL_REQUEST]: allRequest,
  [Types.TIPO_OPERACAO_UPDATE_REQUEST]: updateRequest,
  [Types.TIPO_OPERACAO_DELETE_REQUEST]: deleteRequest,

  [Types.TIPO_OPERACAO_SUCCESS]: success,
  [Types.TIPO_OPERACAO_ALL_SUCCESS]: allSuccess,
  [Types.TIPO_OPERACAO_UPDATE_SUCCESS]: updateSuccess,
  [Types.TIPO_OPERACAO_DELETE_SUCCESS]: deleteSuccess,

  [Types.TIPO_OPERACAO_FAILURE]: failure,
  [Types.TIPO_OPERACAO_ALL_FAILURE]: allFailure,
  [Types.TIPO_OPERACAO_UPDATE_FAILURE]: updateFailure,
  [Types.TIPO_OPERACAO_DELETE_FAILURE]: deleteFailure
})
