describe('kalk.Calculator', function() {
    describe('When instantiated', function() {
        it('should initialize "buffer" with 0 as the first entry', function() {
            var calc = new kalk.Calculator();
            
            expect(calc.buffer[0]).toBe(0);
        });
        
        it('should initialize "lhs", "rhs" and "result" to 0', function() {
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
        
        it('should overwrite the last buffer entry if it is a number and the new input is also a number', function() {
            expect(calc.buffer[0]).toBe(0);
            
            calc.input(5);
            expect(calc.buffer[0]).toBe(5);
            calc.input(14);
            
            expect(calc.buffer[0]).toBe(14);
            expect(calc.buffer.length).toBe(1);
        });
        
        it('should push an operation into the buffer if the last entry is a number', function() {             
            calc.input(7);
            
            calc.input('+');
            
            expect(calc.buffer.length).toBe(2);
            expect(calc.buffer[1]).toBe('+');
        });
        
        it('should push a number into the buffer if the last entry is not a number', function() {             
            calc.input(50);
            calc.input('-');
            calc.input(10);
            
            expect(calc.buffer.length).toBe(3);
            expect(calc.buffer[2]).toBe(10);
        });
        
        it('should calculate the result of the expression in the buffer given the "=" operation', function() {
            calc.input(25);
            calc.input('+');
            calc.input(15);
            
            calc.input('=');
            
            expect(calc.result).toBe(40);
        });
    });
});