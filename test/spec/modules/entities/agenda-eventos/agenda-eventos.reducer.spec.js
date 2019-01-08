import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/agenda-eventos/agenda-eventos.reducer'

test('attempt retrieving a single agendaEvento', () => {
  const state = reducer(INITIAL_STATE, Actions.agendaEventoRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.agendaEvento).toBe(null)
})

test('attempt retrieving a list of agendaEvento', () => {
  const state = reducer(INITIAL_STATE, Actions.agendaEventoAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.agendaEventos).toBe(null)
})

test('attempt updating a agendaEvento', () => {
  const state = reducer(INITIAL_STATE, Actions.agendaEventoUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a agendaEvento', () => {
  const state = reducer(INITIAL_STATE, Actions.agendaEventoDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a agendaEvento', () => {
  const state = reducer(INITIAL_STATE, Actions.agendaEventoSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.agendaEvento).toEqual({id: 1})
})

test('success retrieving a list of agendaEvento', () => {
  const state = reducer(INITIAL_STATE, Actions.agendaEventoAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.agendaEventos).toEqual([{id: 1}, {id: 2}])
})

test('success updating a agendaEvento', () => {
  const state = reducer(INITIAL_STATE, Actions.agendaEventoUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.agendaEvento).toEqual({id: 1})
})
test('success deleting a agendaEvento', () => {
  const state = reducer(INITIAL_STATE, Actions.agendaEventoDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.agendaEvento).toEqual(null)
})

test('failure retrieving a agendaEvento', () => {
  const state = reducer(INITIAL_STATE, Actions.agendaEventoFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.agendaEvento).toEqual(null)
})

test('failure retrieving a list of agendaEvento', () => {
  const state = reducer(INITIAL_STATE, Actions.agendaEventoAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.agendaEventos).toEqual(null)
})

test('failure updating a agendaEvento', () => {
  const state = reducer(INITIAL_STATE, Actions.agendaEventoUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.agendaEvento).toEqual(INITIAL_STATE.agendaEvento)
})
test('failure deleting a agendaEvento', () => {
  const state = reducer(INITIAL_STATE, Actions.agendaEventoDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.agendaEvento).toEqual(INITIAL_STATE.agendaEvento)
})
