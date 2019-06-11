import { AppState, Linking } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import { Images } from '../shared/themes'
// import { StorybookUIRoot } from '../../storybook'

import createStore from '../shared/reducers'
import Colors from '../shared/themes/colors'
import '../config/reactotron-config'
import AccountActions from '../shared/reducers/account.reducer'

import LoginScreen from '../modules/login/login-screen'
import LaunchScreen from '../modules/home/launch-screen'
import DrawerContent from './drawer/drawer-content'
import SettingsScreen from '../modules/account/settings/settings-screen'
import RegisterScreen from '../modules/account/register/register-screen'
import ForgotPasswordScreen from '../modules/account/password-reset/forgot-password-screen'
import ChangePasswordScreen from '../modules/account/password/change-password-screen'
import EntitiesScreen from '../modules/entities/entities-screen'
import CupomEntityScreen from '../modules/entities/cupom/cupom-entity-screen'
import CupomEntityDetailScreen from '../modules/entities/cupom/cupom-entity-detail-screen'
import CupomEntityEditScreen from '../modules/entities/cupom/cupom-entity-edit-screen'
import AgendaEventoEntityScreen from '../modules/entities/agenda-eventos/agenda-eventos-entity-screen'
import AgendaEventoEntityDetailScreen from '../modules/entities/agenda-eventos/agenda-eventos-entity-detail-screen'
import AgendaEventoEntityEditScreen from '../modules/entities/agenda-eventos/agenda-eventos-entity-edit-screen'
import CategoriaEstabelecimentoEntityScreen from '../modules/entities/categoria-estabelecimento/categoria-estabelecimento-entity-screen'
import CategoriaEstabelecimentoEntityDetailScreen from '../modules/entities/categoria-estabelecimento/categoria-estabelecimento-entity-detail-screen'
import CategoriaEstabelecimentoEntityEditScreen from '../modules/entities/categoria-estabelecimento/categoria-estabelecimento-entity-edit-screen'
import EstabelecimentoComercialEntityScreen from '../modules/entities/estabelecimento-comercial/estabelecimento-comercial-entity-screen'
import EstabelecimentoComercialEntityDetailScreen from '../modules/entities/estabelecimento-comercial/estabelecimento-comercial-entity-detail-screen'
import EstabelecimentoComercialEntityEditScreen from '../modules/entities/estabelecimento-comercial/estabelecimento-comercial-entity-edit-screen'
import LojaMaconicaEntityScreen from '../modules/entities/loja-maconica/loja-maconica-entity-screen'
import LojaMaconicaEntityDetailScreen from '../modules/entities/loja-maconica/loja-maconica-entity-detail-screen'
import LojaMaconicaEntityEditScreen from '../modules/entities/loja-maconica/loja-maconica-entity-edit-screen'
import ContatoLojaMaconicaEntityScreen from '../modules/entities/contato-loja-maconica/contato-loja-maconica-entity-screen'
import ContatoLojaMaconicaEntityDetailScreen from '../modules/entities/contato-loja-maconica/contato-loja-maconica-entity-detail-screen'
import ContatoLojaMaconicaEntityEditScreen from '../modules/entities/contato-loja-maconica/contato-loja-maconica-entity-edit-screen'
import UsuarioEntityScreen from '../modules/entities/usuario/usuario-entity-screen'
import UsuarioEntityDetailScreen from '../modules/entities/usuario/usuario-entity-detail-screen'
import UsuarioEntityEditScreen from '../modules/entities/usuario/usuario-entity-edit-screen'
import TipoOperacaoEntityScreen from '../modules/entities/tipo-operacao/tipo-operacao-entity-screen'
import TipoOperacaoEntityDetailScreen from '../modules/entities/tipo-operacao/tipo-operacao-entity-detail-screen'
import TipoOperacaoEntityEditScreen from '../modules/entities/tipo-operacao/tipo-operacao-entity-edit-screen'
import ParametrizacaoEntityScreen from '../modules/entities/parametrizacao/parametrizacao-entity-screen'
import ParametrizacaoEntityDetailScreen from '../modules/entities/parametrizacao/parametrizacao-entity-detail-screen'
import ParametrizacaoEntityEditScreen from '../modules/entities/parametrizacao/parametrizacao-entity-edit-screen'
import ContasPagarReceberEntityScreen from '../modules/entities/contas-pagar-receber/contas-pagar-receber-entity-screen'
import ContasPagarReceberEntityDetailScreen from '../modules/entities/contas-pagar-receber/contas-pagar-receber-entity-detail-screen'
import ContasPagarReceberEntityEditScreen from '../modules/entities/contas-pagar-receber/contas-pagar-receber-entity-edit-screen'
import ComunicacaoPushEntityScreen from '../modules/entities/comunicacao-push/comunicacao-push-entity-screen'
import ComunicacaoPushEntityDetailScreen from '../modules/entities/comunicacao-push/comunicacao-push-entity-detail-screen'
import ComunicacaoPushEntityEditScreen from '../modules/entities/comunicacao-push/comunicacao-push-entity-edit-screen'
import ComunicacaoPushLojaEntityScreen from '../modules/entities/comunicacao-push-loja/comunicacao-push-loja-entity-screen'
import ComunicacaoPushLojaEntityDetailScreen from '../modules/entities/comunicacao-push-loja/comunicacao-push-loja-entity-detail-screen'
import ComunicacaoPushLojaEntityEditScreen from '../modules/entities/comunicacao-push-loja/comunicacao-push-loja-entity-edit-screen'
import PerfilUsuarioEntityScreen from '../modules/entities/perfil-usuario/perfil-usuario-entity-screen'
import PerfilUsuarioEntityDetailScreen from '../modules/entities/perfil-usuario/perfil-usuario-entity-detail-screen'
import PerfilUsuarioEntityEditScreen from '../modules/entities/perfil-usuario/perfil-usuario-entity-edit-screen'
// ignite-jhipster-navigation-import-needle

