const Utils = require('../utils')

describe('LojaMaconica Screen Tests', () => {
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
    await navigateToLojaMaconicaScreen()
  })

  const navigateToLojaMaconicaScreen = async () => {
    await expect(element(by.id('launchScreen'))).toBeVisible()
    await element(by.id('menuButton')).tap()
    await element(by.id('entitiesDrawerButton')).tap()
    await element(by.id('lojaMaconicaEntityScreenButton')).tap()
  }

  it('should allow you to create an entity', async () => {
    await expect(element(by.id('lojaMaconicaScreen'))).toBeVisible()
    await expect(element(by.text('Create'))).toBeVisible()
    // create
    await element(by.text('Create').and(by.type('UIButtonLabel'))).tap()
    await element(by.id('codCnpjInput')).replaceText('sample-data')
    await element(by.id('nomeInput')).replaceText('sample-data')
    await element(by.id('enderecoInput')).replaceText('sample-data')
    await element(by.id('telefoneInput')).replaceText('sample-data')
    await element(by.id('numeroInput')).replaceText('123')
    await waitFor(element(by.id('submitButton'))).toBeVisible().whileElement(by.id('entityScrollView')).scroll(50, 'down')
    await element(by.id('submitButton')).tap()
    await element(by.text('View')).tap()
    await expect(element(by.id('codCnpj'))).toHaveText('CodCnpj: sample-data')
    await expect(element(by.id('nome'))).toHaveText('Nome: sample-data')
    await expect(element(by.id('endereco'))).toHaveText('Endereco: sample-data')
    await expect(element(by.id('telefone'))).toHaveText('Telefone: sample-data')
    await expect(element(by.id('numero'))).toHaveText('Numero: 123')
    // update
    await element(by.text('EDIT')).tap()
    await element(by.id('codCnpjInput')).replaceText('sample-data-2')
    await element(by.id('nomeInput')).replaceText('sample-data-2')
    await element(by.id('enderecoInput')).replaceText('sample-data-2')
    await element(by.id('telefoneInput')).replaceText('sample-data-2')
    await element(by.id('numeroInput')).replaceText('1234')
    await waitFor(element(by.id('submitButton'))).toBeVisible().whileElement(by.id('entityScrollView')).scroll(50, 'down')
    await element(by.id('submitButton')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('codCnpj'))).toHaveText('CodCnpj: sample-data-2')
    await expect(element(by.id('nome'))).toHaveText('Nome: sample-data-2')
    await expect(element(by.id('endereco'))).toHaveText('Endereco: sample-data-2')
    await expect(element(by.id('telefone'))).toHaveText('Telefone: sample-data-2')
    await expect(element(by.id('numero'))).toHaveText('Numero: 1234')
    // delete
    await element(by.text('DELETE')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('lojaMaconicaScreen'))).toBeVisible()
  })
})
