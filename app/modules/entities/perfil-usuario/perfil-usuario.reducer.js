import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  perfilUsuarioRequest: ['perfilUsuarioId'],
  perfilUsuarioAllRequest: ['options'],
  perfilUsuarioUpdateRequest: ['perfilUsuario'],
  perfilUsuarioDeleteRequest: ['perfilUsuarioId'],

  perfilUsuarioSuccess: ['perfilUsuario'],
  perfilUsuarioAllSuccess: ['perfilUsuarios'],
  perfilUsuarioUpdateSuccess: ['perfilUsuario'],
  perfilUsuarioDeleteSuccess: [],

  perfilUsuarioFailure: ['error'],
  perfilUsuarioAllFailure: ['error'],
  perfilUsuarioUpdateFailure: ['error'],
  perfilUsuarioDeleteFailure: ['error']
})

export const PerfilUsuarioTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  perfilUsuario: null,
  perfilUsuarios: null,
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
    perfilUsuario: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    perfilUsuarios: null
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
  const { perfilUsuario } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    perfilUsuario
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { perfilUsuarios } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    perfilUsuarios
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { perfilUsuario } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    perfilUsuario
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    perfilUsuario: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    perfilUsuario: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    perfilUsuarios: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    perfilUsuario: state.perfilUsuario
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    perfilUsuario: state.perfilUsuario
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PERFIL_USUARIO_REQUEST]: request,
  [Types.PERFIL_USUARIO_ALL_REQUEST]: allRequest,
  [Types.PERFIL_USUARIO_UPDATE_REQUEST]: updateRequest,
  [Types.PERFIL_USUARIO_DELETE_REQUEST]: deleteRequest,

  [Types.PERFIL_USUARIO_SUCCESS]: success,
  [Types.PERFIL_USUARIO_ALL_SUCCESS]: allSuccess,
  [Types.PERFIL_USUARIO_UPDATE_SUCCESS]: updateSuccess,
  [Types.PERFIL_USUARIO_DELETE_SUCCESS]: deleteSuccess,

  [Types.PERFIL_USUARIO_FAILURE]: failure,
  [Types.PERFIL_USUARIO_ALL_FAILURE]: allFailure,
  [Types.PERFIL_USUARIO_UPDATE_FAILURE]: updateFailure,
  [Types.PERFIL_USUARIO_DELETE_FAILURE]: deleteFailure
})
