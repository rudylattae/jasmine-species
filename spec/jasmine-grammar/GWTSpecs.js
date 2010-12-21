describe('jasmine.grammar.GWT', function() {
    var GWT = jasmine.grammar.GWT;
    var env;
        
    beforeEach(function() {
        env = new jasmine.Env();
        jasmine.grammar._currentEnv = env;
    });
    
    describe('given', function() {
        it('should create a spec block within the current suite', function() {
            var parentSuite = env.describe('dummy suite', function() {});
            jasmine.grammar.getEnv().currentSuite = parentSuite;
            
            var spec = GWT.given('the first in a series of actions', function() {});
            
            expect(spec.description).toBe('Given the first in a series of actions');
            expect(spec.suite).toBe(parentSuite);
        });
    });
    
    describe('when', function() {
        it('should create a spec block within the current suite', function() {
            var parentSuite = env.describe('dummy suite', function() {});
            jasmine.grammar.getEnv().currentSuite = parentSuite;
            
            var spec = GWT.when('an event occurs', function() {});
            
            expect(spec.description).toBe('When an event occurs');
            expect(spec.suite).toBe(parentSuite);
        });
    });
    
    describe('then', function() {
        it('should create an end result specification item', function() {
            var parentSuite = env.describe('dummy suite', function() {});
            
            jasmine.grammar.getEnv().currentSuite = parentSuite;
            
            var spec = GWT.then('expect this outcome', function() {});
            expect(spec.description).toBe('Then expect this outcome');
            expect(spec.suite).toBe(parentSuite);
        });
    });
    
    describe('and', function() {
        it('should create an end result specification item', function() {
            var parentSuite = env.describe('dummy suite', function() {});
            
            jasmine.grammar.getEnv().currentSuite = parentSuite;
            
            var spec = GWT.and('expect this outcome', function() {});
            expect(spec.description).toBe('And expect this outcome');
            expect(spec.suite).toBe(parentSuite);
        });
    });
    
    describe('but', function() {
        it('should create an end result specification item', function() {
            var parentSuite = env.describe('dummy suite', function() {});
            
            jasmine.grammar.getEnv().currentSuite = parentSuite;
            
            var spec = GWT.but('expect this outcome', function() {});
            expect(spec.description).toBe('But expect this outcome');
            expect(spec.suite).toBe(parentSuite);
        });
    });
});
