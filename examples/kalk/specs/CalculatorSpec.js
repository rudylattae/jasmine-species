describe('kalk.Calculator', function() {
    describe('On initialize', function() {
        it('should set "lhs", "rhs" and "result"', function() {
            var calc = new kalk.Calculator();
            
            expect(calc.lhs).toBe(null);
            expect(calc.rhs).toBe(null);
            expect(calc.result).toBe(0);
        });
    });
    
    describe('add', function() {
        var calc;
        
        beforeEach(function() {
            calc = new kalk.Calculator();
        });
        
        it('should calculate the sum of two positive operands', function() {
            expect(calc.add(4, 8)).toEqual(12);
        });
        
        it('should calculate sum given a decimal operand', function() {
            expect(calc.add(4.5, 8.1)).toEqual(12.6);
        });        
        
        it('should calculate sum given a negative operand', function() {
            expect(calc.add(-4, 8)).toEqual(4);
        });
    });
    
    describe('sub', function() {
        // not specced out with as much detail as "add"
        it('should calculate the difference of two operands, subtracting the rhs value from the lhs value', function() {
            var calc = new kalk.Calculator();
            expect(calc.sub(15, 8)).toEqual(7);
        });
    });
    
    describe('mult', function() {
        // not specced out with as much detail as "add"
        it('should calculate the product of two operands', function() {
            var calc = new kalk.Calculator();
            expect(calc.mult(3, 5)).toEqual(15);
        });
    });
    
    describe('div', function() {
        // not specced out with as much detail as "add"
        it('should calculate the result of dividing the lhs operand by the rhs operand', function() {
            var calc = new kalk.Calculator();
            expect(calc.div(25, 5)).toEqual(5);
        });
    });
    
    describe('getOp', function() {
        var calc;
        
        beforeEach(function() {
            calc = new kalk.Calculator();
        });
        
        it('should yield an add function given a "+" operator', function() {
            op = calc.getOp('+');
            
            expect(op).toBe(calc.add);
            expect(op(10, 23)).toEqual(33);
        });
        
        it('should yield a sub function given a "-" operator', function() {
            op = calc.getOp('-');
            
            expect(op).toBe(calc.sub);
            expect(op(45, 25)).toEqual(20);
        });
        
        it('should yield a prod function given a "*" operator', function() {
            op = calc.getOp('*');
            
            expect(op).toBe(calc.mult);
            expect(op(10, 8)).toEqual(80);
        });
        
        it('should yield a div function given a "/" operator', function() {
            op = calc.getOp('/');
            
            expect(op).toBe(calc.div);
            expect(op(55, 11)).toEqual(5);
        });
    });
    
    describe('input', function() {
        var calc;
        
        beforeEach(function() {
            calc = new kalk.Calculator();
        });
        
        it('should accept regular numbers', function() {             
            expect(function() {
                 calc.input(3);
            }).not.toThrow();
        });
        
        it('should accept "stringified" numbers', function() {             
            expect(function() {
                 calc.input('3');
            }).not.toThrow();
        });
        
        it('should accept + as a valid operation', function() {             
            expect(function() {
                 calc.input('+');
            }).not.toThrow();
        });
        
        it('should accept - as a valid operation', function() {             
            expect(function() {
                 calc.input('-');
            }).not.toThrow();
        });
        
        it('should accept / as a valid operation', function() {             
            expect(function() {
                 calc.input('/');
            }).not.toThrow();
        });
        
        it('should accept * as a valid operation', function() {             
            expect(function() {
                 calc.input('*');
            }).not.toThrow();
        });
        
        it('should fail on any non-numeric and non-valid operation', function() {             
            expect(function() {
                 calc.input('r');
            }).toThrow('Invalid input. "r" is not a number or a valid operation');
        });
        
        it('should store numeric value into "lhs" given no "lhs" value and no "op" entered yet', function() {
            calc.input(5);
            expect(calc.lhs).toBe(5);
        });
            
        it('should overwrite an existing value in "lhs" given no "lhs" value and no "op" entered yet', function() {
            calc.input(5);
            calc.input(10);
            calc.input(43);
            
            expect(calc.lhs).toBe(43);
        });
        
        it('should store the corresponding operation in "op" given a valid op-code and an existing value in "lhs"', function() {
            calc.input(5);
            calc.input('+');
            
            expect(calc.op).toBe(calc.add);
        });
        
        it('should default "lhs" to 0 and store the corresponding operation in "op" given a valid op-code and no existing value in "lhs"', function() {
            calc.input('+');
            
            expect(calc.lhs).toBe(0);
            expect(calc.op).toBe(calc.add);
        });
        
        it('should store numeric value into "rhs" given no "rhs" value and "op" has been difined', function() {             
            calc.input(5);
            calc.input('+');
            calc.input(23);
            
            expect(calc.lhs).toBe(5);
            expect(calc.op).toBe(calc.add);
            expect(calc.rhs).toBe(23);
        });
    });
});