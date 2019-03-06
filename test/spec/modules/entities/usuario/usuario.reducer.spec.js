import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/usuario/usuario.reducer'

test('attempt retrieving a single usuario', () => {
  const state = reducer(INITIAL_STATE, Actions.usuarioRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.usuario).toBe(null)
})

test('attempt retrieving a list of usuario', () => {
  const state = reducer(INITIAL_STATE, Actions.usuarioAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.usuarios).toBe(null)
})

test('attempt updating a usuario', () => {
  const state = reducer(INITIAL_STATE, Actions.usuarioUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a usuario', () => {
  const state = reducer(INITIAL_STATE, Actions.usuarioDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a usuario', () => {
  const state = reducer(INITIAL_STATE, Actions.usuarioSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.usuario).toEqual({id: 1})
})

test('success retrieving a list of usuario', () => {
  const state = reducer(INITIAL_STATE, Actions.usuarioAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.usuarios).toEqual([{id: 1}, {id: 2}])
})

test('success updating a usuario', () => {
  const state = reducer(INITIAL_STATE, Actions.usuarioUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.usuario).toEqual({id: 1})
})
test('success deleting a usuario', () => {
  const state = reducer(INITIAL_STATE, Actions.usuarioDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.usuario).toEqual(null)
})

test('failure retrieving a usuario', () => {
  const state = reducer(INITIAL_STATE, Actions.usuarioFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.usuario).toEqual(null)
})

test('failure retrieving a list of usuario', () => {
  const state = reducer(INITIAL_STATE, Actions.usuarioAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.usuarios).toEqual(null)
})

test('failure updating a usuario', () => {
  const state = reducer(INITIAL_STATE, Actions.usuarioUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.usuario).toEqual(INITIAL_STATE.usuario)
})
test('failure deleting a usuario', () => {
  const state = reducer(INITIAL_STATE, Actions.usuarioDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.usuario).toEqual(INITIAL_STATE.usuario)
})
