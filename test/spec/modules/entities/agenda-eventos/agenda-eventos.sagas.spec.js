import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getAgendaEvento, getAgendaEventos, updateAgendaEvento, deleteAgendaEvento } from '../../../../../app/modules/entities/agenda-eventos/agenda-eventos.sagas'
import AgendaEventoActions from '../../../../../app/modules/entities/agenda-eventos/agenda-eventos.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getAgendaEvento(1)
  const step = stepper(getAgendaEvento(FixtureAPI, { agendaEventoId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AgendaEventoActions.agendaEventoSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getAgendaEvento(FixtureAPI, { agendaEventoId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AgendaEventoActions.agendaEventoFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getAgendaEventos()
  const step = stepper(getAgendaEventos(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AgendaEventoActions.agendaEventoAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getAgendaEventos(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AgendaEventoActions.agendaEventoAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateAgendaEvento({id: 1})
  const step = stepper(updateAgendaEvento(FixtureAPI, { agendaEvento: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AgendaEventoActions.agendaEventoUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateAgendaEvento(FixtureAPI, { agendaEvento: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AgendaEventoActions.agendaEventoUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteAgendaEvento({id: 1})
  const step = stepper(deleteAgendaEvento(FixtureAPI, { agendaEventoId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AgendaEventoActions.agendaEventoDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteAgendaEvento(FixtureAPI, { agendaEventoId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AgendaEventoActions.agendaEventoDeleteFailure()))
})
