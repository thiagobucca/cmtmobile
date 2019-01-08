import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  contatoLojaMaconicaRequest: ['contatoLojaMaconicaId'],
  contatoLojaMaconicaAllRequest: ['options'],
  contatoLojaMaconicaUpdateRequest: ['contatoLojaMaconica'],
  contatoLojaMaconicaDeleteRequest: ['contatoLojaMaconicaId'],

  contatoLojaMaconicaSuccess: ['contatoLojaMaconica'],
  contatoLojaMaconicaAllSuccess: ['contatoLojaMaconicas'],
  contatoLojaMaconicaUpdateSuccess: ['contatoLojaMaconica'],
  contatoLojaMaconicaDeleteSuccess: [],

  contatoLojaMaconicaFailure: ['error'],
  contatoLojaMaconicaAllFailure: ['error'],
  contatoLojaMaconicaUpdateFailure: ['error'],
  contatoLojaMaconicaDeleteFailure: ['error']
})

export const ContatoLojaMaconicaTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  contatoLojaMaconica: null,
  contatoLojaMaconicas: null,
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
    contatoLojaMaconica: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    contatoLojaMaconicas: null
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
  const { contatoLojaMaconica } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    contatoLojaMaconica
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { contatoLojaMaconicas } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    contatoLojaMaconicas
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { contatoLojaMaconica } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    contatoLojaMaconica
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    contatoLojaMaconica: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    contatoLojaMaconica: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    contatoLojaMaconicas: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    contatoLojaMaconica: state.contatoLojaMaconica
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    contatoLojaMaconica: state.contatoLojaMaconica
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CONTATO_LOJA_MACONICA_REQUEST]: request,
  [Types.CONTATO_LOJA_MACONICA_ALL_REQUEST]: allRequest,
  [Types.CONTATO_LOJA_MACONICA_UPDATE_REQUEST]: updateRequest,
  [Types.CONTATO_LOJA_MACONICA_DELETE_REQUEST]: deleteRequest,

  [Types.CONTATO_LOJA_MACONICA_SUCCESS]: success,
  [Types.CONTATO_LOJA_MACONICA_ALL_SUCCESS]: allSuccess,
  [Types.CONTATO_LOJA_MACONICA_UPDATE_SUCCESS]: updateSuccess,
  [Types.CONTATO_LOJA_MACONICA_DELETE_SUCCESS]: deleteSuccess,

  [Types.CONTATO_LOJA_MACONICA_FAILURE]: failure,
  [Types.CONTATO_LOJA_MACONICA_ALL_FAILURE]: allFailure,
  [Types.CONTATO_LOJA_MACONICA_UPDATE_FAILURE]: updateFailure,
  [Types.CONTATO_LOJA_MACONICA_DELETE_FAILURE]: deleteFailure
})
