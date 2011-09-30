describe('jasmine.grammar.explode', function() {
     it('injects the public api of a given grammar module into the given context', function() {
         var context = {};

         jasmine.grammar.explode(['FeatureStory'], context);

         expect(context.feature).toBeDefined();
     });
});