/**
 * Version 1.0
 * 08.06.2021
 *
 *@author Kevin Bosse
 */

/**
 * @method
 * This function rounds a given number on two digits
 * @param number: given number witch needs to get rounded
 */

module.exports = function round (number) {

    var num = Number((Math.abs(number) * 100).toPrecision(15));
    return Math.round(num) / 100 * Math.sign(number);
};