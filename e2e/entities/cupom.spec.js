const Utils = require('../utils')

describe('Cupom Screen Tests', () => {
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
    await navigateToCupomScreen()
  })

  const navigateToCupomScreen = async () => {
    await expect(element(by.id('launchScreen'))).toBeVisible()
    await element(by.id('menuButton')).tap()
    await element(by.id('entitiesDrawerButton')).tap()
    await element(by.id('cupomEntityScreenButton')).tap()
  }

  it('should allow you to create an entity', async () => {
    await expect(element(by.id('cupomScreen'))).toBeVisible()
    await expect(element(by.text('Create'))).toBeVisible()
    // create
    await element(by.text('Create').and(by.type('UIButtonLabel'))).tap()
    await element(by.id('valorInput')).replaceText('123')
    await element(by.id('numeroInput')).replaceText('sample-data')
    await element(by.id('fotoInput')).replaceText('sample-data')
    await element(by.id('estabelecimentoComercialIdInput')).replaceText('123')
    await waitFor(element(by.id('submitButton'))).toBeVisible().whileElement(by.id('entityScrollView')).scroll(50, 'down')
    await element(by.id('submitButton')).tap()
    await element(by.text('View')).tap()
    await expect(element(by.id('valor'))).toHaveText('Valor: 123')
    await expect(element(by.id('numero'))).toHaveText('Numero: sample-data')
    await expect(element(by.id('foto'))).toHaveText('Foto: sample-data')
    await expect(element(by.id('estabelecimentoComercialId'))).toHaveText('EstabelecimentoComercialId: 123')
    // update
    await element(by.text('EDIT')).tap()
    await element(by.id('valorInput')).replaceText('1234')
    await element(by.id('numeroInput')).replaceText('sample-data-2')
    await element(by.id('fotoInput')).replaceText('sample-data-2')
    await element(by.id('estabelecimentoComercialIdInput')).replaceText('1234')
    await waitFor(element(by.id('submitButton'))).toBeVisible().whileElement(by.id('entityScrollView')).scroll(50, 'down')
    await element(by.id('submitButton')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('valor'))).toHaveText('Valor: 1234')
    await expect(element(by.id('numero'))).toHaveText('Numero: sample-data-2')
    await expect(element(by.id('foto'))).toHaveText('Foto: sample-data-2')
    await expect(element(by.id('estabelecimentoComercialId'))).toHaveText('EstabelecimentoComercialId: 1234')
    // delete
    await element(by.text('DELETE')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('cupomScreen'))).toBeVisible()
  })
})
