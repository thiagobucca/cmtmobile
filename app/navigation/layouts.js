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
import AgendaScreen from '../modules/agenda/agenda-screen'
import CameraScreen from '../modules/camera/camera-screen'
import CupomScreen from '../modules/cupom/cupom-screen'

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import UsuarioEntityScreen from '../modules/entities/usuario/usuario-entity-screen'
import UsuarioEntityDetailScreen from '../modules/entities/usuario/usuario-entity-detail-screen'
import UsuarioEntityEditScreen from '../modules/entities/usuario/usuario-entity-edit-screen'
import PerfilUsuarioEntityScreen from '../modules/entities/perfil-usuario/perfil-usuario-entity-screen'
import PerfilUsuarioEntityDetailScreen from '../modules/entities/perfil-usuario/perfil-usuario-entity-detail-screen'
import PerfilUsuarioEntityEditScreen from '../modules/entities/perfil-usuario/perfil-usuario-entity-edit-screen'
import EstabelecimentoComercialEntityScreen from '../modules/entities/estabelecimento-comercial/estabelecimento-comercial-entity-screen'
import EstabelecimentoComercialEntityDetailScreen from '../modules/entities/estabelecimento-comercial/estabelecimento-comercial-entity-detail-screen'
import EstabelecimentoComercialEntityEditScreen from '../modules/entities/estabelecimento-comercial/estabelecimento-comercial-entity-edit-screen'
import AgendaEventoEntityScreen from '../modules/entities/agenda-eventos/agenda-eventos-entity-screen'
import AgendaEventoEntityDetailScreen from '../modules/entities/agenda-eventos/agenda-eventos-entity-detail-screen'
import AgendaEventoEntityEditScreen from '../modules/entities/agenda-eventos/agenda-eventos-entity-edit-screen'
import LojaMaconicaEntityScreen from '../modules/entities/loja-maconica/loja-maconica-entity-screen'
import LojaMaconicaEntityDetailScreen from '../modules/entities/loja-maconica/loja-maconica-entity-detail-screen'
import LojaMaconicaEntityEditScreen from '../modules/entities/loja-maconica/loja-maconica-entity-edit-screen'
import ContatoLojaMaconicaEntityScreen from '../modules/entities/contato-loja-maconica/contato-loja-maconica-entity-screen'
import ContatoLojaMaconicaEntityDetailScreen from '../modules/entities/contato-loja-maconica/contato-loja-maconica-entity-detail-screen'
import ContatoLojaMaconicaEntityEditScreen from '../modules/entities/contato-loja-maconica/contato-loja-maconica-entity-edit-screen'
import CategoriaEstabelecimentoEntityScreen from '../modules/entities/categoria-estabelecimento/categoria-estabelecimento-entity-screen'
import CategoriaEstabelecimentoEntityDetailScreen from '../modules/entities/categoria-estabelecimento/categoria-estabelecimento-entity-detail-screen'
import CategoriaEstabelecimentoEntityEditScreen from '../modules/entities/categoria-estabelecimento/categoria-estabelecimento-entity-edit-screen'
import ComunicacaoPushEntityScreen from '../modules/entities/comunicacao-push/comunicacao-push-entity-screen'
import ComunicacaoPushEntityDetailScreen from '../modules/entities/comunicacao-push/comunicacao-push-entity-detail-screen'
import ComunicacaoPushEntityEditScreen from '../modules/entities/comunicacao-push/comunicacao-push-entity-edit-screen'
// ignite-jhipster-navigation-import-needle

