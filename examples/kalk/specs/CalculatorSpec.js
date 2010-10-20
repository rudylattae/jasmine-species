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
        it('should accept numbers ok', function() {
            var calc = new kalk.Calculator();
             
            expect(function() {
                 calc.input(3);
            }).not.toThrow();
        });
        
        it('should accept valid operation (+ - / * =) ok', function() {
            var calc = new kalk.Calculator();
             
            expect(function() {
                 calc.input('+');
            }).not.toThrow();
            expect(function() {
                 calc.input('-');
            }).not.toThrow();
            expect(function() {
                 calc.input('/');
            }).not.toThrow();
            expect(function() {
                 calc.input('*');
            }).not.toThrow();
            expect(function() {
                 calc.input('=');
            }).not.toThrow();
        });
        
        it('should fail on any non-numeric and non-valid operation', function() {
            var calc = new kalk.Calculator();
             
            expect(function() {
                 calc.input('r');
            }).toThrow('Invalid input. "r" is not a number or a valid operation');
        });
    });
});