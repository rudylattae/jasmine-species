describe('jasmine.grammar.GWT', function() {
    var GWT = jasmine.grammar.GWT;
    var env;
        
    beforeEach(function() {
        env = new jasmine.Env();
        jasmine.grammar._currentEnv = env;
    });
    
    describe('given', function() {
        it('should create a suite that is marked as an intermediary step', function() {
            var suite = GWT.given('the first in a series of actions', function() {});
            expect(suite.description).toBe('Given the first in a series of actions');
            expect(suite.tags).toEqual(['step', 'given']);
            expect(suite.isIntermediate).toBe(true);
        });
    });
    
    describe('when', function() {
        it('should create a suite that is marked as an intermediary step', function() {
            var suite = GWT.when('an event occurs', function() {});
            expect(suite.description).toBe('When an event occurs');
            expect(suite.tags).toEqual(['step', 'when']);
            expect(suite.isIntermediate).toBe(true);
        });
    });
    
    describe('then', function() {
        it('should create an end result specification item', function() {
            // we need a suite before a spec
            var parentSuite = GWT.given('dummy suite', function() {});
            jasmine.grammar.getEnv().currentSuite = parentSuite;
            
            var spec = GWT.then('expect this outcome', function() {});
            expect(spec.description).toBe('Then expect this outcome');
            expect(spec.suite).toBe(parentSuite);
        });
    });
    
    describe('and', function() {
        it('should create an end result specification item', function() {
            // we need a suite before a spec
            var parentSuite = GWT.given('dummy suite', function() {});
            jasmine.grammar.getEnv().currentSuite = parentSuite;
            
            var spec = GWT.and('expect this outcome', function() {});
            expect(spec.description).toBe('And expect this outcome');
            expect(spec.suite).toBe(parentSuite);
        });
    });
    
    describe('but', function() {
        it('should create an end result specification item', function() {
            // we need a suite before a spec
            var parentSuite = GWT.given('dummy suite', function() {});
            jasmine.grammar.getEnv().currentSuite = parentSuite;
            
            var spec = GWT.but('expect this outcome', function() {});
            expect(spec.description).toBe('But expect this outcome');
            expect(spec.suite).toBe(parentSuite);
        });
    });
});
