describe('jasmine.grammar.More', function() {
    var More = jasmine.grammar.More;
    var env;
        
    beforeEach(function() {
        env = new jasmine.Env();
        jasmine.grammar._currentEnv = env;
    });
    
    describe('details', function() {
        it('attaches the given details (value, tags) to the current suite', function() {
            var suite = new jasmine.Suite(
                jasmine.grammar.getEnv(), 
                'A dummy suite', 
                function() {}, 
                jasmine.grammar.getEnv().currentSuite);
            jasmine.grammar.getEnv().currentSuite = suite;
            
            More.details('Further details about this example', 'info');
            
            expect(suite.description).toBe('A dummy suite');
            expect(suite.details.value).toBe('Further details about this example');
            expect(suite.details.tags).toBe('info');
        });
        
        it('adds a "details" tag to the details object if no tags are provided', function() {
            var suite = new jasmine.Suite(
                jasmine.grammar.getEnv(), 
                'A dummy suite', 
                function() {}, 
                jasmine.grammar.getEnv().currentSuite);
            jasmine.grammar.getEnv().currentSuite = suite;
            
            More.details('Details with no tags initially');
            
            expect(suite.description).toBe('A dummy suite');
            expect(suite.details.value).toBe('Details with no tags initially');
            expect(suite.details.tags).toBe('details');
        });
    });
});

describe('jasmine.grammar.SuiteDetails', function() {
    it('should create a details object with the given value and tags', function() {
        var expectedValue = 'Some further details on the suite';
        var d = new jasmine.grammar.SuiteDetails(expectedValue, 'info');
        
        expect(d.value).toBe(expectedValue);
        expect(d.tags).toBe('info');
    });
});