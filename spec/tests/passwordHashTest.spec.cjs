test = require('../../services/passwortHash');

describe('Test passwordText', () => {
    it('Return should be true', function() {
        let testPassword = "testPassword";
        let result = test.hashPassword(testPassword);
        let result1 = test.compareHashedPassword(result);

        expect(result).toBe(true)
    })
})