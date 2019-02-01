import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  cupomRequest: ['cupomId'],
  cupomAllRequest: ['options'],
  cupomUpdateRequest: ['cupom'],
  cupomDeleteRequest: ['cupomId'],

  cupomSuccess: ['cupom'],
  cupomAllSuccess: ['cupoms'],
  cupomUpdateSuccess: ['cupom'],
  cupomDeleteSuccess: [],

  cupomFailure: ['error'],
  cupomAllFailure: ['error'],
  cupomUpdateFailure: ['error'],
  cupomDeleteFailure: ['error']
})

export const CupomTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  cupom: null,
  cupoms: null,
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
    cupom: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    cupoms: null
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
  const { cupom } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    cupom
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { cupoms } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    cupoms
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { cupom } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    cupom
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    cupom: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    cupom: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    cupoms: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    cupom: state.cupom
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    cupom: state.cupom
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CUPOM_REQUEST]: request,
  [Types.CUPOM_ALL_REQUEST]: allRequest,
  [Types.CUPOM_UPDATE_REQUEST]: updateRequest,
  [Types.CUPOM_DELETE_REQUEST]: deleteRequest,

  [Types.CUPOM_SUCCESS]: success,
  [Types.CUPOM_ALL_SUCCESS]: allSuccess,
  [Types.CUPOM_UPDATE_SUCCESS]: updateSuccess,
  [Types.CUPOM_DELETE_SUCCESS]: deleteSuccess,

  [Types.CUPOM_FAILURE]: failure,
  [Types.CUPOM_ALL_FAILURE]: allFailure,
  [Types.CUPOM_UPDATE_FAILURE]: updateFailure,
  [Types.CUPOM_DELETE_FAILURE]: deleteFailure
})
