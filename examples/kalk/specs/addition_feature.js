feature('Addition', function() {
    details([
        'In order to minimize brain usage',
        'As a math-challenged person',
        'I want to be told the sum of two numbers'
        ]);

    scenario('Adding two positive numbers', function() {
        var calc = new kalk.Calculator();
        
        given('I have entered 2 and 3 into the calculator', function() {
            calc.enter(2);
            calc.enter(3);
        });
        when('I choose add', function() {
            calc.add();
        });
        then('The result should be 5', function() {
            expect(calc.result).toEqual(5);
        });
    });
});