import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  parametrizacaoRequest: ['parametrizacaoId'],
  parametrizacaoAllRequest: ['options'],
  parametrizacaoUpdateRequest: ['parametrizacao'],
  parametrizacaoDeleteRequest: ['parametrizacaoId'],

  parametrizacaoSuccess: ['parametrizacao'],
  parametrizacaoAllSuccess: ['parametrizacaos'],
  parametrizacaoUpdateSuccess: ['parametrizacao'],
  parametrizacaoDeleteSuccess: [],

  parametrizacaoFailure: ['error'],
  parametrizacaoAllFailure: ['error'],
  parametrizacaoUpdateFailure: ['error'],
  parametrizacaoDeleteFailure: ['error']
})

export const ParametrizacaoTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  parametrizacao: null,
  parametrizacaos: null,
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
    parametrizacao: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    parametrizacaos: null
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
  const { parametrizacao } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    parametrizacao
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { parametrizacaos } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    parametrizacaos
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { parametrizacao } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    parametrizacao
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    parametrizacao: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    parametrizacao: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    parametrizacaos: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    parametrizacao: state.parametrizacao
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    parametrizacao: state.parametrizacao
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PARAMETRIZACAO_REQUEST]: request,
  [Types.PARAMETRIZACAO_ALL_REQUEST]: allRequest,
  [Types.PARAMETRIZACAO_UPDATE_REQUEST]: updateRequest,
  [Types.PARAMETRIZACAO_DELETE_REQUEST]: deleteRequest,

  [Types.PARAMETRIZACAO_SUCCESS]: success,
  [Types.PARAMETRIZACAO_ALL_SUCCESS]: allSuccess,
  [Types.PARAMETRIZACAO_UPDATE_SUCCESS]: updateSuccess,
  [Types.PARAMETRIZACAO_DELETE_SUCCESS]: deleteSuccess,

  [Types.PARAMETRIZACAO_FAILURE]: failure,
  [Types.PARAMETRIZACAO_ALL_FAILURE]: allFailure,
  [Types.PARAMETRIZACAO_UPDATE_FAILURE]: updateFailure,
  [Types.PARAMETRIZACAO_DELETE_FAILURE]: deleteFailure
})
