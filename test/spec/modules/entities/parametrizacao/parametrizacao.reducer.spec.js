import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/parametrizacao/parametrizacao.reducer'

test('attempt retrieving a single parametrizacao', () => {
  const state = reducer(INITIAL_STATE, Actions.parametrizacaoRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.parametrizacao).toBe(null)
})

test('attempt retrieving a list of parametrizacao', () => {
  const state = reducer(INITIAL_STATE, Actions.parametrizacaoAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.parametrizacaos).toBe(null)
})

test('attempt updating a parametrizacao', () => {
  const state = reducer(INITIAL_STATE, Actions.parametrizacaoUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a parametrizacao', () => {
  const state = reducer(INITIAL_STATE, Actions.parametrizacaoDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a parametrizacao', () => {
  const state = reducer(INITIAL_STATE, Actions.parametrizacaoSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.parametrizacao).toEqual({id: 1})
})

test('success retrieving a list of parametrizacao', () => {
  const state = reducer(INITIAL_STATE, Actions.parametrizacaoAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.parametrizacaos).toEqual([{id: 1}, {id: 2}])
})

test('success updating a parametrizacao', () => {
  const state = reducer(INITIAL_STATE, Actions.parametrizacaoUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.parametrizacao).toEqual({id: 1})
})
test('success deleting a parametrizacao', () => {
  const state = reducer(INITIAL_STATE, Actions.parametrizacaoDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.parametrizacao).toEqual(null)
})

test('failure retrieving a parametrizacao', () => {
  const state = reducer(INITIAL_STATE, Actions.parametrizacaoFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.parametrizacao).toEqual(null)
})

test('failure retrieving a list of parametrizacao', () => {
  const state = reducer(INITIAL_STATE, Actions.parametrizacaoAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.parametrizacaos).toEqual(null)
})

test('failure updating a parametrizacao', () => {
  const state = reducer(INITIAL_STATE, Actions.parametrizacaoUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.parametrizacao).toEqual(INITIAL_STATE.parametrizacao)
})
test('failure deleting a parametrizacao', () => {
  const state = reducer(INITIAL_STATE, Actions.parametrizacaoDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.parametrizacao).toEqual(INITIAL_STATE.parametrizacao)
})