export const LOGIN_SCREEN = 'nav.LoginScreen'
export const REGISTER_SCREEN = 'nav.RegisterScreen'
export const FORGOT_PASSWORD_SCREEN = 'nav.ForgotPasswordScreen'
export const CHANGE_PASSWORD_SCREEN = 'nav.ChangePasswordScreen'
export const SETTINGS_SCREEN = 'nav.SettingsScreen'
export const LAUNCH_SCREEN = 'nav.LaunchScreen'
export const DRAWER_CONTENT = 'nav.DrawerContent'
export const ENTITIES_SCREEN = 'nav.EntitiesScreen'
export const CUPOM_ENTITY_SCREEN = 'Nav.CupomEntityScreen'
export const CUPOM_ENTITY_DETAIL_SCREEN = 'Nav.CupomEntityDetailScreen'
export const CUPOM_ENTITY_EDIT_SCREEN = 'Nav.CupomEntityEditScreen'
export const AGENDA_EVENTO_ENTITY_SCREEN = 'Nav.AgendaEventoEntityScreen'
export const AGENDA_EVENTO_ENTITY_DETAIL_SCREEN = 'Nav.AgendaEventoEntityDetailScreen'
export const AGENDA_EVENTO_ENTITY_EDIT_SCREEN = 'Nav.AgendaEventoEntityEditScreen'
export const CATEGORIA_ESTABELECIMENTO_ENTITY_SCREEN = 'Nav.CategoriaEstabelecimentoEntityScreen'
export const CATEGORIA_ESTABELECIMENTO_ENTITY_DETAIL_SCREEN = 'Nav.CategoriaEstabelecimentoEntityDetailScreen'
export const CATEGORIA_ESTABELECIMENTO_ENTITY_EDIT_SCREEN = 'Nav.CategoriaEstabelecimentoEntityEditScreen'
export const ESTABELECIMENTO_COMERCIAL_ENTITY_SCREEN = 'Nav.EstabelecimentoComercialEntityScreen'
export const ESTABELECIMENTO_COMERCIAL_ENTITY_DETAIL_SCREEN = 'Nav.EstabelecimentoComercialEntityDetailScreen'
export const ESTABELECIMENTO_COMERCIAL_ENTITY_EDIT_SCREEN = 'Nav.EstabelecimentoComercialEntityEditScreen'
export const LOJA_MACONICA_ENTITY_SCREEN = 'Nav.LojaMaconicaEntityScreen'
export const LOJA_MACONICA_ENTITY_DETAIL_SCREEN = 'Nav.LojaMaconicaEntityDetailScreen'
export const LOJA_MACONICA_ENTITY_EDIT_SCREEN = 'Nav.LojaMaconicaEntityEditScreen'
export const CONTATO_LOJA_MACONICA_ENTITY_SCREEN = 'Nav.ContatoLojaMaconicaEntityScreen'
export const CONTATO_LOJA_MACONICA_ENTITY_DETAIL_SCREEN = 'Nav.ContatoLojaMaconicaEntityDetailScreen'
export const CONTATO_LOJA_MACONICA_ENTITY_EDIT_SCREEN = 'Nav.ContatoLojaMaconicaEntityEditScreen'
export const USUARIO_ENTITY_SCREEN = 'Nav.UsuarioEntityScreen'
export const USUARIO_ENTITY_DETAIL_SCREEN = 'Nav.UsuarioEntityDetailScreen'
export const USUARIO_ENTITY_EDIT_SCREEN = 'Nav.UsuarioEntityEditScreen'
export const TIPO_OPERACAO_ENTITY_SCREEN = 'Nav.TipoOperacaoEntityScreen'
export const TIPO_OPERACAO_ENTITY_DETAIL_SCREEN = 'Nav.TipoOperacaoEntityDetailScreen'
export const TIPO_OPERACAO_ENTITY_EDIT_SCREEN = 'Nav.TipoOperacaoEntityEditScreen'
export const PARAMETRIZACAO_ENTITY_SCREEN = 'Nav.ParametrizacaoEntityScreen'
export const PARAMETRIZACAO_ENTITY_DETAIL_SCREEN = 'Nav.ParametrizacaoEntityDetailScreen'
export const PARAMETRIZACAO_ENTITY_EDIT_SCREEN = 'Nav.ParametrizacaoEntityEditScreen'
export const CONTAS_PAGAR_RECEBER_ENTITY_SCREEN = 'Nav.ContasPagarReceberEntityScreen'
export const CONTAS_PAGAR_RECEBER_ENTITY_DETAIL_SCREEN = 'Nav.ContasPagarReceberEntityDetailScreen'
export const CONTAS_PAGAR_RECEBER_ENTITY_EDIT_SCREEN = 'Nav.ContasPagarReceberEntityEditScreen'
export const COMUNICACAO_PUSH_ENTITY_SCREEN = 'Nav.ComunicacaoPushEntityScreen'
export const COMUNICACAO_PUSH_ENTITY_DETAIL_SCREEN = 'Nav.ComunicacaoPushEntityDetailScreen'
export const COMUNICACAO_PUSH_ENTITY_EDIT_SCREEN = 'Nav.ComunicacaoPushEntityEditScreen'
export const COMUNICACAO_PUSH_LOJA_ENTITY_SCREEN = 'Nav.ComunicacaoPushLojaEntityScreen'
export const COMUNICACAO_PUSH_LOJA_ENTITY_DETAIL_SCREEN = 'Nav.ComunicacaoPushLojaEntityDetailScreen'
export const COMUNICACAO_PUSH_LOJA_ENTITY_EDIT_SCREEN = 'Nav.ComunicacaoPushLojaEntityEditScreen'
export const PERFIL_USUARIO_ENTITY_SCREEN = 'Nav.PerfilUsuarioEntityScreen'
export const PERFIL_USUARIO_ENTITY_DETAIL_SCREEN = 'Nav.PerfilUsuarioEntityDetailScreen'
export const PERFIL_USUARIO_ENTITY_EDIT_SCREEN = 'Nav.PerfilUsuarioEntityEditScreen'
// ignite-jhipster-navigation-declaration-needle

