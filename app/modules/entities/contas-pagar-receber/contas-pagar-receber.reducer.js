import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  contasPagarReceberRequest: ['contasPagarReceberId'],
  contasPagarReceberAllRequest: ['options'],
  contasPagarReceberUpdateRequest: ['contasPagarReceber'],
  contasPagarReceberDeleteRequest: ['contasPagarReceberId'],

  contasPagarReceberSuccess: ['contasPagarReceber'],
  contasPagarReceberAllSuccess: ['contasPagarRecebers'],
  contasPagarReceberUpdateSuccess: ['contasPagarReceber'],
  contasPagarReceberDeleteSuccess: [],

  contasPagarReceberFailure: ['error'],
  contasPagarReceberAllFailure: ['error'],
  contasPagarReceberUpdateFailure: ['error'],
  contasPagarReceberDeleteFailure: ['error']
})

export const ContasPagarReceberTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  contasPagarReceber: null,
  contasPagarRecebers: null,
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
    contasPagarReceber: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    contasPagarRecebers: null
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
  const { contasPagarReceber } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    contasPagarReceber
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { contasPagarRecebers } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    contasPagarRecebers
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { contasPagarReceber } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    contasPagarReceber
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    contasPagarReceber: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    contasPagarReceber: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    contasPagarRecebers: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    contasPagarReceber: state.contasPagarReceber
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    contasPagarReceber: state.contasPagarReceber
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CONTAS_PAGAR_RECEBER_REQUEST]: request,
  [Types.CONTAS_PAGAR_RECEBER_ALL_REQUEST]: allRequest,
  [Types.CONTAS_PAGAR_RECEBER_UPDATE_REQUEST]: updateRequest,
  [Types.CONTAS_PAGAR_RECEBER_DELETE_REQUEST]: deleteRequest,

  [Types.CONTAS_PAGAR_RECEBER_SUCCESS]: success,
  [Types.CONTAS_PAGAR_RECEBER_ALL_SUCCESS]: allSuccess,
  [Types.CONTAS_PAGAR_RECEBER_UPDATE_SUCCESS]: updateSuccess,
  [Types.CONTAS_PAGAR_RECEBER_DELETE_SUCCESS]: deleteSuccess,

  [Types.CONTAS_PAGAR_RECEBER_FAILURE]: failure,
  [Types.CONTAS_PAGAR_RECEBER_ALL_FAILURE]: allFailure,
  [Types.CONTAS_PAGAR_RECEBER_UPDATE_FAILURE]: updateFailure,
  [Types.CONTAS_PAGAR_RECEBER_DELETE_FAILURE]: deleteFailure
})
