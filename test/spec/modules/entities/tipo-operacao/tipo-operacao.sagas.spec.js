import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getTipoOperacao, getTipoOperacaos, updateTipoOperacao, deleteTipoOperacao } from '../../../../../app/modules/entities/tipo-operacao/tipo-operacao.sagas'
import TipoOperacaoActions from '../../../../../app/modules/entities/tipo-operacao/tipo-operacao.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getTipoOperacao(1)
  const step = stepper(getTipoOperacao(FixtureAPI, { tipoOperacaoId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TipoOperacaoActions.tipoOperacaoSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getTipoOperacao(FixtureAPI, { tipoOperacaoId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TipoOperacaoActions.tipoOperacaoFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getTipoOperacaos()
  const step = stepper(getTipoOperacaos(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TipoOperacaoActions.tipoOperacaoAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getTipoOperacaos(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TipoOperacaoActions.tipoOperacaoAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateTipoOperacao({id: 1})
  const step = stepper(updateTipoOperacao(FixtureAPI, { tipoOperacao: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TipoOperacaoActions.tipoOperacaoUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateTipoOperacao(FixtureAPI, { tipoOperacao: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TipoOperacaoActions.tipoOperacaoUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteTipoOperacao({id: 1})
  const step = stepper(deleteTipoOperacao(FixtureAPI, { tipoOperacaoId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TipoOperacaoActions.tipoOperacaoDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteTipoOperacao(FixtureAPI, { tipoOperacaoId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TipoOperacaoActions.tipoOperacaoDeleteFailure()))
})
