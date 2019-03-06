import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/perfil-usuario/perfil-usuario.reducer'

test('attempt retrieving a single perfilUsuario', () => {
  const state = reducer(INITIAL_STATE, Actions.perfilUsuarioRequest({id: 1}))

  expect(state.fetchingOne).toBe(true)
  expect(state.perfilUsuario).toBe(null)
})

test('attempt retrieving a list of perfilUsuario', () => {
  const state = reducer(INITIAL_STATE, Actions.perfilUsuarioAllRequest({id: 1}))

  expect(state.fetchingAll).toBe(true)
  expect(state.perfilUsuarios).toBe(null)
})

test('attempt updating a perfilUsuario', () => {
  const state = reducer(INITIAL_STATE, Actions.perfilUsuarioUpdateRequest({id: 1}))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a perfilUsuario', () => {
  const state = reducer(INITIAL_STATE, Actions.perfilUsuarioDeleteRequest({id: 1}))

  expect(state.deleting).toBe(true)
})

test('success retrieving a perfilUsuario', () => {
  const state = reducer(INITIAL_STATE, Actions.perfilUsuarioSuccess({id: 1}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.perfilUsuario).toEqual({id: 1})
})

test('success retrieving a list of perfilUsuario', () => {
  const state = reducer(INITIAL_STATE, Actions.perfilUsuarioAllSuccess([{id: 1}, {id: 2}]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.perfilUsuarios).toEqual([{id: 1}, {id: 2}])
})

test('success updating a perfilUsuario', () => {
  const state = reducer(INITIAL_STATE, Actions.perfilUsuarioUpdateSuccess({id: 1}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.perfilUsuario).toEqual({id: 1})
})
test('success deleting a perfilUsuario', () => {
  const state = reducer(INITIAL_STATE, Actions.perfilUsuarioDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.perfilUsuario).toEqual(null)
})

test('failure retrieving a perfilUsuario', () => {
  const state = reducer(INITIAL_STATE, Actions.perfilUsuarioFailure({error: 'Not found'}))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({error: 'Not found'})
  expect(state.perfilUsuario).toEqual(null)
})

test('failure retrieving a list of perfilUsuario', () => {
  const state = reducer(INITIAL_STATE, Actions.perfilUsuarioAllFailure({error: 'Not found'}))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({error: 'Not found'})
  expect(state.perfilUsuarios).toEqual(null)
})

test('failure updating a perfilUsuario', () => {
  const state = reducer(INITIAL_STATE, Actions.perfilUsuarioUpdateFailure({error: 'Not found'}))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({error: 'Not found'})
  expect(state.perfilUsuario).toEqual(INITIAL_STATE.perfilUsuario)
})
test('failure deleting a perfilUsuario', () => {
  const state = reducer(INITIAL_STATE, Actions.perfilUsuarioDeleteFailure({error: 'Not found'}))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({error: 'Not found'})
  expect(state.perfilUsuario).toEqual(INITIAL_STATE.perfilUsuario)
})