export const LOGIN_SCREEN = 'nav.LoginScreen'
export const REGISTER_SCREEN = 'nav.RegisterScreen'
export const FORGOT_PASSWORD_SCREEN = 'nav.ForgotPasswordScreen'
export const CHANGE_PASSWORD_SCREEN = 'nav.ChangePasswordScreen'
export const SETTINGS_SCREEN = 'nav.SettingsScreen'
export const LAUNCH_SCREEN = 'nav.LaunchScreen'
export const DRAWER_CONTENT = 'nav.DrawerContent'
export const ENTITIES_SCREEN = 'nav.EntitiesScreen'
export const AGENDA_SCREEN = 'nav.AgendaScreen'
export const CAMERA_SCREEN = 'nav.CameraScreen'
export const CUPOM_SCREEN = 'nav.CupomScreen'
export const USUARIO_ENTITY_SCREEN = 'Nav.UsuarioEntityScreen'
export const USUARIO_ENTITY_DETAIL_SCREEN = 'Nav.UsuarioEntityDetailScreen'
export const USUARIO_ENTITY_EDIT_SCREEN = 'Nav.UsuarioEntityEditScreen'
export const PERFIL_USUARIO_ENTITY_SCREEN = 'Nav.PerfilUsuarioEntityScreen'
export const PERFIL_USUARIO_ENTITY_DETAIL_SCREEN = 'Nav.PerfilUsuarioEntityDetailScreen'
export const PERFIL_USUARIO_ENTITY_EDIT_SCREEN = 'Nav.PerfilUsuarioEntityEditScreen'
export const ESTABELECIMENTO_COMERCIAL_ENTITY_SCREEN = 'Nav.EstabelecimentoComercialEntityScreen'
export const ESTABELECIMENTO_COMERCIAL_ENTITY_DETAIL_SCREEN = 'Nav.EstabelecimentoComercialEntityDetailScreen'
export const ESTABELECIMENTO_COMERCIAL_ENTITY_EDIT_SCREEN = 'Nav.EstabelecimentoComercialEntityEditScreen'
export const AGENDA_EVENTO_ENTITY_SCREEN = 'Nav.AgendaEventoEntityScreen'
export const AGENDA_EVENTO_ENTITY_DETAIL_SCREEN = 'Nav.AgendaEventoEntityDetailScreen'
export const AGENDA_EVENTO_ENTITY_EDIT_SCREEN = 'Nav.AgendaEventoEntityEditScreen'
export const LOJA_MACONICA_ENTITY_SCREEN = 'Nav.LojaMaconicaEntityScreen'
export const LOJA_MACONICA_ENTITY_DETAIL_SCREEN = 'Nav.LojaMaconicaEntityDetailScreen'
export const LOJA_MACONICA_ENTITY_EDIT_SCREEN = 'Nav.LojaMaconicaEntityEditScreen'
export const CONTATO_LOJA_MACONICA_ENTITY_SCREEN = 'Nav.ContatoLojaMaconicaEntityScreen'
export const CONTATO_LOJA_MACONICA_ENTITY_DETAIL_SCREEN = 'Nav.ContatoLojaMaconicaEntityDetailScreen'
export const CONTATO_LOJA_MACONICA_ENTITY_EDIT_SCREEN = 'Nav.ContatoLojaMaconicaEntityEditScreen'
export const CATEGORIA_ESTABELECIMENTO_ENTITY_SCREEN = 'Nav.CategoriaEstabelecimentoEntityScreen'
export const CATEGORIA_ESTABELECIMENTO_ENTITY_DETAIL_SCREEN = 'Nav.CategoriaEstabelecimentoEntityDetailScreen'
export const CATEGORIA_ESTABELECIMENTO_ENTITY_EDIT_SCREEN = 'Nav.CategoriaEstabelecimentoEntityEditScreen'
export const COMUNICACAO_PUSH_ENTITY_SCREEN = 'Nav.ComunicacaoPushEntityScreen'
export const COMUNICACAO_PUSH_ENTITY_DETAIL_SCREEN = 'Nav.ComunicacaoPushEntityDetailScreen'
export const COMUNICACAO_PUSH_ENTITY_EDIT_SCREEN = 'Nav.ComunicacaoPushEntityEditScreen'
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
                    color: Colors.snow
                  },
                  leftButtons: [
                    {
                      id: 'menuButton',
                      icon: Images.menuIcon,
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
  Navigation.registerComponentWithRedux(AGENDA_SCREEN, () => AgendaScreen, Provider, store)
  Navigation.registerComponentWithRedux(CAMERA_SCREEN, () => CameraScreen, Provider, store)
  Navigation.registerComponentWithRedux(CUPOM_SCREEN, () => CupomScreen, Provider, store)
  Navigation.registerComponentWithRedux(USUARIO_ENTITY_SCREEN, () => UsuarioEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(USUARIO_ENTITY_DETAIL_SCREEN, () => UsuarioEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(USUARIO_ENTITY_EDIT_SCREEN, () => UsuarioEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(PERFIL_USUARIO_ENTITY_SCREEN, () => PerfilUsuarioEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(PERFIL_USUARIO_ENTITY_DETAIL_SCREEN, () => PerfilUsuarioEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(PERFIL_USUARIO_ENTITY_EDIT_SCREEN, () => PerfilUsuarioEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(ESTABELECIMENTO_COMERCIAL_ENTITY_SCREEN, () => EstabelecimentoComercialEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(ESTABELECIMENTO_COMERCIAL_ENTITY_DETAIL_SCREEN, () => EstabelecimentoComercialEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(ESTABELECIMENTO_COMERCIAL_ENTITY_EDIT_SCREEN, () => EstabelecimentoComercialEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(AGENDA_EVENTO_ENTITY_SCREEN, () => AgendaEventoEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(AGENDA_EVENTO_ENTITY_DETAIL_SCREEN, () => AgendaEventoEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(AGENDA_EVENTO_ENTITY_EDIT_SCREEN, () => AgendaEventoEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(LOJA_MACONICA_ENTITY_SCREEN, () => LojaMaconicaEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(LOJA_MACONICA_ENTITY_DETAIL_SCREEN, () => LojaMaconicaEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(LOJA_MACONICA_ENTITY_EDIT_SCREEN, () => LojaMaconicaEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(CONTATO_LOJA_MACONICA_ENTITY_SCREEN, () => ContatoLojaMaconicaEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(CONTATO_LOJA_MACONICA_ENTITY_DETAIL_SCREEN, () => ContatoLojaMaconicaEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(CONTATO_LOJA_MACONICA_ENTITY_EDIT_SCREEN, () => ContatoLojaMaconicaEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(CATEGORIA_ESTABELECIMENTO_ENTITY_SCREEN, () => CategoriaEstabelecimentoEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(CATEGORIA_ESTABELECIMENTO_ENTITY_DETAIL_SCREEN, () => CategoriaEstabelecimentoEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(CATEGORIA_ESTABELECIMENTO_ENTITY_EDIT_SCREEN, () => CategoriaEstabelecimentoEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(COMUNICACAO_PUSH_ENTITY_SCREEN, () => ComunicacaoPushEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(COMUNICACAO_PUSH_ENTITY_DETAIL_SCREEN, () => ComunicacaoPushEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(COMUNICACAO_PUSH_ENTITY_EDIT_SCREEN, () => ComunicacaoPushEntityEditScreen, Provider, store)
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
          iconColor: Colors.snow
        },
        background: {
          color: Colors.background
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

export const agendaScreen = () => Navigation.push('center', {
  component: {
    name: AGENDA_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Agenda',
          color: Colors.snow
        }
      }
    }
  }
})

export const cameraScreen = () => Navigation.push('center', {
  component: {
    name: CAMERA_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Camera',
          color: Colors.snow
        }
      }
    }
  }
})

export const cupomScreen = () => Navigation.push('center', {
  component: {
    name: CUPOM_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Cupom',
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
            text: 'Create',
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

export const estabelecimentoComercialEntityScreen = () => Navigation.push('center', {
  component: {
    name: ESTABELECIMENTO_COMERCIAL_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'EstabelecimentoComercials',
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

export const agendaEventoEntityScreen = () => Navigation.push('center', {
  component: {
    name: AGENDA_EVENTO_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'AgendaEventos',
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
            text: 'Create',
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
            text: 'Create',
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

export const categoriaEstabelecimentoEntityScreen = () => Navigation.push('center', {
  component: {
    name: CATEGORIA_ESTABELECIMENTO_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'CategoriaEstabelecimentos',
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

export const comunicacaoPushEntityScreen = () => Navigation.push('center', {
  component: {
    name: COMUNICACAO_PUSH_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'ComunicacaoPushes',
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
// ignite-jhipster-navigation-method-needle
