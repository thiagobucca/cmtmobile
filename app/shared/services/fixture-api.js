export default {
  // Functions return fixtures

  // entity fixtures

  updateUsuario: (usuario) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateUsuario.json')
    }
  },
  getUsuarios: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getUsuarios.json')
    }
  },
  getUsuario: (usuarioId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getUsuario.json')
    }
  },
  deleteUsuario: (usuarioId) => {
    return {
      ok: true
    }
  },

  updatePerfilUsuario: (perfilUsuario) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updatePerfilUsuario.json')
    }
  },
  getPerfilUsuarios: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getPerfilUsuarios.json')
    }
  },
  getPerfilUsuario: (perfilUsuarioId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getPerfilUsuario.json')
    }
  },
  deletePerfilUsuario: (perfilUsuarioId) => {
    return {
      ok: true
    }
  },

  updateEstabelecimentoComercial: (estabelecimentoComercial) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateEstabelecimentoComercial.json')
    }
  },
  getEstabelecimentoComercials: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getEstabelecimentoComercials.json')
    }
  },
  getEstabelecimentoComercial: (estabelecimentoComercialId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getEstabelecimentoComercial.json')
    }
  },
  deleteEstabelecimentoComercial: (estabelecimentoComercialId) => {
    return {
      ok: true
    }
  },

  updateAgendaEvento: (agendaEvento) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateAgendaEvento.json')
    }
  },
  getAgendaEventos: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getAgendaEventos.json')
    }
  },
  getAgendaEvento: (agendaEventoId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getAgendaEvento.json')
    }
  },
  deleteAgendaEvento: (agendaEventoId) => {
    return {
      ok: true
    }
  },

  updateLojaMaconica: (lojaMaconica) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateLojaMaconica.json')
    }
  },
  getLojaMaconicas: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getLojaMaconicas.json')
    }
  },
  getLojaMaconica: (lojaMaconicaId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getLojaMaconica.json')
    }
  },
  deleteLojaMaconica: (lojaMaconicaId) => {
    return {
      ok: true
    }
  },

  updateContatoLojaMaconica: (contatoLojaMaconica) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateContatoLojaMaconica.json')
    }
  },
  getContatoLojaMaconicas: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getContatoLojaMaconicas.json')
    }
  },
  getContatoLojaMaconica: (contatoLojaMaconicaId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getContatoLojaMaconica.json')
    }
  },
  deleteContatoLojaMaconica: (contatoLojaMaconicaId) => {
    return {
      ok: true
    }
  },

  updateCategoriaEstabelecimento: (categoriaEstabelecimento) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateCategoriaEstabelecimento.json')
    }
  },
  getCategoriaEstabelecimentos: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getCategoriaEstabelecimentos.json')
    }
  },
  getCategoriaEstabelecimento: (categoriaEstabelecimentoId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getCategoriaEstabelecimento.json')
    }
  },
  deleteCategoriaEstabelecimento: (categoriaEstabelecimentoId) => {
    return {
      ok: true
    }
  },

  updateComunicacaoPush: (comunicacaoPush) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateComunicacaoPush.json')
    }
  },
  getComunicacaoPushes: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getComunicacaoPushes.json')
    }
  },
  getComunicacaoPush: (comunicacaoPushId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getComunicacaoPush.json')
    }
  },
  deleteComunicacaoPush: (comunicacaoPushId) => {
    return {
      ok: true
    }
  },
  // ignite-jhipster-api-fixture-needle

  // user fixtures
  updateUser: (user) => {
    return {
      ok: true,
      data: require('../fixtures/updateUser.json')
    }
  },
  getUsers: () => {
    return {
      ok: true,
      data: require('../fixtures/getUsers.json')
    }
  },
  getUser: (userId) => {
    return {
      ok: true,
      data: require('../fixtures/getUser.json')
    }
  },
  deleteUser: (userId) => {
    return {
      ok: true
    }
  },
  // auth fixtures
  setAuthToken: () => {

  },
  removeAuthToken: () => {

  },
  login: (authObj) => {
    if (authObj.username === 'user' && authObj.password === 'user') {
      return {
        ok: true,
        data: require('../fixtures/login.json')
      }
    } else {
      return {
        ok: false,
        status: 400,
        data: 'Invalid credentials'
      }
    }
  },
  register: ({user}) => {
    if (user === 'user') {
      return {
        ok: true
      }
    } else {
      return {
        ok: false,
        data: 'Invalid email'
      }
    }
  },
  forgotPassword: ({email}) => {
    if (email === 'valid@gmail.com') {
      return {
        ok: true
      }
    } else {
      return {
        ok: false,
        data: 'Invalid email'
      }
    }
  },
  getAccount: () => {
    return {
      ok: true,
      status: 200,
      data: require('../fixtures/get-account.json')
    }
  },
  updateAccount: () => {
    return {
      ok: true
    }
  },
  changePassword: ({currentPassword}) => {
    if (currentPassword === 'valid-password') {
      return {
        ok: true
      }
    } else {
      return {
        ok: false,
        data: 'Password error'
      }
    }
  }
}
