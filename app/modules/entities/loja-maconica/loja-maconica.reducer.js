import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  lojaMaconicaRequest: ['lojaMaconicaId'],
  lojaMaconicaAllRequest: ['options'],
  lojaMaconicaUpdateRequest: ['lojaMaconica'],
  lojaMaconicaDeleteRequest: ['lojaMaconicaId'],

  lojaMaconicaSuccess: ['lojaMaconica'],
  lojaMaconicaAllSuccess: ['lojaMaconicas'],
  lojaMaconicaUpdateSuccess: ['lojaMaconica'],
  lojaMaconicaDeleteSuccess: [],

  lojaMaconicaFailure: ['error'],
  lojaMaconicaAllFailure: ['error'],
  lojaMaconicaUpdateFailure: ['error'],
  lojaMaconicaDeleteFailure: ['error']
})

export const LojaMaconicaTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  lojaMaconica: null,
  lojaMaconicas: null,
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
    lojaMaconica: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    lojaMaconicas: null
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
  const { lojaMaconica } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    lojaMaconica
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { lojaMaconicas } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    lojaMaconicas
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { lojaMaconica } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    lojaMaconica
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    lojaMaconica: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    lojaMaconica: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    lojaMaconicas: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    lojaMaconica: state.lojaMaconica
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    lojaMaconica: state.lojaMaconica
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOJA_MACONICA_REQUEST]: request,
  [Types.LOJA_MACONICA_ALL_REQUEST]: allRequest,
  [Types.LOJA_MACONICA_UPDATE_REQUEST]: updateRequest,
  [Types.LOJA_MACONICA_DELETE_REQUEST]: deleteRequest,

  [Types.LOJA_MACONICA_SUCCESS]: success,
  [Types.LOJA_MACONICA_ALL_SUCCESS]: allSuccess,
  [Types.LOJA_MACONICA_UPDATE_SUCCESS]: updateSuccess,
  [Types.LOJA_MACONICA_DELETE_SUCCESS]: deleteSuccess,

  [Types.LOJA_MACONICA_FAILURE]: failure,
  [Types.LOJA_MACONICA_ALL_FAILURE]: allFailure,
  [Types.LOJA_MACONICA_UPDATE_FAILURE]: updateFailure,
  [Types.LOJA_MACONICA_DELETE_FAILURE]: deleteFailure
})
