import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  estabelecimentoComercialRequest: [],
  estabelecimentoComercialSuccess: ['estabelecimentoComercial'],
  estabelecimentoComercialFailure: ['error'],
  estabelecimentoComercialUpdateRequest: ['estabelecimentoComercial'],
  estabelecimentoComercialUpdateSuccess: [],
  estabelecimentoComercialUpdateFailure: ['error']
})

export const EstabelecimentoComercialTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  estabelecimentoComercial: null,
  error: null,
  fetching: false,
  updating: false
})

/* ------------- Reducers ------------- */

// we're attempting to estabelecimentoComercial
export const request = (state) => state.merge({ fetching: true })

// we've successfully logged in
export const success = (state, data) => {
  const { estabelecimentoComercial } = data
  return state.merge({ fetching: false, error: null, estabelecimentoComercial })
}

// we've had a problem getting the estabelecimentoComercial
export const failure = (state, { error }) => state.merge({ fetching: false, updating: false, estabelecimentoComercial: null, error })

// we're attempting to updating estabelecimentoComercial settings
export const updateRequest = (state) => state.merge({ updating: true })

// we've successfully updated the estabelecimentoComercial settings
export const updateSuccess = (state) => state.merge({ error: null, updating: false })

// we've had a problem updating the estabelecimentoComercial settings
export const updateFailure = (state, { error }) => state.merge({ updating: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ESTABELECIMENTO_COMERCIAL_REQUEST]: request,
  [Types.ESTABELECIMENTO_COMERCIAL_SUCCESS]: success,
  [Types.ESTABELECIMENTO_COMERCIAL_FAILURE]: failure,
  [Types.ESTABELECIMENTO_COMERCIAL_UPDATE_REQUEST]: updateRequest,
  [Types.ESTABELECIMENTO_COMERCIAL_UPDATE_SUCCESS]: updateSuccess,
  [Types.ESTABELECIMENTO_COMERCIAL_UPDATE_FAILURE]: updateFailure
})

/* ------------- Selectors ------------- */
// Is the current user logged in?
export const isLoggedIn = estabelecimentoComercialState => estabelecimentoComercialState.estabelecimentoComercial !== null

export const getLogin = estabelecimentoComercialState => estabelecimentoComercialState.estabelecimentoComercial !== null ? estabelecimentoComercialState.estabelecimentoComercial.login : 'anonymousUser'
