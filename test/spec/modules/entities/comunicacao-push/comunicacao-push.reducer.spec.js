import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/comunicacao-push/comunicacao-push.reducer'

test('attempt retrieving a single comunicacaoPush', () => {
  const state = reducer(INITIAL_STATE, Actions.comunicacaoPushRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.comunicacaoPush).toBe(null)
})

test('attempt retrieving a list of comunicacaoPush', () => {
  const state = reducer(INITIAL_STATE, Actions.comunicacaoPushAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.comunicacaoPushes).toBe(null)
})

test('attempt updating a comunicacaoPush', () => {
  const state = reducer(INITIAL_STATE, Actions.comunicacaoPushUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a comunicacaoPush', () => {
  const state = reducer(INITIAL_STATE, Actions.comunicacaoPushDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a comunicacaoPush', () => {
  const state = reducer(INITIAL_STATE, Actions.comunicacaoPushSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.comunicacaoPush).toEqual({id: 1})
})

test('success retrieving a list of comunicacaoPush', () => {
  const state = reducer(INITIAL_STATE, Actions.comunicacaoPushAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.comunicacaoPushes).toEqual([{id: 1}, {id: 2}])
})

test('success updating a comunicacaoPush', () => {
  const state = reducer(INITIAL_STATE, Actions.comunicacaoPushUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.comunicacaoPush).toEqual({id: 1})
})
test('success deleting a comunicacaoPush', () => {
  const state = reducer(INITIAL_STATE, Actions.comunicacaoPushDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.comunicacaoPush).toEqual(null)
})

test('failure retrieving a comunicacaoPush', () => {
  const state = reducer(INITIAL_STATE, Actions.comunicacaoPushFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.comunicacaoPush).toEqual(null)
})

test('failure retrieving a list of comunicacaoPush', () => {
  const state = reducer(INITIAL_STATE, Actions.comunicacaoPushAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.comunicacaoPushes).toEqual(null)
})

test('failure updating a comunicacaoPush', () => {
  const state = reducer(INITIAL_STATE, Actions.comunicacaoPushUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.comunicacaoPush).toEqual(INITIAL_STATE.comunicacaoPush)
})
test('failure deleting a comunicacaoPush', () => {
  const state = reducer(INITIAL_STATE, Actions.comunicacaoPushDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.comunicacaoPush).toEqual(INITIAL_STATE.comunicacaoPush)
})
