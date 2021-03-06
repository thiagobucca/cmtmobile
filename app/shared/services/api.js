// a library to wrap and simplify api calls
import apisauce from 'apisauce'

import AppConfig from '../../config/app-config'

// our "constructor"
const create = (baseURL = AppConfig.apiUrl) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const setAuthToken = (userAuth) => api.setHeader('Authorization', 'Bearer ' + userAuth)
  const removeAuthToken = () => api.deleteHeader('Authorization')
  const login = (userAuth) => api.post('api/authenticate', userAuth)
  const register = (user) => api.post('api/register', user)
  const forgotPassword = (data) => api.post('api/account/reset-password/init', data, {headers: {'Content-Type': 'text/plain', 'Accept': 'application/json, text/plain, */*'}})

  const getAccount = () => api.get('api/account')
  const updateAccount = (account) => api.post('api/account', account)
  const changePassword = (currentPassword, newPassword) => api.post('api/account/change-password', {currentPassword, newPassword}, {headers: {'Content-Type': 'application/json', 'Accept': 'application/json, text/plain, */*'}})

  const getUser = (userId) => api.get('api/users/' + userId)
  const getUsers = (options) => api.get('api/users', options)
  const createUser = (user) => api.post('api/users', user)
  const updateUser = (user) => api.put('api/users', user)
  const deleteUser = (userId) => api.delete('api/users/' + userId)

  const getCupom = (cupomId) => api.get('api/cupoms/' + cupomId)
  const getCupoms = (options) => api.get('api/cupoms', options)
  const getCupomUser = (usuario_id) => api.get('api/cupoms/usuario/' + usuario_id)
  const createCupom = (cupom) => api.post('api/cupoms', cupom)
  const updateCupom = (cupom) => api.put('api/cupoms', cupom)
  const deleteCupom = (cupomId) => api.delete('api/cupoms/' + cupomId)

  const getAgendaEvento = (agendaEventoId) => api.get('api/agenda-eventos/' + agendaEventoId)
  const getAgendaEventos = (options) => api.get('api/agenda-eventos', options)
  const createAgendaEvento = (agendaEvento) => api.post('api/agenda-eventos', agendaEvento)
  const updateAgendaEvento = (agendaEvento) => api.put('api/agenda-eventos', agendaEvento)
  const deleteAgendaEvento = (agendaEventoId) => api.delete('api/agenda-eventos/' + agendaEventoId)

  const getCategoriaEstabelecimento = (categoriaEstabelecimentoId) => api.get('api/categoria-estabelecimentos/' + categoriaEstabelecimentoId)
  const getCategoriaEstabelecimentos = (options) => api.get('api/categoria-estabelecimentos-app/', options)
  const createCategoriaEstabelecimento = (categoriaEstabelecimento) => api.post('api/categoria-estabelecimentos', categoriaEstabelecimento)
  const updateCategoriaEstabelecimento = (categoriaEstabelecimento) => api.put('api/categoria-estabelecimentos', categoriaEstabelecimento)
  const deleteCategoriaEstabelecimento = (categoriaEstabelecimentoId) => api.delete('api/categoria-estabelecimentos/' + categoriaEstabelecimentoId)

  const getEstabelecimentoComercial = (estabelecimentoComercialId) => api.get('api/estabelecimento-comercials/' + estabelecimentoComercialId)
  const getEstabelecimentoComercials = (options) => api.get('api/estabelecimento-comercials', options)
  const createEstabelecimentoComercial = (estabelecimentoComercial) => api.post('api/estabelecimento-comercials', estabelecimentoComercial)
  const updateEstabelecimentoComercial = (estabelecimentoComercial) => api.put('api/estabelecimento-comercials', estabelecimentoComercial)
  const deleteEstabelecimentoComercial = (estabelecimentoComercialId) => api.delete('api/estabelecimento-comercials/' + estabelecimentoComercialId)

  const getLojaMaconica = (lojaMaconicaId) => api.get('api/loja-maconicas/' + lojaMaconicaId)
  const getLojaMaconicas = (options) => api.get('api/loja-maconicas?sort=nome', options)
  const createLojaMaconica = (lojaMaconica) => api.post('api/loja-maconicas', lojaMaconica)
  const updateLojaMaconica = (lojaMaconica) => api.put('api/loja-maconicas', lojaMaconica)
  const deleteLojaMaconica = (lojaMaconicaId) => api.delete('api/loja-maconicas/' + lojaMaconicaId)

  const getContatoLojaMaconica = (contatoLojaMaconicaId) => api.get('api/contato-loja-maconicas/' + contatoLojaMaconicaId)
  const getContatoLojaMaconicas = (options) => api.get('api/contato-loja-maconicas', options)
  const createContatoLojaMaconica = (contatoLojaMaconica) => api.post('api/contato-loja-maconicas', contatoLojaMaconica)
  const updateContatoLojaMaconica = (contatoLojaMaconica) => api.put('api/contato-loja-maconicas', contatoLojaMaconica)
  const deleteContatoLojaMaconica = (contatoLojaMaconicaId) => api.delete('api/contato-loja-maconicas/' + contatoLojaMaconicaId)

  const getUsuario = (usuarioId) => api.get('api/usuarios/' + usuarioId)
  const getUsuarios = (options) => api.get('api/usuarios', options)
  const createUsuario = (usuario) => api.post('api/usuarios', usuario)
  const updateUsuario = (usuario) => api.put('api/usuarios', usuario)
  const deleteUsuario = (usuarioId) => api.delete('api/usuarios/' + usuarioId)

  const getTipoOperacao = (tipoOperacaoId) => api.get('api/tipo-operacaos/' + tipoOperacaoId)
  const getTipoOperacaos = (options) => api.get('api/tipo-operacaos', options)
  const createTipoOperacao = (tipoOperacao) => api.post('api/tipo-operacaos', tipoOperacao)
  const updateTipoOperacao = (tipoOperacao) => api.put('api/tipo-operacaos', tipoOperacao)
  const deleteTipoOperacao = (tipoOperacaoId) => api.delete('api/tipo-operacaos/' + tipoOperacaoId)

  const getParametrizacao = (parametrizacaoId) => api.get('api/parametrizacaos/' + parametrizacaoId)
  const getParametrizacaos = (options) => api.get('api/parametrizacaos', options)
  const createParametrizacao = (parametrizacao) => api.post('api/parametrizacaos', parametrizacao)
  const updateParametrizacao = (parametrizacao) => api.put('api/parametrizacaos', parametrizacao)
  const deleteParametrizacao = (parametrizacaoId) => api.delete('api/parametrizacaos/' + parametrizacaoId)

  const getContasPagarReceber = (contasPagarReceberId) => api.get('api/contas-pagar-recebers/' + contasPagarReceberId)
  const getContasPagarRecebers = (options) => api.get('api/contas-pagar-recebers', options)
  const createContasPagarReceber = (contasPagarReceber) => api.post('api/contas-pagar-recebers', contasPagarReceber)
  const updateContasPagarReceber = (contasPagarReceber) => api.put('api/contas-pagar-recebers', contasPagarReceber)
  const deleteContasPagarReceber = (contasPagarReceberId) => api.delete('api/contas-pagar-recebers/' + contasPagarReceberId)

  const getComunicacaoPush = (comunicacaoPushId) => api.get('api/comunicacao-pushes/' + comunicacaoPushId)
  const getComunicacaoPushes = (options) => api.get('api/comunicacao-pushes', options)
  const createComunicacaoPush = (comunicacaoPush) => api.post('api/comunicacao-pushes', comunicacaoPush)
  const updateComunicacaoPush = (comunicacaoPush) => api.put('api/comunicacao-pushes', comunicacaoPush)
  const deleteComunicacaoPush = (comunicacaoPushId) => api.delete('api/comunicacao-pushes/' + comunicacaoPushId)

  const getComunicacaoPushLoja = (comunicacaoPushLojaId) => api.get('api/comunicacao-push-lojas/' + comunicacaoPushLojaId)
  const getComunicacaoPushLojas = (options) => api.get('api/comunicacao-push-lojas', options)
  const createComunicacaoPushLoja = (comunicacaoPushLoja) => api.post('api/comunicacao-push-lojas', comunicacaoPushLoja)
  const updateComunicacaoPushLoja = (comunicacaoPushLoja) => api.put('api/comunicacao-push-lojas', comunicacaoPushLoja)
  const deleteComunicacaoPushLoja = (comunicacaoPushLojaId) => api.delete('api/comunicacao-push-lojas/' + comunicacaoPushLojaId)

  const getPerfilUsuario = (perfilUsuarioId) => api.get('api/perfil-usuarios/' + perfilUsuarioId)
  const getPerfilUsuarios = (options) => api.get('api/perfil-usuarios', options)
  const createPerfilUsuario = (perfilUsuario) => api.post('api/perfil-usuarios', perfilUsuario)
  const updatePerfilUsuario = (perfilUsuario) => api.put('api/perfil-usuarios', perfilUsuario)
  const deletePerfilUsuario = (perfilUsuarioId) => api.delete('api/perfil-usuarios/' + perfilUsuarioId)
  // ignite-jhipster-api-method-needle

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    createUser,
    updateUser,
    getUsers,
    getUser,
    deleteUser,

    createCupom,
    updateCupom,
    getCupoms,
    getCupom,
    getCupomUser,
    deleteCupom,

    createAgendaEvento,
    updateAgendaEvento,
    getAgendaEventos,
    getAgendaEvento,
    deleteAgendaEvento,

    createCategoriaEstabelecimento,
    updateCategoriaEstabelecimento,
    getCategoriaEstabelecimentos,
    getCategoriaEstabelecimento,
    deleteCategoriaEstabelecimento,

    createEstabelecimentoComercial,
    updateEstabelecimentoComercial,
    getEstabelecimentoComercials,
    getEstabelecimentoComercial,
    deleteEstabelecimentoComercial,

    createLojaMaconica,
    updateLojaMaconica,
    getLojaMaconicas,
    getLojaMaconica,
    deleteLojaMaconica,

    createContatoLojaMaconica,
    updateContatoLojaMaconica,
    getContatoLojaMaconicas,
    getContatoLojaMaconica,
    deleteContatoLojaMaconica,

    createUsuario,
    updateUsuario,
    getUsuarios,
    getUsuario,
    deleteUsuario,

    createTipoOperacao,
    updateTipoOperacao,
    getTipoOperacaos,
    getTipoOperacao,
    deleteTipoOperacao,

    createParametrizacao,
    updateParametrizacao,
    getParametrizacaos,
    getParametrizacao,
    deleteParametrizacao,

    createContasPagarReceber,
    updateContasPagarReceber,
    getContasPagarRecebers,
    getContasPagarReceber,
    deleteContasPagarReceber,

    createComunicacaoPush,
    updateComunicacaoPush,
    getComunicacaoPushes,
    getComunicacaoPush,
    deleteComunicacaoPush,

    createComunicacaoPushLoja,
    updateComunicacaoPushLoja,
    getComunicacaoPushLojas,
    getComunicacaoPushLoja,
    deleteComunicacaoPushLoja,

    createPerfilUsuario,
    updatePerfilUsuario,
    getPerfilUsuarios,
    getPerfilUsuario,
    deletePerfilUsuario,
    // ignite-jhipster-api-export-needle
    setAuthToken,
    removeAuthToken,
    login,
    register,
    forgotPassword,
    getAccount,
    updateAccount,
    changePassword
  }
}

// let's return back our create method as the default.
export default {
  create
}
