import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getPerfilUsuario, getPerfilUsuarios, updatePerfilUsuario, deletePerfilUsuario } from '../../../../../app/modules/entities/perfil-usuario/perfil-usuario.sagas'
import PerfilUsuarioActions from '../../../../../app/modules/entities/perfil-usuario/perfil-usuario.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getPerfilUsuario(1)
  const step = stepper(getPerfilUsuario(FixtureAPI, { perfilUsuarioId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PerfilUsuarioActions.perfilUsuarioSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getPerfilUsuario(FixtureAPI, { perfilUsuarioId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PerfilUsuarioActions.perfilUsuarioFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getPerfilUsuarios()
  const step = stepper(getPerfilUsuarios(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PerfilUsuarioActions.perfilUsuarioAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getPerfilUsuarios(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PerfilUsuarioActions.perfilUsuarioAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updatePerfilUsuario({id: 1})
  const step = stepper(updatePerfilUsuario(FixtureAPI, { perfilUsuario: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PerfilUsuarioActions.perfilUsuarioUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updatePerfilUsuario(FixtureAPI, { perfilUsuario: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PerfilUsuarioActions.perfilUsuarioUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deletePerfilUsuario({id: 1})
  const step = stepper(deletePerfilUsuario(FixtureAPI, { perfilUsuarioId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(PerfilUsuarioActions.perfilUsuarioDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deletePerfilUsuario(FixtureAPI, { perfilUsuarioId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(PerfilUsuarioActions.perfilUsuarioDeleteFailure()))
})
