import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  comunicacaoPushRequest: ['comunicacaoPushId'],
  comunicacaoPushAllRequest: ['options'],
  comunicacaoPushUpdateRequest: ['comunicacaoPush'],
  comunicacaoPushDeleteRequest: ['comunicacaoPushId'],

  comunicacaoPushSuccess: ['comunicacaoPush'],
  comunicacaoPushAllSuccess: ['comunicacaoPushes'],
  comunicacaoPushUpdateSuccess: ['comunicacaoPush'],
  comunicacaoPushDeleteSuccess: [],

  comunicacaoPushFailure: ['error'],
  comunicacaoPushAllFailure: ['error'],
  comunicacaoPushUpdateFailure: ['error'],
  comunicacaoPushDeleteFailure: ['error']
})

export const ComunicacaoPushTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  comunicacaoPush: null,
  comunicacaoPushes: null,
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
    comunicacaoPush: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    comunicacaoPushes: null
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
  const { comunicacaoPush } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    comunicacaoPush
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { comunicacaoPushes } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    comunicacaoPushes
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { comunicacaoPush } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    comunicacaoPush
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    comunicacaoPush: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    comunicacaoPush: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    comunicacaoPushes: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    comunicacaoPush: state.comunicacaoPush
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    comunicacaoPush: state.comunicacaoPush
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.COMUNICACAO_PUSH_REQUEST]: request,
  [Types.COMUNICACAO_PUSH_ALL_REQUEST]: allRequest,
  [Types.COMUNICACAO_PUSH_UPDATE_REQUEST]: updateRequest,
  [Types.COMUNICACAO_PUSH_DELETE_REQUEST]: deleteRequest,

  [Types.COMUNICACAO_PUSH_SUCCESS]: success,
  [Types.COMUNICACAO_PUSH_ALL_SUCCESS]: allSuccess,
  [Types.COMUNICACAO_PUSH_UPDATE_SUCCESS]: updateSuccess,
  [Types.COMUNICACAO_PUSH_DELETE_SUCCESS]: deleteSuccess,

  [Types.COMUNICACAO_PUSH_FAILURE]: failure,
  [Types.COMUNICACAO_PUSH_ALL_FAILURE]: allFailure,
  [Types.COMUNICACAO_PUSH_UPDATE_FAILURE]: updateFailure,
  [Types.COMUNICACAO_PUSH_DELETE_FAILURE]: deleteFailure
})
