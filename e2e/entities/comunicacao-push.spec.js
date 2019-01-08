const Utils = require('../utils')

describe('ComunicacaoPush Screen Tests', () => {
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
    await navigateToComunicacaoPushScreen()
  })

  const navigateToComunicacaoPushScreen = async () => {
    await expect(element(by.id('launchScreen'))).toBeVisible()
    await element(by.id('menuButton')).tap()
    await element(by.id('entitiesDrawerButton')).tap()
    await element(by.id('comunicacaoPushEntityScreenButton')).tap()
  }

  it('should allow you to create an entity', async () => {
    await expect(element(by.id('comunicacaoPushScreen'))).toBeVisible()
    await expect(element(by.text('Create'))).toBeVisible()
    // create
    await element(by.text('Create').and(by.type('UIButtonLabel'))).tap()
    await element(by.id('tituloInput')).replaceText('sample-data')
    await element(by.id('conteudoPushInput')).replaceText('sample-data')
    await waitFor(element(by.id('submitButton'))).toBeVisible().whileElement(by.id('entityScrollView')).scroll(50, 'down')
    await element(by.id('submitButton')).tap()
    await element(by.text('View')).tap()
    await expect(element(by.id('titulo'))).toHaveText('Titulo: sample-data')
    await expect(element(by.id('conteudoPush'))).toHaveText('ConteudoPush: sample-data')
    // update
    await element(by.text('EDIT')).tap()
    await element(by.id('tituloInput')).replaceText('sample-data-2')
    await element(by.id('conteudoPushInput')).replaceText('sample-data-2')
    await waitFor(element(by.id('submitButton'))).toBeVisible().whileElement(by.id('entityScrollView')).scroll(50, 'down')
    await element(by.id('submitButton')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('titulo'))).toHaveText('Titulo: sample-data-2')
    await expect(element(by.id('conteudoPush'))).toHaveText('ConteudoPush: sample-data-2')
    // delete
    await element(by.text('DELETE')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('comunicacaoPushScreen'))).toBeVisible()
  })
})
