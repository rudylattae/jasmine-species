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

    scenario('Adding a negative and positive number', function() {
        var calc = new kalk.Calculator();
        
        given('I have input "34" and "+" into the calculator', function() {
            calc.input(34);
            calc.input('+');
        });
        when('I input -4', function() {
            calc.input(-4);
        });
        then('The result should be 30', function() {
            expect(calc.result).toEqual(30);
        });
    });

    scenario('Adding two negative numbers', function() {
        var calc = new kalk.Calculator();
        
        given('I have input "-93" and "+" into the calculator', function() {
            calc.input(-93);
            calc.input('+');
        });
        when('I input -5', function() {
            calc.input(-5);
        });
        then('The result should be -98', function() {
            expect(calc.result).toEqual(-98);
        });
    });

    scenario('Adding decimal numbers', function() {
        var calc = new kalk.Calculator();
        
        given('I have input "56.34" and "+" into the calculator', function() {
            calc.input(56.34);
            calc.input('+');
        });
        when('I input 8.02', function() {
            calc.input(8.02);
        });
        then('The result should be 64.36', function() {
            expect(calc.result).toEqual(64.36);
        });
    });
});