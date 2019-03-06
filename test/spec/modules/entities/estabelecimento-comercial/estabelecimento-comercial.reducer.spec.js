import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/estabelecimento-comercial/estabelecimento-comercial.reducer'

test('attempt retrieving a single estabelecimentoComercial', () => {
  const state = reducer(INITIAL_STATE, Actions.estabelecimentoComercialRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.estabelecimentoComercial).toBe(null)
})

test('attempt retrieving a list of estabelecimentoComercial', () => {
  const state = reducer(INITIAL_STATE, Actions.estabelecimentoComercialAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.estabelecimentoComercials).toBe(null)
})

test('attempt updating a estabelecimentoComercial', () => {
  const state = reducer(INITIAL_STATE, Actions.estabelecimentoComercialUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a estabelecimentoComercial', () => {
  const state = reducer(INITIAL_STATE, Actions.estabelecimentoComercialDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a estabelecimentoComercial', () => {
  const state = reducer(INITIAL_STATE, Actions.estabelecimentoComercialSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.estabelecimentoComercial).toEqual({id: 1})
})

test('success retrieving a list of estabelecimentoComercial', () => {
  const state = reducer(INITIAL_STATE, Actions.estabelecimentoComercialAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.estabelecimentoComercials).toEqual([{id: 1}, {id: 2}])
})

test('success updating a estabelecimentoComercial', () => {
  const state = reducer(INITIAL_STATE, Actions.estabelecimentoComercialUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.estabelecimentoComercial).toEqual({id: 1})
})
test('success deleting a estabelecimentoComercial', () => {
  const state = reducer(INITIAL_STATE, Actions.estabelecimentoComercialDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.estabelecimentoComercial).toEqual(null)
})

test('failure retrieving a estabelecimentoComercial', () => {
  const state = reducer(INITIAL_STATE, Actions.estabelecimentoComercialFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.estabelecimentoComercial).toEqual(null)
})

test('failure retrieving a list of estabelecimentoComercial', () => {
  const state = reducer(INITIAL_STATE, Actions.estabelecimentoComercialAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.estabelecimentoComercials).toEqual(null)
})

test('failure updating a estabelecimentoComercial', () => {
  const state = reducer(INITIAL_STATE, Actions.estabelecimentoComercialUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.estabelecimentoComercial).toEqual(INITIAL_STATE.estabelecimentoComercial)
})
test('failure deleting a estabelecimentoComercial', () => {
  const state = reducer(INITIAL_STATE, Actions.estabelecimentoComercialDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.estabelecimentoComercial).toEqual(INITIAL_STATE.estabelecimentoComercial)
})
