import { call, put } from 'redux-saga/effects'

import AgendaEventosActions from '../reducers/agenda-eventos.reducer'
import { callApi } from './call-api.saga'

// attempts to agendaEventos
export function * getAgendaEventos (api) {
  const response = yield call(api.getAgendaEventos)

  // success?
  if (response.ok) {
   // console.tron.log('AgendaEventos - OK')
    yield put(AgendaEventosActions.agendaEventosSuccess(response.data))
  } else {
   // console.tron.log('AgendaEventos - FAIL')
    yield put(AgendaEventosActions.agendaEventosFailure('WRONG'))
  }
}
