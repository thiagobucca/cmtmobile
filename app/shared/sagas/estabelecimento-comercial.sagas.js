import { call, put } from 'redux-saga/effects'

import EstabelecimentoComercialActions from '../reducers/estabelecimento-comercial.reducer'

// attempts to account
export function * getEstabelecimentoComercial (api) {
  const response = yield call(api.getEstabelecimentoComercials)


  try {
      // success?
  if (response.ok) {
    // console.tron.log('EstabelecimentoComercial - OK')
     yield put(EstabelecimentoComercialActions.estabelecimentoComercialSuccess(response.data))
   } else {
    // console.tron.log('EstabelecimentoComercial - FAIL')
     yield put(EstabelecimentoComercialActions.estabelecimentoComercialFailure('WRONG'))
   }
  } catch (error) {

  }

}

