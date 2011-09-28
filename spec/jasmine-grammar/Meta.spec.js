describe('jasmine.grammar.Meta', function() {
    var Meta = jasmine.grammar.Meta;
    var env;
        
    beforeEach(function() {
        env = new jasmine.Env();
        jasmine.grammar.setEnv(env);
    });
    
    describe('summary', function() {
        it('attaches the given summary to the current suite', function() {
            var expectedSummary = 'A summary of this example';
            var suite = env.describe('dummy suite', function() {});
            env.currentSuite = suite;
            
            Meta.summary(expectedSummary);
            
            expect(suite.summary[0]).toEqual(expectedSummary);
        });
        
        it('appends additional summary entries to the current suite when applied more than once', function() {
            var suite = env.describe('dummy suite', function() {});
            env.currentSuite = suite;
            
            Meta.summary('Summary 1');
            Meta.summary('Summary 2');
            
            expect(suite.summary[1]).toEqual('Summary 2');
        });
        
        it('attaches a variable number of summary entries to the current suite with one call', function() {
            var suite = env.describe('dummy suite', function() {});
            env.currentSuite = suite;
            
            Meta.summary('First Summary', 'Second Summary', 'Last Summary');
            
            expect(suite.summary[0]).toEqual('First Summary');
            expect(suite.summary[1]).toEqual('Second Summary');
            expect(suite.summary[2]).toEqual('Last Summary');
        });
    });
    
    describe('details', function() {
        it('attaches the given details to the current spec', function() {
            var expectedDetails = 'Meta info about this spec';
            var suite = env.describe('dummy suite', function() {});
            env.currentSuite = suite;
            var spec = env.describe('dummy spec', function() {});
            env.currentSpec = spec;
            
            Meta.details(expectedDetails);
            
            expect(spec.details[0]).toEqual(expectedDetails);
        });
        
        it('appends additional details to the current spec when applied more than once', function() {
            var suite = env.describe('dummy suite', function() {});
            env.currentSuite = suite;
            var spec = env.describe('dummy spec', function() {});
            env.currentSpec = spec;
            
            Meta.details('Detail 1');
            Meta.details('Detail 2');
            
            expect(spec.details[1]).toEqual('Detail 2');
        });
        
        it('attaches a variable number of details to the current spec with one call', function() {
            var suite = env.describe('dummy suite', function() {});
            env.currentSuite = suite;
            var spec = env.describe('dummy spec', function() {});
            env.currentSpec = spec;
            
            Meta.details('First Detail', 'Second Detail', 'Last Detail');
            
            expect(spec.details[0]).toEqual('First Detail');
            expect(spec.details[1]).toEqual('Second Detail');
            expect(spec.details[2]).toEqual('Last Detail');
        });
    });
});