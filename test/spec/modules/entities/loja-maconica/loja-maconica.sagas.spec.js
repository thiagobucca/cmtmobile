import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getLojaMaconica, getLojaMaconicas, updateLojaMaconica, deleteLojaMaconica } from '../../../../../app/modules/entities/loja-maconica/loja-maconica.sagas'
import LojaMaconicaActions from '../../../../../app/modules/entities/loja-maconica/loja-maconica.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getLojaMaconica(1)
  const step = stepper(getLojaMaconica(FixtureAPI, { lojaMaconicaId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(LojaMaconicaActions.lojaMaconicaSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getLojaMaconica(FixtureAPI, { lojaMaconicaId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(LojaMaconicaActions.lojaMaconicaFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getLojaMaconicas()
  const step = stepper(getLojaMaconicas(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(LojaMaconicaActions.lojaMaconicaAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getLojaMaconicas(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(LojaMaconicaActions.lojaMaconicaAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateLojaMaconica({id: 1})
  const step = stepper(updateLojaMaconica(FixtureAPI, { lojaMaconica: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(LojaMaconicaActions.lojaMaconicaUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateLojaMaconica(FixtureAPI, { lojaMaconica: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(LojaMaconicaActions.lojaMaconicaUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteLojaMaconica({id: 1})
  const step = stepper(deleteLojaMaconica(FixtureAPI, { lojaMaconicaId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(LojaMaconicaActions.lojaMaconicaDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteLojaMaconica(FixtureAPI, { lojaMaconicaId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(LojaMaconicaActions.lojaMaconicaDeleteFailure()))
})
