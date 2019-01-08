import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/categoria-estabelecimento/categoria-estabelecimento.reducer'

test('attempt retrieving a single categoriaEstabelecimento', () => {
  const state = reducer(INITIAL_STATE, Actions.categoriaEstabelecimentoRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.categoriaEstabelecimento).toBe(null)
})

test('attempt retrieving a list of categoriaEstabelecimento', () => {
  const state = reducer(INITIAL_STATE, Actions.categoriaEstabelecimentoAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.categoriaEstabelecimentos).toBe(null)
})

test('attempt updating a categoriaEstabelecimento', () => {
  const state = reducer(INITIAL_STATE, Actions.categoriaEstabelecimentoUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a categoriaEstabelecimento', () => {
  const state = reducer(INITIAL_STATE, Actions.categoriaEstabelecimentoDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a categoriaEstabelecimento', () => {
  const state = reducer(INITIAL_STATE, Actions.categoriaEstabelecimentoSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.categoriaEstabelecimento).toEqual({id: 1})
})

test('success retrieving a list of categoriaEstabelecimento', () => {
  const state = reducer(INITIAL_STATE, Actions.categoriaEstabelecimentoAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.categoriaEstabelecimentos).toEqual([{id: 1}, {id: 2}])
})

test('success updating a categoriaEstabelecimento', () => {
  const state = reducer(INITIAL_STATE, Actions.categoriaEstabelecimentoUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.categoriaEstabelecimento).toEqual({id: 1})
})
test('success deleting a categoriaEstabelecimento', () => {
  const state = reducer(INITIAL_STATE, Actions.categoriaEstabelecimentoDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.categoriaEstabelecimento).toEqual(null)
})

test('failure retrieving a categoriaEstabelecimento', () => {
  const state = reducer(INITIAL_STATE, Actions.categoriaEstabelecimentoFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.categoriaEstabelecimento).toEqual(null)
})

test('failure retrieving a list of categoriaEstabelecimento', () => {
  const state = reducer(INITIAL_STATE, Actions.categoriaEstabelecimentoAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.categoriaEstabelecimentos).toEqual(null)
})

test('failure updating a categoriaEstabelecimento', () => {
  const state = reducer(INITIAL_STATE, Actions.categoriaEstabelecimentoUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.categoriaEstabelecimento).toEqual(INITIAL_STATE.categoriaEstabelecimento)
})
test('failure deleting a categoriaEstabelecimento', () => {
  const state = reducer(INITIAL_STATE, Actions.categoriaEstabelecimentoDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.categoriaEstabelecimento).toEqual(INITIAL_STATE.categoriaEstabelecimento)
})