const store = createStore()

export const appStack = {
  root: {
    sideMenu: {
      left: {
        component: {
          name: DRAWER_CONTENT
        }
      },
      center: {
        stack: {
          id: 'center',
          children: [{
            component: {
              name: LAUNCH_SCREEN,
              options: {
                topBar: {
                  title: {
                    text: 'Bem-vindo ao CMT!',
                    alignment: "center",
                    color: Colors.snow
                  },
                  leftButtons: [
                    {
                      id: 'menuButton',
                      icon: Images.menuIcon,
                      color: Colors.snow,
                      testID: 'menuButton'
                    }
                  ]
                }
              }
            }
          }]
        }
      }
    }
  }
}

let lastAppState = 'active'
function handleAppStateChange (nextAppState) {
  if (lastAppState.match(/inactive|background/) && nextAppState === 'active') {
    refreshAccount(store)
  }
  lastAppState = nextAppState
}

function refreshAccount () {
  store.dispatch(AccountActions.accountRequest())
}
// for deep linking
function handleOpenURL (event) {
  console.tron.log(event.url)
  let splitUrl = event.url.split('/')             // ['https:', '', 'domain', 'route', 'params']
  let importantParameters = splitUrl.splice(3)    // ['route', 'params']
  if (importantParameters.length === 0) {
    console.tron.log('Sending to home page')
    return null
  }
  if (importantParameters.length === 1) {
    switch (importantParameters[0]) {
      case 'register':
        console.tron.log(`Sending to Register Page`)
        registerScreen()
        break
      default:
        console.tron.warn(`Unhandled deep link: ${event.url}`)
      // default code block
    }
  }
}

