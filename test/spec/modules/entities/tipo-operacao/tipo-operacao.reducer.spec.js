import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/tipo-operacao/tipo-operacao.reducer'

test('attempt retrieving a single tipoOperacao', () => {
  const state = reducer(INITIAL_STATE, Actions.tipoOperacaoRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.tipoOperacao).toBe(null)
})

test('attempt retrieving a list of tipoOperacao', () => {
  const state = reducer(INITIAL_STATE, Actions.tipoOperacaoAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.tipoOperacaos).toBe(null)
})

test('attempt updating a tipoOperacao', () => {
  const state = reducer(INITIAL_STATE, Actions.tipoOperacaoUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a tipoOperacao', () => {
  const state = reducer(INITIAL_STATE, Actions.tipoOperacaoDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a tipoOperacao', () => {
  const state = reducer(INITIAL_STATE, Actions.tipoOperacaoSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.tipoOperacao).toEqual({id: 1})
})

test('success retrieving a list of tipoOperacao', () => {
  const state = reducer(INITIAL_STATE, Actions.tipoOperacaoAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.tipoOperacaos).toEqual([{id: 1}, {id: 2}])
})

test('success updating a tipoOperacao', () => {
  const state = reducer(INITIAL_STATE, Actions.tipoOperacaoUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.tipoOperacao).toEqual({id: 1})
})
test('success deleting a tipoOperacao', () => {
  const state = reducer(INITIAL_STATE, Actions.tipoOperacaoDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.tipoOperacao).toEqual(null)
})

test('failure retrieving a tipoOperacao', () => {
  const state = reducer(INITIAL_STATE, Actions.tipoOperacaoFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.tipoOperacao).toEqual(null)
})

test('failure retrieving a list of tipoOperacao', () => {
  const state = reducer(INITIAL_STATE, Actions.tipoOperacaoAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.tipoOperacaos).toEqual(null)
})

test('failure updating a tipoOperacao', () => {
  const state = reducer(INITIAL_STATE, Actions.tipoOperacaoUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.tipoOperacao).toEqual(INITIAL_STATE.tipoOperacao)
})
test('failure deleting a tipoOperacao', () => {
  const state = reducer(INITIAL_STATE, Actions.tipoOperacaoDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.tipoOperacao).toEqual(INITIAL_STATE.tipoOperacao)
})
