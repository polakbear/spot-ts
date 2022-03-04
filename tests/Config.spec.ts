import { expect, use } from 'chai'
import { SinonStub, stub } from 'sinon'
import sinonChai = require('sinon-chai')
import 'mocha'

import Config from '../src/Config'

use(sinonChai)

const baseHttpClientConfig = {
    headers: {
        Authorization: 'Bearer token',
        'Content-Type': 'application/json'
    },
    method: 'GET'
}

describe('Config', () => {
    let config: Config

    beforeEach(() => {
        config = new Config('token')
    })

    it('should find the methods', () => {
        expect(config.setApi).to.exist
        expect(config.getApi).to.exist
        expect(config.setToken).to.exist
        expect(config.getToken).to.exist
    })

    it('should create an instance of Config', () => {
        expect(config).to.be.instanceof(Config)
        expect(config.token).to.not.be.empty
        expect(config.api).to.not.be.empty
    })

    it('should not set token if empty', () => {
        expect(() => config.setToken('')).to.throw('Invalid token')
        expect(config.getToken()).to.not.eq('')
    })

    // TODO: add test to validate the API
    it('should not set API if empty', () => {
        expect(() => config.setApi('')).to.throw('Invalid API')
    })

    it('should correctly set the token', () => {
        config.setToken('new token')
        expect(config.getToken()).to.eq('new token')
    })

    it('should correctly set the API', () => {
        config.setApi('new API')
        expect(config.getApi()).to.eq('new API')
    })
})

