import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/comunicacao-push-loja/comunicacao-push-loja.reducer'

test('attempt retrieving a single comunicacaoPushLoja', () => {
  const state = reducer(INITIAL_STATE, Actions.comunicacaoPushLojaRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.comunicacaoPushLoja).toBe(null)
})

test('attempt retrieving a list of comunicacaoPushLoja', () => {
  const state = reducer(INITIAL_STATE, Actions.comunicacaoPushLojaAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.comunicacaoPushLojas).toBe(null)
})

test('attempt updating a comunicacaoPushLoja', () => {
  const state = reducer(INITIAL_STATE, Actions.comunicacaoPushLojaUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a comunicacaoPushLoja', () => {
  const state = reducer(INITIAL_STATE, Actions.comunicacaoPushLojaDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a comunicacaoPushLoja', () => {
  const state = reducer(INITIAL_STATE, Actions.comunicacaoPushLojaSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.comunicacaoPushLoja).toEqual({id: 1})
})

test('success retrieving a list of comunicacaoPushLoja', () => {
  const state = reducer(INITIAL_STATE, Actions.comunicacaoPushLojaAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.comunicacaoPushLojas).toEqual([{id: 1}, {id: 2}])
})

test('success updating a comunicacaoPushLoja', () => {
  const state = reducer(INITIAL_STATE, Actions.comunicacaoPushLojaUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.comunicacaoPushLoja).toEqual({id: 1})
})
test('success deleting a comunicacaoPushLoja', () => {
  const state = reducer(INITIAL_STATE, Actions.comunicacaoPushLojaDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.comunicacaoPushLoja).toEqual(null)
})

test('failure retrieving a comunicacaoPushLoja', () => {
  const state = reducer(INITIAL_STATE, Actions.comunicacaoPushLojaFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.comunicacaoPushLoja).toEqual(null)
})

test('failure retrieving a list of comunicacaoPushLoja', () => {
  const state = reducer(INITIAL_STATE, Actions.comunicacaoPushLojaAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.comunicacaoPushLojas).toEqual(null)
})

test('failure updating a comunicacaoPushLoja', () => {
  const state = reducer(INITIAL_STATE, Actions.comunicacaoPushLojaUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.comunicacaoPushLoja).toEqual(INITIAL_STATE.comunicacaoPushLoja)
})
test('failure deleting a comunicacaoPushLoja', () => {
  const state = reducer(INITIAL_STATE, Actions.comunicacaoPushLojaDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.comunicacaoPushLoja).toEqual(INITIAL_STATE.comunicacaoPushLoja)
})
