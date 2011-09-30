describe('aliases', function() {
    describe('FeatureStoryAlias', function() {
        var FeatureStoryAlias = jasmine.grammar.FeatureStoryAlias;
        var FeatureStory = jasmine.grammar.FeatureStory;

        it('provides aliases for Feature Story grammar"', function() {
            expect(FeatureStoryAlias.Feature).toBe(FeatureStory.feature);
            expect(FeatureStoryAlias.Story).toBe(FeatureStory.story);
            expect(FeatureStoryAlias.Component).toBe(FeatureStory.component);
            expect(FeatureStoryAlias.Scenario).toBe(FeatureStory.scenario);
        });
    });

    describe('GWTAlias', function() {
        var GWTAlias = jasmine.grammar.GWTAlias;
        var GWT = jasmine.grammar.GWT;

        it('provides aliases for Given When Then grammar"', function() {
            expect(GWTAlias.Given).toBe(GWT.given);
            expect(GWTAlias.When).toBe(GWT.when);
            expect(GWTAlias.Then).toBe(GWT.then);
            expect(GWTAlias.And).toBe(GWT.and);
            expect(GWTAlias.But).toBe(GWT.but);
        });
    });

    describe('ContextSpecificationAlias', function() {
        var ContextSpecificationAlias = jasmine.grammar.ContextSpecificationAlias;
        var ContextSpecification = jasmine.grammar.ContextSpecification;

        it('provides aliases for Context Specification grammar"', function() {
            expect(ContextSpecificationAlias.Concern).toBe(ContextSpecification.concern);
            expect(ContextSpecificationAlias.Context).toBe(ContextSpecification.context);
            expect(ContextSpecificationAlias.Spec).toBe(ContextSpecification.spec);
        });
    });

    describe('XDocAlias', function() {
        var XDocAlias = jasmine.grammar.XDocAlias;
        var XDoc = jasmine.grammar.XDoc;

        it('provides aliases for Executable docs grammar"', function() {
            expect(XDocAlias.Topic).toBe(XDoc.topic);
            expect(XDocAlias.Example).toBe(XDoc.example);
            expect(XDocAlias.Pass).toBe(XDoc.pass);
        });
    });

    describe('MetaAlias', function() {
        var MetaAlias = jasmine.grammar.MetaAlias;
        var Meta = jasmine.grammar.Meta;

        it('provides aliases for Meta grammar"', function() {
            expect(MetaAlias.Summary).toBe(Meta.summary);
            expect(MetaAlias.Details).toBe(Meta.details);
        });
    });
});
