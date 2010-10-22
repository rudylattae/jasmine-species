feature('Addition', function() {
    details([
        'In order to do simple calculations',
        'As an accountant',
        'I want to be told the sum of two numbers'
        ]);

    scenario('Adding two positive numbers', function() {
        var calc = new kalk.Calculator();
        
        given('I have input "10" and "+" into the calculator', function() {
            calc.input(10);
            calc.input('+');
        });
        when('I input 4', function() {
            calc.input(4);
        });
        then('The result should be 14', function() {
            expect(calc.result).toEqual(14);
        });
    });
});