diffMinutes = require('../../services/token')

describe('Test diff Minutes', () => {
    it('Return should be the difference between two numbers', () => {

        let date1 = new Date("2021-01-01 6:00:00")
        let date2 = new Date("2021-01-01 8:00:00")
        const result = diffMinutes(date1, date2)

        expect(result).toBe(120)
    })
})