export function registerScreensAndStartApp () {
  Navigation.registerComponentWithRedux(LOGIN_SCREEN, () => LoginScreen, Provider, store)
  Navigation.registerComponentWithRedux(REGISTER_SCREEN, () => RegisterScreen, Provider, store)
  Navigation.registerComponentWithRedux(FORGOT_PASSWORD_SCREEN, () => ForgotPasswordScreen, Provider, store)
  Navigation.registerComponentWithRedux(CHANGE_PASSWORD_SCREEN, () => ChangePasswordScreen, Provider, store)
  Navigation.registerComponentWithRedux(SETTINGS_SCREEN, () => SettingsScreen, Provider, store)
  Navigation.registerComponentWithRedux(DRAWER_CONTENT, () => DrawerContent, Provider, store)
  Navigation.registerComponentWithRedux(LAUNCH_SCREEN, () => LaunchScreen, Provider, store)
  Navigation.registerComponentWithRedux(ENTITIES_SCREEN, () => EntitiesScreen, Provider, store)
  Navigation.registerComponentWithRedux(CUPOM_ENTITY_SCREEN, () => CupomEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(CUPOM_ENTITY_DETAIL_SCREEN, () => CupomEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(CUPOM_ENTITY_EDIT_SCREEN, () => CupomEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(AGENDA_EVENTO_ENTITY_SCREEN, () => AgendaEventoEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(AGENDA_EVENTO_ENTITY_DETAIL_SCREEN, () => AgendaEventoEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(AGENDA_EVENTO_ENTITY_EDIT_SCREEN, () => AgendaEventoEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(CATEGORIA_ESTABELECIMENTO_ENTITY_SCREEN, () => CategoriaEstabelecimentoEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(CATEGORIA_ESTABELECIMENTO_ENTITY_DETAIL_SCREEN, () => CategoriaEstabelecimentoEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(CATEGORIA_ESTABELECIMENTO_ENTITY_EDIT_SCREEN, () => CategoriaEstabelecimentoEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(ESTABELECIMENTO_COMERCIAL_ENTITY_SCREEN, () => EstabelecimentoComercialEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(ESTABELECIMENTO_COMERCIAL_ENTITY_DETAIL_SCREEN, () => EstabelecimentoComercialEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(ESTABELECIMENTO_COMERCIAL_ENTITY_EDIT_SCREEN, () => EstabelecimentoComercialEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(LOJA_MACONICA_ENTITY_SCREEN, () => LojaMaconicaEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(LOJA_MACONICA_ENTITY_DETAIL_SCREEN, () => LojaMaconicaEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(LOJA_MACONICA_ENTITY_EDIT_SCREEN, () => LojaMaconicaEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(CONTATO_LOJA_MACONICA_ENTITY_SCREEN, () => ContatoLojaMaconicaEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(CONTATO_LOJA_MACONICA_ENTITY_DETAIL_SCREEN, () => ContatoLojaMaconicaEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(CONTATO_LOJA_MACONICA_ENTITY_EDIT_SCREEN, () => ContatoLojaMaconicaEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(USUARIO_ENTITY_SCREEN, () => UsuarioEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(USUARIO_ENTITY_DETAIL_SCREEN, () => UsuarioEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(USUARIO_ENTITY_EDIT_SCREEN, () => UsuarioEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(TIPO_OPERACAO_ENTITY_SCREEN, () => TipoOperacaoEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(TIPO_OPERACAO_ENTITY_DETAIL_SCREEN, () => TipoOperacaoEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(TIPO_OPERACAO_ENTITY_EDIT_SCREEN, () => TipoOperacaoEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(PARAMETRIZACAO_ENTITY_SCREEN, () => ParametrizacaoEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(PARAMETRIZACAO_ENTITY_DETAIL_SCREEN, () => ParametrizacaoEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(PARAMETRIZACAO_ENTITY_EDIT_SCREEN, () => ParametrizacaoEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(CONTAS_PAGAR_RECEBER_ENTITY_SCREEN, () => ContasPagarReceberEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(CONTAS_PAGAR_RECEBER_ENTITY_DETAIL_SCREEN, () => ContasPagarReceberEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(CONTAS_PAGAR_RECEBER_ENTITY_EDIT_SCREEN, () => ContasPagarReceberEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(COMUNICACAO_PUSH_ENTITY_SCREEN, () => ComunicacaoPushEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(COMUNICACAO_PUSH_ENTITY_DETAIL_SCREEN, () => ComunicacaoPushEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(COMUNICACAO_PUSH_ENTITY_EDIT_SCREEN, () => ComunicacaoPushEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(COMUNICACAO_PUSH_LOJA_ENTITY_SCREEN, () => ComunicacaoPushLojaEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(COMUNICACAO_PUSH_LOJA_ENTITY_DETAIL_SCREEN, () => ComunicacaoPushLojaEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(COMUNICACAO_PUSH_LOJA_ENTITY_EDIT_SCREEN, () => ComunicacaoPushLojaEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(PERFIL_USUARIO_ENTITY_SCREEN, () => PerfilUsuarioEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(PERFIL_USUARIO_ENTITY_DETAIL_SCREEN, () => PerfilUsuarioEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(PERFIL_USUARIO_ENTITY_EDIT_SCREEN, () => PerfilUsuarioEntityEditScreen, Provider, store)
  // ignite-jhipster-navigation-registration-needle

  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
      topBar: {
        topBar: {
          title: {
            color: Colors.snow
          }
        },
        backButton: {
          showTitle: false,
          testID: 'backButton',
          icon: Images.chevronLeftIcon,
          color: Colors.snow,
          iconColor: Colors.backCMT
        },
        background: {
          color: Colors.backCMT
        }
      },
      sideMenu: {
        left: {
          enabled: false
        }
      }
    })

    Navigation.setRoot(appStack)

    // handle app state and deep links
    AppState.addEventListener('change', handleAppStateChange)
    Linking.addEventListener('url', handleOpenURL)
  })
}

export const loginScreen = () => Navigation.showModal({
  stack: {
    children: [{
      component: {
        name: LOGIN_SCREEN,
        options: {
          topBar: {
            visible: false,
            drawBehind: true
          }
        }
      }
    }]
  }
})

export const registerScreen = () => Navigation.push('center', {
  component: {
    name: REGISTER_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Novo Cadastro',
          alignment: "center",
          color: Colors.snow
        }
      }
    }
  }
})

export const forgotPasswordScreen = () => Navigation.push('center', {
  component: {
    name: FORGOT_PASSWORD_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Recuperar Senha',
          alignment: "center",
          color: Colors.snow
        }
      }
    }
  }
})
export const changePasswordScreen = () => Navigation.push('center', {
  component: {
    name: CHANGE_PASSWORD_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Trocar Senha',
          alignment: "center",
          color: Colors.snow
        }
      }
    }
  }
})
export const settingsScreen = () => Navigation.push('center', {
  component: {
    name: SETTINGS_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Settings',
          color: Colors.snow
        }
      }
    }
  }
})

export const entitiesScreen = () => Navigation.push('center', {
  component: {
    name: ENTITIES_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Entities',
          color: Colors.snow
        }
      }
    }
  }
})

export const cupomEntityScreen = () => Navigation.push('center', {
  component: {
    name: CUPOM_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Meus Cupons',
          alignment: "center",
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Novo',
            alignment: "center",
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const cupomEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: CUPOM_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Novo Cupom',
          alignment: "center",
          color: Colors.snow
        }
      }
    }
  }
})

export const cupomEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: CUPOM_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Detalhe Cupom',
          alignment: "center",
          color: Colors.snow
        }
      }
    }
  }
})

export const agendaEventoEntityScreen = () => Navigation.push('center', {
  component: {
    name: AGENDA_EVENTO_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Agenda',
          alignment: "center",
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: '',
            alignment: "center",
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const agendaEventoEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: AGENDA_EVENTO_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'AgendaEventos',
          color: Colors.snow
        }
      }
    }
  }
})

export const agendaEventoEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: AGENDA_EVENTO_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'AgendaEventos',
          color: Colors.snow
        }
      }
    }
  }
})

export const categoriaEstabelecimentoEntityScreen = () => Navigation.push('center', {
  component: {
    name: CATEGORIA_ESTABELECIMENTO_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Estabelecimentos',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: '',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const categoriaEstabelecimentoEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: CATEGORIA_ESTABELECIMENTO_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'CategoriaEstabelecimentos',
          color: Colors.snow
        }
      }
    }
  }
})

export const categoriaEstabelecimentoEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: CATEGORIA_ESTABELECIMENTO_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'CategoriaEstabelecimentos',
          color: Colors.snow
        }
      }
    }
  }
})

export const estabelecimentoComercialEntityScreen = (data) => Navigation.push('center', {
  component: {
    name: ESTABELECIMENTO_COMERCIAL_ENTITY_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Estabelecimentos',
          alignment: "center",
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: '',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const estabelecimentoComercialEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: ESTABELECIMENTO_COMERCIAL_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'EstabelecimentoComercials',
          color: Colors.snow
        }
      }
    }
  }
})

export const estabelecimentoComercialEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: ESTABELECIMENTO_COMERCIAL_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'EstabelecimentoComercials',
          color: Colors.snow
        }
      }
    }
  }
})

export const lojaMaconicaEntityScreen = () => Navigation.push('center', {
  component: {
    name: LOJA_MACONICA_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'LojaMaconicas',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Novo',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const lojaMaconicaEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: LOJA_MACONICA_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'LojaMaconicas',
          color: Colors.snow
        }
      }
    }
  }
})

export const lojaMaconicaEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: LOJA_MACONICA_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'LojaMaconicas',
          color: Colors.snow
        }
      }
    }
  }
})

export const contatoLojaMaconicaEntityScreen = () => Navigation.push('center', {
  component: {
    name: CONTATO_LOJA_MACONICA_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'ContatoLojaMaconicas',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Novo',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const contatoLojaMaconicaEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: CONTATO_LOJA_MACONICA_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'ContatoLojaMaconicas',
          color: Colors.snow
        }
      }
    }
  }
})

