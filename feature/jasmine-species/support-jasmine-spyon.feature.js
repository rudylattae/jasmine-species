feature('Support Jasmine "spyOn" in Given, When, Then blocks', function() {
    summary(
        'In order to clearly describe interactions between components in my software',
        'As a developer',
        'I want to use spies in my GWT blocks'
    );
    
    scenario('Intercepting a method call on an object', function() {
        var Klass = function() {};
        Klass.prototype.method = function() {
            return true;
        };
        
        var obj = new Klass();
        
        given('I spy on a method', function() {
            spyOn(obj, 'method');
            expect(obj.method.callCount).toEqual(0);
        });
        
        when('the method is invoked', function() {
            obj.method();
        });
        
        then('the spy should indicate that it was called', function() {
            expect(obj.method).toHaveBeenCalled(); 
            expect(obj.method.callCount).toEqual(1); 
        });
    });
});