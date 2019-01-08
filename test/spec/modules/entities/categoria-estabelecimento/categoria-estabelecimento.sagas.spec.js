import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getCategoriaEstabelecimento, getCategoriaEstabelecimentos, updateCategoriaEstabelecimento, deleteCategoriaEstabelecimento } from '../../../../../app/modules/entities/categoria-estabelecimento/categoria-estabelecimento.sagas'
import CategoriaEstabelecimentoActions from '../../../../../app/modules/entities/categoria-estabelecimento/categoria-estabelecimento.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getCategoriaEstabelecimento(1)
  const step = stepper(getCategoriaEstabelecimento(FixtureAPI, { categoriaEstabelecimentoId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CategoriaEstabelecimentoActions.categoriaEstabelecimentoSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getCategoriaEstabelecimento(FixtureAPI, { categoriaEstabelecimentoId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CategoriaEstabelecimentoActions.categoriaEstabelecimentoFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getCategoriaEstabelecimentos()
  const step = stepper(getCategoriaEstabelecimentos(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CategoriaEstabelecimentoActions.categoriaEstabelecimentoAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getCategoriaEstabelecimentos(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CategoriaEstabelecimentoActions.categoriaEstabelecimentoAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateCategoriaEstabelecimento({id: 1})
  const step = stepper(updateCategoriaEstabelecimento(FixtureAPI, { categoriaEstabelecimento: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CategoriaEstabelecimentoActions.categoriaEstabelecimentoUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateCategoriaEstabelecimento(FixtureAPI, { categoriaEstabelecimento: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CategoriaEstabelecimentoActions.categoriaEstabelecimentoUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteCategoriaEstabelecimento({id: 1})
  const step = stepper(deleteCategoriaEstabelecimento(FixtureAPI, { categoriaEstabelecimentoId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CategoriaEstabelecimentoActions.categoriaEstabelecimentoDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteCategoriaEstabelecimento(FixtureAPI, { categoriaEstabelecimentoId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CategoriaEstabelecimentoActions.categoriaEstabelecimentoDeleteFailure()))
})
