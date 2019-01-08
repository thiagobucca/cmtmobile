import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  agendaEventoRequest: ['agendaEventoId'],
  agendaEventoAllRequest: ['options'],
  agendaEventoUpdateRequest: ['agendaEvento'],
  agendaEventoDeleteRequest: ['agendaEventoId'],

  agendaEventoSuccess: ['agendaEvento'],
  agendaEventoAllSuccess: ['agendaEventos'],
  agendaEventoUpdateSuccess: ['agendaEvento'],
  agendaEventoDeleteSuccess: [],

  agendaEventoFailure: ['error'],
  agendaEventoAllFailure: ['error'],
  agendaEventoUpdateFailure: ['error'],
  agendaEventoDeleteFailure: ['error']
})

export const AgendaEventoTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  agendaEvento: null,
  agendaEventos: null,
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
    agendaEvento: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    agendaEventos: null
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
  const { agendaEvento } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    agendaEvento
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { agendaEventos } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    agendaEventos
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { agendaEvento } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    agendaEvento
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    agendaEvento: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    agendaEvento: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    agendaEventos: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    agendaEvento: state.agendaEvento
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    agendaEvento: state.agendaEvento
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.AGENDA_EVENTO_REQUEST]: request,
  [Types.AGENDA_EVENTO_ALL_REQUEST]: allRequest,
  [Types.AGENDA_EVENTO_UPDATE_REQUEST]: updateRequest,
  [Types.AGENDA_EVENTO_DELETE_REQUEST]: deleteRequest,

  [Types.AGENDA_EVENTO_SUCCESS]: success,
  [Types.AGENDA_EVENTO_ALL_SUCCESS]: allSuccess,
  [Types.AGENDA_EVENTO_UPDATE_SUCCESS]: updateSuccess,
  [Types.AGENDA_EVENTO_DELETE_SUCCESS]: deleteSuccess,

  [Types.AGENDA_EVENTO_FAILURE]: failure,
  [Types.AGENDA_EVENTO_ALL_FAILURE]: allFailure,
  [Types.AGENDA_EVENTO_UPDATE_FAILURE]: updateFailure,
  [Types.AGENDA_EVENTO_DELETE_FAILURE]: deleteFailure
})
