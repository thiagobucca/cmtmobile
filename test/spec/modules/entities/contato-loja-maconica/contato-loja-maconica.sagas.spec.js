import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getContatoLojaMaconica, getContatoLojaMaconicas, updateContatoLojaMaconica, deleteContatoLojaMaconica } from '../../../../../app/modules/entities/contato-loja-maconica/contato-loja-maconica.sagas'
import ContatoLojaMaconicaActions from '../../../../../app/modules/entities/contato-loja-maconica/contato-loja-maconica.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getContatoLojaMaconica(1)
  const step = stepper(getContatoLojaMaconica(FixtureAPI, { contatoLojaMaconicaId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ContatoLojaMaconicaActions.contatoLojaMaconicaSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getContatoLojaMaconica(FixtureAPI, { contatoLojaMaconicaId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ContatoLojaMaconicaActions.contatoLojaMaconicaFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getContatoLojaMaconicas()
  const step = stepper(getContatoLojaMaconicas(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ContatoLojaMaconicaActions.contatoLojaMaconicaAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getContatoLojaMaconicas(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ContatoLojaMaconicaActions.contatoLojaMaconicaAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateContatoLojaMaconica({id: 1})
  const step = stepper(updateContatoLojaMaconica(FixtureAPI, { contatoLojaMaconica: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ContatoLojaMaconicaActions.contatoLojaMaconicaUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateContatoLojaMaconica(FixtureAPI, { contatoLojaMaconica: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ContatoLojaMaconicaActions.contatoLojaMaconicaUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteContatoLojaMaconica({id: 1})
  const step = stepper(deleteContatoLojaMaconica(FixtureAPI, { contatoLojaMaconicaId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ContatoLojaMaconicaActions.contatoLojaMaconicaDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteContatoLojaMaconica(FixtureAPI, { contatoLojaMaconicaId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ContatoLojaMaconicaActions.contatoLojaMaconicaDeleteFailure()))
})
