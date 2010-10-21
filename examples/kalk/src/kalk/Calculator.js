var kalk = {};

kalk.Calculator = function() {
    this.result = 0;
    this.lhs = null;
    this.rhs = null;
    this.op = null;
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
    
    if (this.isValidOperation(val)) {
        if (this.lhs == null) {
            this.lhs = 0;
        }
        this.op = this.getOp(val);
    } else {
        if (this.op == null) {
            this.lhs = val;
        } else {
            this.rhs = val;
        }
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
 * Yields a function that implements the operation described by the given op-code
 *
 * @param {String} opCode   The character notation for the desired operation
 */
kalk.Calculator.prototype.getOp = function(opCode) {
    var op = null;
    
    if (opCode === '+') {
        op = this.add;
    } else if (opCode === '-') {
        op = this.sub;
    } else if (opCode === '*') {
        op = this.mult;
    } else if (opCode === '/') {
        op = this.div;
    }
    
    return op;
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
kalk.Calculator.prototype.mult = function(lhs, rhs) {
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