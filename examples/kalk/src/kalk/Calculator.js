var kalk = {};

kalk.Calculator = function() {
    this.result = 0;
    this.lhs = 0;
    this.rhs = 0;
    this.op = null;
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

/**
 * Yields a function that implements the operation described by the given character
 *
 * @param {String} op   The character notation for the desired operation
 */
kalk.Calculator.prototype.operation = function(op) {
    if (op === '+') {
        return this.add;
    } else if (op === '-') {
        return this.sub;
    }
};

/**
 * Returns the sum of two operands
 *
 * @param {Number} lhs   The first operand
 * @param {Number} rhs   The second operand
 */
kalk.Calculator.prototype.add = function(lhs, rhs) {
    return lhs + rhs;
};

/**
 * Returns the difference of two operands
 *
 * Subtracts the rhs value from the lhs value
 *
 * @param {Number} lhs   The first operand
 * @param {Number} rhs   The second operand
 */
kalk.Calculator.prototype.sub = function(lhs, rhs) {
    return lhs - rhs;
};

/**
 * Returns the product of two operands
 *
 * @param {Number} lhs   The first operand
 * @param {Number} rhs   The second operand
 */
kalk.Calculator.prototype.prod = function(lhs, rhs) {
    return lhs * rhs;
};


/**
 * Returns the result of dividing the lsh value by the rhs value
 *
 * @param {Number} lhs   The first operand
 * @param {Number} rhs   The second operand
 */
kalk.Calculator.prototype.div = function(lhs, rhs) {
    return lhs / rhs;
};