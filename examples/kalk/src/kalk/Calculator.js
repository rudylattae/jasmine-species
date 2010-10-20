var kalk = {};

kalk.Calculator = function() {
    this.result = 0;
    this.queue = [];
};

/**
 * Enters an input into the calculator
 *
 * @param {String, Number} val   The operand/operation to handle 
 */
kalk.Calculator.prototype.input = function(val) {
    if (isNaN(Number(val)) && !this.isValidOperation(val)) {
        throw new Error('Invalid input. "' + val + '" is not a number or a valid operation')
    }
};

/**
 * Checks if the given operation is valid
 *
 * @param {String} op   The operation to verify 
 */
kalk.Calculator.prototype.isValidOperation = function(op) {
    validOps = ['+', '-', '/', '*', '=']
    if (validOps.lastIndexOf(op) < 0) {
        return false;
    }
    return true;
};
