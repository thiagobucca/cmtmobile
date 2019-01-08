import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  estabelecimentoComercialRequest: ['estabelecimentoComercialId'],
  estabelecimentoComercialAllRequest: ['options'],
  estabelecimentoComercialUpdateRequest: ['estabelecimentoComercial'],
  estabelecimentoComercialDeleteRequest: ['estabelecimentoComercialId'],

  estabelecimentoComercialSuccess: ['estabelecimentoComercial'],
  estabelecimentoComercialAllSuccess: ['estabelecimentoComercials'],
  estabelecimentoComercialUpdateSuccess: ['estabelecimentoComercial'],
  estabelecimentoComercialDeleteSuccess: [],

  estabelecimentoComercialFailure: ['error'],
  estabelecimentoComercialAllFailure: ['error'],
  estabelecimentoComercialUpdateFailure: ['error'],
  estabelecimentoComercialDeleteFailure: ['error']
})

export const EstabelecimentoComercialTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  estabelecimentoComercial: null,
  estabelecimentoComercials: null,
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
    estabelecimentoComercial: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    estabelecimentoComercials: null
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
  const { estabelecimentoComercial } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    estabelecimentoComercial
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { estabelecimentoComercials } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    estabelecimentoComercials
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { estabelecimentoComercial } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    estabelecimentoComercial
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    estabelecimentoComercial: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    estabelecimentoComercial: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    estabelecimentoComercials: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    estabelecimentoComercial: state.estabelecimentoComercial
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    estabelecimentoComercial: state.estabelecimentoComercial
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ESTABELECIMENTO_COMERCIAL_REQUEST]: request,
  [Types.ESTABELECIMENTO_COMERCIAL_ALL_REQUEST]: allRequest,
  [Types.ESTABELECIMENTO_COMERCIAL_UPDATE_REQUEST]: updateRequest,
  [Types.ESTABELECIMENTO_COMERCIAL_DELETE_REQUEST]: deleteRequest,

  [Types.ESTABELECIMENTO_COMERCIAL_SUCCESS]: success,
  [Types.ESTABELECIMENTO_COMERCIAL_ALL_SUCCESS]: allSuccess,
  [Types.ESTABELECIMENTO_COMERCIAL_UPDATE_SUCCESS]: updateSuccess,
  [Types.ESTABELECIMENTO_COMERCIAL_DELETE_SUCCESS]: deleteSuccess,

  [Types.ESTABELECIMENTO_COMERCIAL_FAILURE]: failure,
  [Types.ESTABELECIMENTO_COMERCIAL_ALL_FAILURE]: allFailure,
  [Types.ESTABELECIMENTO_COMERCIAL_UPDATE_FAILURE]: updateFailure,
  [Types.ESTABELECIMENTO_COMERCIAL_DELETE_FAILURE]: deleteFailure
})