export const contatoLojaMaconicaEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: CONTATO_LOJA_MACONICA_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'ContatoLojaMaconicas',
          color: Colors.snow
        }
      }
    }
  }
})

export const usuarioEntityScreen = () => Navigation.push('center', {
  component: {
    name: USUARIO_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Usuarios',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const usuarioEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: USUARIO_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Usuarios',
          color: Colors.snow
        }
      }
    }
  }
})

export const usuarioEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: USUARIO_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Usuarios',
          color: Colors.snow
        }
      }
    }
  }
})

export const tipoOperacaoEntityScreen = () => Navigation.push('center', {
  component: {
    name: TIPO_OPERACAO_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'TipoOperacaos',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const tipoOperacaoEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: TIPO_OPERACAO_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'TipoOperacaos',
          color: Colors.snow
        }
      }
    }
  }
})

export const tipoOperacaoEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: TIPO_OPERACAO_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'TipoOperacaos',
          color: Colors.snow
        }
      }
    }
  }
})

export const parametrizacaoEntityScreen = () => Navigation.push('center', {
  component: {
    name: PARAMETRIZACAO_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Parametrizacaos',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const parametrizacaoEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: PARAMETRIZACAO_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Parametrizacaos',
          color: Colors.snow
        }
      }
    }
  }
})

