import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/loja-maconica/loja-maconica.reducer'

test('attempt retrieving a single lojaMaconica', () => {
  const state = reducer(INITIAL_STATE, Actions.lojaMaconicaRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.lojaMaconica).toBe(null)
})

test('attempt retrieving a list of lojaMaconica', () => {
  const state = reducer(INITIAL_STATE, Actions.lojaMaconicaAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.lojaMaconicas).toBe(null)
})

test('attempt updating a lojaMaconica', () => {
  const state = reducer(INITIAL_STATE, Actions.lojaMaconicaUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a lojaMaconica', () => {
  const state = reducer(INITIAL_STATE, Actions.lojaMaconicaDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a lojaMaconica', () => {
  const state = reducer(INITIAL_STATE, Actions.lojaMaconicaSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.lojaMaconica).toEqual({id: 1})
})

test('success retrieving a list of lojaMaconica', () => {
  const state = reducer(INITIAL_STATE, Actions.lojaMaconicaAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.lojaMaconicas).toEqual([{id: 1}, {id: 2}])
})

test('success updating a lojaMaconica', () => {
  const state = reducer(INITIAL_STATE, Actions.lojaMaconicaUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.lojaMaconica).toEqual({id: 1})
})
test('success deleting a lojaMaconica', () => {
  const state = reducer(INITIAL_STATE, Actions.lojaMaconicaDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.lojaMaconica).toEqual(null)
})

test('failure retrieving a lojaMaconica', () => {
  const state = reducer(INITIAL_STATE, Actions.lojaMaconicaFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.lojaMaconica).toEqual(null)
})

test('failure retrieving a list of lojaMaconica', () => {
  const state = reducer(INITIAL_STATE, Actions.lojaMaconicaAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.lojaMaconicas).toEqual(null)
})

test('failure updating a lojaMaconica', () => {
  const state = reducer(INITIAL_STATE, Actions.lojaMaconicaUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.lojaMaconica).toEqual(INITIAL_STATE.lojaMaconica)
})
test('failure deleting a lojaMaconica', () => {
  const state = reducer(INITIAL_STATE, Actions.lojaMaconicaDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.lojaMaconica).toEqual(INITIAL_STATE.lojaMaconica)
})
