import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getParametrizacao, getParametrizacaos, updateParametrizacao, deleteParametrizacao } from '../../../../../app/modules/entities/parametrizacao/parametrizacao.sagas'
import ParametrizacaoActions from '../../../../../app/modules/entities/parametrizacao/parametrizacao.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getParametrizacao(1)
  const step = stepper(getParametrizacao(FixtureAPI, { parametrizacaoId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ParametrizacaoActions.parametrizacaoSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getParametrizacao(FixtureAPI, { parametrizacaoId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ParametrizacaoActions.parametrizacaoFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getParametrizacaos()
  const step = stepper(getParametrizacaos(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ParametrizacaoActions.parametrizacaoAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getParametrizacaos(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ParametrizacaoActions.parametrizacaoAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateParametrizacao({id: 1})
  const step = stepper(updateParametrizacao(FixtureAPI, { parametrizacao: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ParametrizacaoActions.parametrizacaoUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateParametrizacao(FixtureAPI, { parametrizacao: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ParametrizacaoActions.parametrizacaoUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteParametrizacao({id: 1})
  const step = stepper(deleteParametrizacao(FixtureAPI, { parametrizacaoId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ParametrizacaoActions.parametrizacaoDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteParametrizacao(FixtureAPI, { parametrizacaoId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ParametrizacaoActions.parametrizacaoDeleteFailure()))
})
