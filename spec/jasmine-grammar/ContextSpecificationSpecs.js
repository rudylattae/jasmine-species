describe('jasmine.grammar.ContextSpecification', function() {
    var ContextSpecification = jasmine.grammar.ContextSpecification;
    var env;
        
    beforeEach(function() {
        env = new jasmine.Env();
        jasmine.grammar._currentEnv = env;
    });
    
    describe('concern', function() {
        it('should create a suite with extended attributes', function() {
            var suite = ContextSpecification.concern('A specific feature of the system', function() {});
            expect(suite.description).toBe('A specific feature of the system');
            expect(suite.tags).toEqual(['concern']);
        });
    });
    
    describe('context', function() {
        it('should create a suite with extended attributes', function() {
            var suite = ContextSpecification.context('Context within which certain specifications will be valid.', function() {});
            expect(suite.description).toBe('Context within which certain specifications will be valid.');
            expect(suite.tags).toEqual(['context']);
        });
    });
    
    describe('spec', function() {
        it('should create an end result specification item', function() {
            // we need a suite before a spec
            var parentSuite = ContextSpecification.context('Dummy context', function() {});
            jasmine.grammar.getEnv().currentSuite = parentSuite;
            
            var spec = ContextSpecification.spec('Observe this outcome', function() {});
            expect(spec.description).toBe('Observe this outcome');
            expect(spec.suite).toBe(parentSuite);
        });
    });
});
