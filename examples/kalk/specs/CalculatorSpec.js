describe('kalk.Calculator', function() {
    describe('add', function() {
        it('should calculate the sum of the queued operands', function() {
            var calc = new kalk.Calculator();
            
            calc.enter(5);
            calc.enter(4);
            calc.add();
            
            expect(calc.result).toEqual(9);
        });
    });
});