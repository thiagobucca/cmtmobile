import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  agendaEventosRequest: [],
  agendaEventosSuccess: ['agendaEventos'],
  agendaEventosFailure: ['error'],
  agendaEventosUpdateRequest: ['agendaEventos'],
  agendaEventosUpdateSuccess: [],
  agendaEventosUpdateFailure: ['error']
})

export const AgendaEventosTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  agendaEventos: null,
  error: null,
  fetching: false,
  updating: false
})

/* ------------- Reducers ------------- */

// we're attempting to agendaEventos
export const request = (state) => state.merge({ fetching: true })

// we've successfully logged in
export const success = (state, data) => {
  const { agendaEventos } = data
  return state.merge({ fetching: false, error: null, agendaEventos })
}

// we've had a problem getting the agendaEventos
export const failure = (state, { error }) => state.merge({ fetching: false, updating: false, agendaEventos: null, error })

// we're attempting to updating agendaEventos settings
export const updateRequest = (state) => state.merge({ updating: true })

// we've successfully updated the agendaEventos settings
export const updateSuccess = (state) => state.merge({ error: null, updating: false })

// we've had a problem updating the agendaEventos settings
export const updateFailure = (state, { error }) => state.merge({ updating: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.AGENDA_EVENTOS_REQUEST]: request,
  [Types.AGENDA_EVENTOS_SUCCESS]: success,
  [Types.AGENDA_EVENTOS_FAILURE]: failure,
  [Types.AGENDA_EVENTOS_UPDATE_REQUEST]: updateRequest,
  [Types.AGENDA_EVENTOS_UPDATE_SUCCESS]: updateSuccess,
  [Types.AGENDA_EVENTOS_UPDATE_FAILURE]: updateFailure
})

/* ------------- Selectors ------------- */
// Is the current user logged in?
export const isLoggedIn = agendaEventosState => agendaEventosState.agendaEventos !== null

export const getLogin = agendaEventosState => agendaEventosState.agendaEventos !== null ? agendaEventosState.agendaEventos.login : 'anonymousUser'
