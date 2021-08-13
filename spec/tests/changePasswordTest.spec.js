test = require('../../services/changePassword1.0.js');

describe('Test passwordText', () => {
    it('Return should be true', () => {
        const result = test.checkToken('ABC')

        expect(result).toBe(true)
    })
})