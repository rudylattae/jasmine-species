describe('jasmine.grammar.FeatureStory', function() {
    var FeatureStory = jasmine.grammar.FeatureStory;
    var env;
        
    beforeEach(function() {
        env = new jasmine.Env();
        jasmine.grammar._currentEnv = env;
    });
    
    describe('feature', function() {
        it('should generate a suite with extended attributes', function() {
            var suite = FeatureStory.feature('Some cool feature', function() {});
            expect(suite.description).toBe('Feature: Some cool feature');
            expect(suite.tags).toEqual(['feature']);
        });
    });
    
    describe('story', function() {
        it('should generate a suite with extended attributes', function() {
            var suite = FeatureStory.story('A user story', function() {});
            expect(suite.description).toBe('Story: A user story');
            expect(suite.tags).toEqual(['story']);
        });
    });
    
    describe('component', function() {
        it('should generate a suite with extended attributes', function() {
            var suite = FeatureStory.component('An application component', function() {});
            expect(suite.description).toBe('Component: An application component');
            expect(suite.tags).toEqual(['component']);
        });
    });
    
    describe('scenario', function() {
        it('should create a spec block within the current suite', function() {
            var parentSuite = env.describe('dummy suite', function() {});
            jasmine.grammar.getEnv().currentSuite = parentSuite;
            
            var spec = FeatureStory.scenario('A complex scenario', function() {});
            
            expect(spec.description).toBe('Scenario: A complex scenario');
            expect(spec.suite).toBe(parentSuite);
        });
    });
});
    
    
    
    
    
