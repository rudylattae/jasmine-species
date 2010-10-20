var kalk = {};

kalk.Calculator = function() {
    this.result = 0;
    this.buffer = [0];
};

/**
 * Enters an input into the calculator
 *
 * @param {String, Number} val   The operand/operation to handle 
 */
kalk.Calculator.prototype.input = function(val) {
    if (isNaN(Number(val)) && !this.isValidOperation(val)) {
        throw new Error('Invalid input. "' + val + '" is not a number or a valid operation');
    }
    
    var lastVal = this.buffer[this.buffer.length - 1]
    if (!isNaN(Number(val)) && !isNaN(lastVal)) {
        this.buffer[this.buffer.length - 1] = Number(val);
    } else {
        this.buffer.push(val);
    }
};

/**
 * Checks if the given operation is valid
 *
 * @param {String} op   The operation to verify 
 */
kalk.Calculator.prototype.isValidOperation = function(op) {
    var validOps = ['+', '-', '/', '*', '=']
    if (validOps.lastIndexOf(op) < 0) {
        return false;
    }
    return true;
};
