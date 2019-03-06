import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/contas-pagar-receber/contas-pagar-receber.reducer'

test('attempt retrieving a single contasPagarReceber', () => {
  const state = reducer(INITIAL_STATE, Actions.contasPagarReceberRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.contasPagarReceber).toBe(null)
})

test('attempt retrieving a list of contasPagarReceber', () => {
  const state = reducer(INITIAL_STATE, Actions.contasPagarReceberAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.contasPagarRecebers).toBe(null)
})

test('attempt updating a contasPagarReceber', () => {
  const state = reducer(INITIAL_STATE, Actions.contasPagarReceberUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a contasPagarReceber', () => {
  const state = reducer(INITIAL_STATE, Actions.contasPagarReceberDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a contasPagarReceber', () => {
  const state = reducer(INITIAL_STATE, Actions.contasPagarReceberSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.contasPagarReceber).toEqual({id: 1})
})

test('success retrieving a list of contasPagarReceber', () => {
  const state = reducer(INITIAL_STATE, Actions.contasPagarReceberAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.contasPagarRecebers).toEqual([{id: 1}, {id: 2}])
})

test('success updating a contasPagarReceber', () => {
  const state = reducer(INITIAL_STATE, Actions.contasPagarReceberUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.contasPagarReceber).toEqual({id: 1})
})
test('success deleting a contasPagarReceber', () => {
  const state = reducer(INITIAL_STATE, Actions.contasPagarReceberDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.contasPagarReceber).toEqual(null)
})

test('failure retrieving a contasPagarReceber', () => {
  const state = reducer(INITIAL_STATE, Actions.contasPagarReceberFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.contasPagarReceber).toEqual(null)
})

test('failure retrieving a list of contasPagarReceber', () => {
  const state = reducer(INITIAL_STATE, Actions.contasPagarReceberAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.contasPagarRecebers).toEqual(null)
})

test('failure updating a contasPagarReceber', () => {
  const state = reducer(INITIAL_STATE, Actions.contasPagarReceberUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.contasPagarReceber).toEqual(INITIAL_STATE.contasPagarReceber)
})
test('failure deleting a contasPagarReceber', () => {
  const state = reducer(INITIAL_STATE, Actions.contasPagarReceberDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.contasPagarReceber).toEqual(INITIAL_STATE.contasPagarReceber)
})