export const parametrizacaoEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: PARAMETRIZACAO_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Parametrizacaos',
          color: Colors.snow
        }
      }
    }
  }
})

export const contasPagarReceberEntityScreen = () => Navigation.push('center', {
  component: {
    name: CONTAS_PAGAR_RECEBER_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'ContasPagarRecebers',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Novo',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const contasPagarReceberEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: CONTAS_PAGAR_RECEBER_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'ContasPagarRecebers',
          color: Colors.snow
        }
      }
    }
  }
})

export const contasPagarReceberEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: CONTAS_PAGAR_RECEBER_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'ContasPagarRecebers',
          color: Colors.snow
        }
      }
    }
  }
})

export const comunicacaoPushEntityScreen = () => Navigation.push('center', {
  component: {
    name: COMUNICACAO_PUSH_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Notificações',
          alignment: "center",
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: '',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const comunicacaoPushEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: COMUNICACAO_PUSH_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'ComunicacaoPushes',
          color: Colors.snow
        }
      }
    }
  }
})

export const comunicacaoPushEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: COMUNICACAO_PUSH_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'ComunicacaoPushes',
          color: Colors.snow
        }
      }
    }
  }
})

export const comunicacaoPushLojaEntityScreen = () => Navigation.push('center', {
  component: {
    name: COMUNICACAO_PUSH_LOJA_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'ComunicacaoPushLojas',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const comunicacaoPushLojaEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: COMUNICACAO_PUSH_LOJA_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'ComunicacaoPushLojas',
          color: Colors.snow
        }
      }
    }
  }
})

export const comunicacaoPushLojaEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: COMUNICACAO_PUSH_LOJA_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'ComunicacaoPushLojas',
          color: Colors.snow
        }
      }
    }
  }
})

export const perfilUsuarioEntityScreen = () => Navigation.push('center', {
  component: {
    name: PERFIL_USUARIO_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'PerfilUsuarios',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Novo',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const perfilUsuarioEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: PERFIL_USUARIO_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'PerfilUsuarios',
          color: Colors.snow
        }
      }
    }
  }
})

export const perfilUsuarioEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: PERFIL_USUARIO_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'PerfilUsuarios',
          color: Colors.snow
        }
      }
    }
  }
})
// ignite-jhipster-navigation-method-needle
