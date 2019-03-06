import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getUsuario, getUsuarios, updateUsuario, deleteUsuario } from '../../../../../app/modules/entities/usuario/usuario.sagas'
import UsuarioActions from '../../../../../app/modules/entities/usuario/usuario.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getUsuario(1)
  const step = stepper(getUsuario(FixtureAPI, { usuarioId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(UsuarioActions.usuarioSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getUsuario(FixtureAPI, { usuarioId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(UsuarioActions.usuarioFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getUsuarios()
  const step = stepper(getUsuarios(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(UsuarioActions.usuarioAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getUsuarios(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(UsuarioActions.usuarioAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateUsuario({id: 1})
  const step = stepper(updateUsuario(FixtureAPI, { usuario: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(UsuarioActions.usuarioUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateUsuario(FixtureAPI, { usuario: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(UsuarioActions.usuarioUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteUsuario({id: 1})
  const step = stepper(deleteUsuario(FixtureAPI, { usuarioId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(UsuarioActions.usuarioDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteUsuario(FixtureAPI, { usuarioId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(UsuarioActions.usuarioDeleteFailure()))
})
