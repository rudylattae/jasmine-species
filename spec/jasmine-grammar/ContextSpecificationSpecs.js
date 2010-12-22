describe('jasmine.grammar.ContextSpecification', function() {
    var ContextSpecification = jasmine.grammar.ContextSpecification;
    var env;
        
    beforeEach(function() {
        env = new jasmine.Env();
        jasmine.grammar._currentEnv = env;
    });
    
    describe('concern', function() {
        it('creates a suite tagged with "concern"', function() {
            var suite = ContextSpecification.concern('A specific feature of the system', function() {});
            
            expect(suite.description).toBe('A specific feature of the system');
            expect(suite.tags).toEqual(['concern']);
        });
    });
    
    describe('context', function() {
        it('creates a suite with tagged with "context"', function() {
            var suite = ContextSpecification.context('Context within which certain specifications will be valid.', function() {});
            
            expect(suite.description).toBe('Context within which certain specifications will be valid.');
            expect(suite.tags).toEqual(['context']);
        });
    });
    
    describe('spec', function() {
        it('creates a spec in the current suite', function() {
            var parentSuite = ContextSpecification.context('Dummy context', function() {});
            jasmine.grammar.getEnv().currentSuite = parentSuite;
            
            var spec = ContextSpecification.spec('Observe this outcome', function() {});
            
            expect(spec.description).toBe('Observe this outcome');
            expect(spec.suite).toBe(parentSuite);
        });
    });
});
