import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getContasPagarReceber, getContasPagarRecebers, updateContasPagarReceber, deleteContasPagarReceber } from '../../../../../app/modules/entities/contas-pagar-receber/contas-pagar-receber.sagas'
import ContasPagarReceberActions from '../../../../../app/modules/entities/contas-pagar-receber/contas-pagar-receber.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getContasPagarReceber(1)
  const step = stepper(getContasPagarReceber(FixtureAPI, { contasPagarReceberId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ContasPagarReceberActions.contasPagarReceberSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getContasPagarReceber(FixtureAPI, { contasPagarReceberId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ContasPagarReceberActions.contasPagarReceberFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getContasPagarRecebers()
  const step = stepper(getContasPagarRecebers(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ContasPagarReceberActions.contasPagarReceberAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getContasPagarRecebers(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ContasPagarReceberActions.contasPagarReceberAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateContasPagarReceber({id: 1})
  const step = stepper(updateContasPagarReceber(FixtureAPI, { contasPagarReceber: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ContasPagarReceberActions.contasPagarReceberUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateContasPagarReceber(FixtureAPI, { contasPagarReceber: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ContasPagarReceberActions.contasPagarReceberUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteContasPagarReceber({id: 1})
  const step = stepper(deleteContasPagarReceber(FixtureAPI, { contasPagarReceberId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ContasPagarReceberActions.contasPagarReceberDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteContasPagarReceber(FixtureAPI, { contasPagarReceberId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ContasPagarReceberActions.contasPagarReceberDeleteFailure()))
})
