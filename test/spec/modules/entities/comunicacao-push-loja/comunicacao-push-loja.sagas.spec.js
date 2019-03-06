import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getComunicacaoPushLoja, getComunicacaoPushLojas, updateComunicacaoPushLoja, deleteComunicacaoPushLoja } from '../../../../../app/modules/entities/comunicacao-push-loja/comunicacao-push-loja.sagas'
import ComunicacaoPushLojaActions from '../../../../../app/modules/entities/comunicacao-push-loja/comunicacao-push-loja.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getComunicacaoPushLoja(1)
  const step = stepper(getComunicacaoPushLoja(FixtureAPI, { comunicacaoPushLojaId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ComunicacaoPushLojaActions.comunicacaoPushLojaSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getComunicacaoPushLoja(FixtureAPI, { comunicacaoPushLojaId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ComunicacaoPushLojaActions.comunicacaoPushLojaFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getComunicacaoPushLojas()
  const step = stepper(getComunicacaoPushLojas(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ComunicacaoPushLojaActions.comunicacaoPushLojaAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getComunicacaoPushLojas(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ComunicacaoPushLojaActions.comunicacaoPushLojaAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateComunicacaoPushLoja({id: 1})
  const step = stepper(updateComunicacaoPushLoja(FixtureAPI, { comunicacaoPushLoja: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ComunicacaoPushLojaActions.comunicacaoPushLojaUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateComunicacaoPushLoja(FixtureAPI, { comunicacaoPushLoja: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ComunicacaoPushLojaActions.comunicacaoPushLojaUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteComunicacaoPushLoja({id: 1})
  const step = stepper(deleteComunicacaoPushLoja(FixtureAPI, { comunicacaoPushLojaId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ComunicacaoPushLojaActions.comunicacaoPushLojaDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteComunicacaoPushLoja(FixtureAPI, { comunicacaoPushLojaId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ComunicacaoPushLojaActions.comunicacaoPushLojaDeleteFailure()))
})
