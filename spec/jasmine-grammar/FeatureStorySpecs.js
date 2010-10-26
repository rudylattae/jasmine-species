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
    
    describe('scenario', function() {
        it('should generate a suite with extended attributes', function() {
            var suite = FeatureStory.scenario('A complex scenario', function() {});
            expect(suite.description).toBe('Scenario: A complex scenario');
            expect(suite.tags).toEqual(['scenario']);
        });
    });
    
    describe('component', function() {
        it('should generate a suite with extended attributes', function() {
            var suite = FeatureStory.component('An application component', function() {});
            expect(suite.description).toBe('Component: An application component');
            expect(suite.tags).toEqual(['component']);
        });
    });
});
    
    
    
    
    
