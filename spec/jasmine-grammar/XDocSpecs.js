describe('jasmine.grammar.XDoc', function() {
    var XDoc = jasmine.grammar.XDoc;
    var env;
        
    beforeEach(function() {
        env = new jasmine.Env();
        jasmine.grammar._currentEnv = env;
    });
    
    describe('topic', function() {
        it('creates a suite tagged with "topic"', function() {
            var suite = XDoc.topic('An interesting topic', function() {});
            
            expect(suite.description).toBe('An interesting topic');
            expect(suite.tags).toEqual(['topic']);
        });
    });
    
    describe('example', function() {
        it('creates a suite tagged with "example"', function() {
            var suite = XDoc.example('A specific example', function() {});
            
            expect(suite.description).toBe('A specific example');
            expect(suite.tags).toEqual(['example']);
        });
        
        it('creates a suite whose spec definitions are exposed via the defs atribute', function() {
            var suite = XDoc.example('A specific example', function() {});
            
            expect(suite.description).toBe('A specific example');
            expect(suite.expose).toBe(true);
            expect(suite.defs).not.toBe(null);
        });
        
        it('strips the "function() { ... }" block delimeters when it generates the def attribute', function() {
            var suite = XDoc.example('A specific example', function() {
                env.it("uses only this block", function () {});
            });
            
            expect(suite.defs).toBe('env.it("uses only this block", function () {});');
        });
    });
    
    describe('pass', function() {
        it('creates a spec in the current suite', function() {
            var parentSuite = XDoc.example('A simple example', function() {});
            jasmine.grammar.getEnv().currentSuite = parentSuite;
            
            var spec = XDoc.pass('This should pass', function() {});
            
            expect(spec.description).toBe('This should pass');
            expect(spec.suite).toBe(parentSuite);
        });
    });
});
