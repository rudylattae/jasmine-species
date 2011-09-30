describe('jasmine.grammar.FeatureStory', function() {
    var FeatureStory = jasmine.grammar.FeatureStory;
    var env;
        
    beforeEach(function() {
        env = new jasmine.Env();
        jasmine.grammar.setEnv(env);
    });
    
    describe('feature', function() {
        it('generates a suite marked as a "Feature"', function() {
            var suite = FeatureStory.feature('Some cool feature', function() {});
            
            expect(suite.description).toBe('Feature: Some cool feature');
            expect(suite.tags).toEqual(['feature']);
        });
    });
    
    describe('story', function() {
        it('generates a suite marked as a "Story"', function() {
            var suite = FeatureStory.story('A user story', function() {});
            
            expect(suite.description).toBe('Story: A user story');
            expect(suite.tags).toEqual(['story']);
        });
    });
    
    describe('component', function() {
        it('generates a suite marked as a "Component"', function() {
            var suite = FeatureStory.component('An application component', function() {});
            
            expect(suite.description).toBe('Component: An application component');
            expect(suite.tags).toEqual(['component']);
        });
    });

    describe('scenario', function() {
        it('creates a spec marked as a "Scenario" within the current suite', function() {
            var parentSuite = env.describe('dummy suite', function() {});
            env.currentSuite = parentSuite;

            var spec = FeatureStory.scenario('A complex scenario', function() {});

            expect(spec.description).toBe('Scenario: A complex scenario');
            expect(spec.suite).toBe(parentSuite);
        });
    });
});
    
    
    
    
    
