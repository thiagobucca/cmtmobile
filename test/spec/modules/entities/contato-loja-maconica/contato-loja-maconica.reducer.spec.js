import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/contato-loja-maconica/contato-loja-maconica.reducer'

test('attempt retrieving a single contatoLojaMaconica', () => {
  const state = reducer(INITIAL_STATE, Actions.contatoLojaMaconicaRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.contatoLojaMaconica).toBe(null)
})

test('attempt retrieving a list of contatoLojaMaconica', () => {
  const state = reducer(INITIAL_STATE, Actions.contatoLojaMaconicaAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.contatoLojaMaconicas).toBe(null)
})

test('attempt updating a contatoLojaMaconica', () => {
  const state = reducer(INITIAL_STATE, Actions.contatoLojaMaconicaUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a contatoLojaMaconica', () => {
  const state = reducer(INITIAL_STATE, Actions.contatoLojaMaconicaDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a contatoLojaMaconica', () => {
  const state = reducer(INITIAL_STATE, Actions.contatoLojaMaconicaSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.contatoLojaMaconica).toEqual({id: 1})
})

test('success retrieving a list of contatoLojaMaconica', () => {
  const state = reducer(INITIAL_STATE, Actions.contatoLojaMaconicaAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.contatoLojaMaconicas).toEqual([{id: 1}, {id: 2}])
})

test('success updating a contatoLojaMaconica', () => {
  const state = reducer(INITIAL_STATE, Actions.contatoLojaMaconicaUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.contatoLojaMaconica).toEqual({id: 1})
})
test('success deleting a contatoLojaMaconica', () => {
  const state = reducer(INITIAL_STATE, Actions.contatoLojaMaconicaDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.contatoLojaMaconica).toEqual(null)
})

test('failure retrieving a contatoLojaMaconica', () => {
  const state = reducer(INITIAL_STATE, Actions.contatoLojaMaconicaFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.contatoLojaMaconica).toEqual(null)
})

test('failure retrieving a list of contatoLojaMaconica', () => {
  const state = reducer(INITIAL_STATE, Actions.contatoLojaMaconicaAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.contatoLojaMaconicas).toEqual(null)
})

test('failure updating a contatoLojaMaconica', () => {
  const state = reducer(INITIAL_STATE, Actions.contatoLojaMaconicaUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.contatoLojaMaconica).toEqual(INITIAL_STATE.contatoLojaMaconica)
})
test('failure deleting a contatoLojaMaconica', () => {
  const state = reducer(INITIAL_STATE, Actions.contatoLojaMaconicaDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.contatoLojaMaconica).toEqual(INITIAL_STATE.contatoLojaMaconica)
})
