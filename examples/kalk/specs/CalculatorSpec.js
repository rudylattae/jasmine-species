describe('kalk.Calculator', function() {    
    xdescribe('add', function() {
        it('should calculate the sum of the given operands', function() {
            var calc = new kalk.Calculator();
            
            calc.input(5);
            calc.input('+')
            calc.input(4);
            calc.input('=');
            
            expect(calc.result).toEqual(9);
        });
    });
    
    describe('input', function() {
        var calc;
        
        beforeEach(function() {
            calc = new kalk.Calculator();
        });
    
        it('should fail on any non-numeric and non-valid operation', function() {             
            expect(function() {
                 calc.input('r');
            }).toThrow('Invalid input. "r" is not a number or a valid operation');
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
        
        it('should accept = as a valid operation', function() {             
            expect(function() {
                 calc.input('=');
            }).not.toThrow();
        });
    });
});