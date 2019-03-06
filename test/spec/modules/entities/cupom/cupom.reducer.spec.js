import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/cupom/cupom.reducer'

test('attempt retrieving a single cupom', () => {
  const state = reducer(INITIAL_STATE, Actions.cupomRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.cupom).toBe(null)
})

test('attempt retrieving a list of cupom', () => {
  const state = reducer(INITIAL_STATE, Actions.cupomAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.cupoms).toBe(null)
})

test('attempt updating a cupom', () => {
  const state = reducer(INITIAL_STATE, Actions.cupomUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a cupom', () => {
  const state = reducer(INITIAL_STATE, Actions.cupomDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a cupom', () => {
  const state = reducer(INITIAL_STATE, Actions.cupomSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.cupom).toEqual({id: 1})
})

test('success retrieving a list of cupom', () => {
  const state = reducer(INITIAL_STATE, Actions.cupomAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.cupoms).toEqual([{id: 1}, {id: 2}])
})

test('success updating a cupom', () => {
  const state = reducer(INITIAL_STATE, Actions.cupomUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.cupom).toEqual({id: 1})
})
test('success deleting a cupom', () => {
  const state = reducer(INITIAL_STATE, Actions.cupomDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.cupom).toEqual(null)
})

test('failure retrieving a cupom', () => {
  const state = reducer(INITIAL_STATE, Actions.cupomFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.cupom).toEqual(null)
})

test('failure retrieving a list of cupom', () => {
  const state = reducer(INITIAL_STATE, Actions.cupomAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.cupoms).toEqual(null)
})

test('failure updating a cupom', () => {
  const state = reducer(INITIAL_STATE, Actions.cupomUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.cupom).toEqual(INITIAL_STATE.cupom)
})
test('failure deleting a cupom', () => {
  const state = reducer(INITIAL_STATE, Actions.cupomDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.cupom).toEqual(INITIAL_STATE.cupom)
})
