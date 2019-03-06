import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  usuarioRequest: ['usuarioId'],
  usuarioAllRequest: ['options'],
  usuarioUpdateRequest: ['usuario'],
  usuarioDeleteRequest: ['usuarioId'],

  usuarioSuccess: ['usuario'],
  usuarioAllSuccess: ['usuarios'],
  usuarioUpdateSuccess: ['usuario'],
  usuarioDeleteSuccess: [],

  usuarioFailure: ['error'],
  usuarioAllFailure: ['error'],
  usuarioUpdateFailure: ['error'],
  usuarioDeleteFailure: ['error']
})

export const UsuarioTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  usuario: null,
  usuarios: null,
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
    usuario: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    usuarios: null
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
  const { usuario } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    usuario
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { usuarios } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    usuarios
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { usuario } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    usuario
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    usuario: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    usuario: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    usuarios: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    usuario: state.usuario
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    usuario: state.usuario
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USUARIO_REQUEST]: request,
  [Types.USUARIO_ALL_REQUEST]: allRequest,
  [Types.USUARIO_UPDATE_REQUEST]: updateRequest,
  [Types.USUARIO_DELETE_REQUEST]: deleteRequest,

  [Types.USUARIO_SUCCESS]: success,
  [Types.USUARIO_ALL_SUCCESS]: allSuccess,
  [Types.USUARIO_UPDATE_SUCCESS]: updateSuccess,
  [Types.USUARIO_DELETE_SUCCESS]: deleteSuccess,

  [Types.USUARIO_FAILURE]: failure,
  [Types.USUARIO_ALL_FAILURE]: allFailure,
  [Types.USUARIO_UPDATE_FAILURE]: updateFailure,
  [Types.USUARIO_DELETE_FAILURE]: deleteFailure
})
