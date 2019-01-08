import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getComunicacaoPush, getComunicacaoPushes, updateComunicacaoPush, deleteComunicacaoPush } from '../../../../../app/modules/entities/comunicacao-push/comunicacao-push.sagas'
import ComunicacaoPushActions from '../../../../../app/modules/entities/comunicacao-push/comunicacao-push.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getComunicacaoPush(1)
  const step = stepper(getComunicacaoPush(FixtureAPI, { comunicacaoPushId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ComunicacaoPushActions.comunicacaoPushSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getComunicacaoPush(FixtureAPI, { comunicacaoPushId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ComunicacaoPushActions.comunicacaoPushFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getComunicacaoPushes()
  const step = stepper(getComunicacaoPushes(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ComunicacaoPushActions.comunicacaoPushAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getComunicacaoPushes(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ComunicacaoPushActions.comunicacaoPushAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateComunicacaoPush({id: 1})
  const step = stepper(updateComunicacaoPush(FixtureAPI, { comunicacaoPush: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ComunicacaoPushActions.comunicacaoPushUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateComunicacaoPush(FixtureAPI, { comunicacaoPush: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ComunicacaoPushActions.comunicacaoPushUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteComunicacaoPush({id: 1})
  const step = stepper(deleteComunicacaoPush(FixtureAPI, { comunicacaoPushId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ComunicacaoPushActions.comunicacaoPushDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteComunicacaoPush(FixtureAPI, { comunicacaoPushId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ComunicacaoPushActions.comunicacaoPushDeleteFailure()))
})
