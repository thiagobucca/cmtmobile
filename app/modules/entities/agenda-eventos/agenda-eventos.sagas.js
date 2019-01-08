import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import AgendaEventoActions from './agenda-eventos.reducer'

export function * getAgendaEvento (api, action) {
  const { agendaEventoId } = action
  // make the call to the api
  const apiCall = call(api.getAgendaEvento, agendaEventoId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(AgendaEventoActions.agendaEventoSuccess(response.data))
  } else {
    yield put(AgendaEventoActions.agendaEventoFailure(response.data))
  }
}

export function * getAgendaEventos (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getAgendaEventos, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(AgendaEventoActions.agendaEventoAllSuccess(response.data))
  } else {
    yield put(AgendaEventoActions.agendaEventoAllFailure(response.data))
  }
}

export function * updateAgendaEvento (api, action) {
  const { agendaEvento } = action
  // make the call to the api
  const idIsNotNull = !!agendaEvento.id
  const apiCall = call(idIsNotNull ? api.updateAgendaEvento : api.createAgendaEvento, agendaEvento)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(AgendaEventoActions.agendaEventoUpdateSuccess(response.data))
  } else {
    yield put(AgendaEventoActions.agendaEventoUpdateFailure(response.data))
  }
}

export function * deleteAgendaEvento (api, action) {
  const { agendaEventoId } = action
  // make the call to the api
  const apiCall = call(api.deleteAgendaEvento, agendaEventoId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(AgendaEventoActions.agendaEventoDeleteSuccess())
  } else {
    yield put(AgendaEventoActions.agendaEventoDeleteFailure(response.data))
  }
}
