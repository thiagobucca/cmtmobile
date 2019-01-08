const Utils = require('../utils')

describe('Usuario Screen Tests', () => {
  before(async () => {
    await device.reloadReactNative()
    await Utils.loginAsUser()
  })
  after(async () => {
    await element(by.type('_UIBackButtonContainerView')).tap()
    await element(by.type('_UIBackButtonContainerView')).tap()
    await Utils.logout()
  })

  beforeEach(async () => {
    await device.reloadReactNative()
    await navigateToUsuarioScreen()
  })

  const navigateToUsuarioScreen = async () => {
    await expect(element(by.id('launchScreen'))).toBeVisible()
    await element(by.id('menuButton')).tap()
    await element(by.id('entitiesDrawerButton')).tap()
    await element(by.id('usuarioEntityScreenButton')).tap()
  }

  it('should allow you to create an entity', async () => {
    await expect(element(by.id('usuarioScreen'))).toBeVisible()
    await expect(element(by.text('Create'))).toBeVisible()
    // create
    await element(by.text('Create').and(by.type('UIButtonLabel'))).tap()
    await element(by.id('nomeInput')).replaceText('sample-data')
    await element(by.id('telefoneInput')).replaceText('sample-data')
    await element(by.id('emailInput')).replaceText('sample-data')
    await element(by.id('senhaInput')).replaceText('sample-data')
    await waitFor(element(by.id('submitButton'))).toBeVisible().whileElement(by.id('entityScrollView')).scroll(50, 'down')
    await element(by.id('submitButton')).tap()
    await element(by.text('View')).tap()
    await expect(element(by.id('nome'))).toHaveText('Nome: sample-data')
    await expect(element(by.id('telefone'))).toHaveText('Telefone: sample-data')
    await expect(element(by.id('email'))).toHaveText('Email: sample-data')
    await expect(element(by.id('senha'))).toHaveText('Senha: sample-data')
    // update
    await element(by.text('EDIT')).tap()
    await element(by.id('nomeInput')).replaceText('sample-data-2')
    await element(by.id('telefoneInput')).replaceText('sample-data-2')
    await element(by.id('emailInput')).replaceText('sample-data-2')
    await element(by.id('senhaInput')).replaceText('sample-data-2')
    await waitFor(element(by.id('submitButton'))).toBeVisible().whileElement(by.id('entityScrollView')).scroll(50, 'down')
    await element(by.id('submitButton')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('nome'))).toHaveText('Nome: sample-data-2')
    await expect(element(by.id('telefone'))).toHaveText('Telefone: sample-data-2')
    await expect(element(by.id('email'))).toHaveText('Email: sample-data-2')
    await expect(element(by.id('senha'))).toHaveText('Senha: sample-data-2')
    // delete
    await element(by.text('DELETE')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('usuarioScreen'))).toBeVisible()
  })
})
