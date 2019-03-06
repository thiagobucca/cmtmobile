import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getCupom, getCupoms, getCupomUser, updateCupom, deleteCupom } from '../../../../../app/modules/entities/cupom/cupom.sagas'
import CupomActions from '../../../../../app/modules/entities/cupom/cupom.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getCupom(1)
  const step = stepper(getCupom(FixtureAPI, { cupomId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CupomActions.cupomSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getCupom(FixtureAPI, { cupomId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CupomActions.cupomFailure()))
})

test('get success path', () => {
  const response = FixtureAPI.getCupomUser(3)
  const step = stepper(getCupom(FixtureAPI, { usuario_id: { id: 3 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CupomActions.cupomSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getCupom(FixtureAPI, { cupomId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CupomActions.cupomFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getCupoms()
  const step = stepper(getCupoms(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CupomActions.cupomAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getCupoms(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CupomActions.cupomAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateCupom({id: 1})
  const step = stepper(updateCupom(FixtureAPI, { cupom: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CupomActions.cupomUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateCupom(FixtureAPI, { cupom: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CupomActions.cupomUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteCupom({id: 1})
  const step = stepper(deleteCupom(FixtureAPI, { cupomId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CupomActions.cupomDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteCupom(FixtureAPI, { cupomId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CupomActions.cupomDeleteFailure()))
})
