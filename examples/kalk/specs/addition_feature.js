feature('Addition', function() {
    details([
        'In order to do simple calculations',
        'As an accountant',
        'I want to be told the sum of two numbers'
        ]);

    scenario('Adding two positive numbers', function() {
        var calc = new kalk.Calculator();
        
        given('I have input 2 + 3 into the calculator', function() {
            calc.input(2);
            calc.input('+');
            calc.input(3);
        });
        when('I input =', function() {
            calc.input('=');
        });
        then('The result should be 5', function() {
            expect(calc.result).toEqual(5);
        });
    });
});