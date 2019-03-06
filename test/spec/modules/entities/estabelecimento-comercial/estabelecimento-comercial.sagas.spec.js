import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getEstabelecimentoComercial, getEstabelecimentoComercials, updateEstabelecimentoComercial, deleteEstabelecimentoComercial } from '../../../../../app/modules/entities/estabelecimento-comercial/estabelecimento-comercial.sagas'
import EstabelecimentoComercialActions from '../../../../../app/modules/entities/estabelecimento-comercial/estabelecimento-comercial.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getEstabelecimentoComercial(1)
  const step = stepper(getEstabelecimentoComercial(FixtureAPI, { estabelecimentoComercialId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(EstabelecimentoComercialActions.estabelecimentoComercialSuccess({id: 1})))
})

test('get failure path', () => {
  const response = {ok: false}
  const step = stepper(getEstabelecimentoComercial(FixtureAPI, { estabelecimentoComercialId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(EstabelecimentoComercialActions.estabelecimentoComercialFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getEstabelecimentoComercials()
  const step = stepper(getEstabelecimentoComercials(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(EstabelecimentoComercialActions.estabelecimentoComercialAllSuccess([{id: 1}, {id: 2}])))
})

test('getAll failure path', () => {
  const response = {ok: false}
  const step = stepper(getEstabelecimentoComercials(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(EstabelecimentoComercialActions.estabelecimentoComercialAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateEstabelecimentoComercial({id: 1})
  const step = stepper(updateEstabelecimentoComercial(FixtureAPI, { estabelecimentoComercial: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(EstabelecimentoComercialActions.estabelecimentoComercialUpdateSuccess({id: 1})))
})

test('update failure path', () => {
  const response = {ok: false}
  const step = stepper(updateEstabelecimentoComercial(FixtureAPI, { estabelecimentoComercial: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(EstabelecimentoComercialActions.estabelecimentoComercialUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteEstabelecimentoComercial({id: 1})
  const step = stepper(deleteEstabelecimentoComercial(FixtureAPI, { estabelecimentoComercialId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(EstabelecimentoComercialActions.estabelecimentoComercialDeleteSuccess({id: 1})))
})

test('delete failure path', () => {
  const response = {ok: false}
  const step = stepper(deleteEstabelecimentoComercial(FixtureAPI, { estabelecimentoComercialId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(EstabelecimentoComercialActions.estabelecimentoComercialDeleteFailure()))
})
