describe('jasmine.bloom.StyledHtmlReporter', function() {
    var env;
    var reporter;
    var body;
    var fakeDocument;
    var FeatureStory = jasmine.aroma.FeatureStory;
    
    // these helpers were ripped clean out of the jasmin's TrivialReporterSpec
    beforeEach(function() {
        env = new jasmine.Env();
        env.updateInterval = 0;
        jasmine.aroma._currentEnv = env;
        
        body = document.createElement("body");
        fakeDocument = { body: body, location: { search: "" }};
        reporter = new jasmine.bloom.StyledReporter(fakeDocument);
        env.addReporter(reporter);
    });

    function findElements(divs, withClass) {
        var els = [];
        for (var i = 0; i < divs.length; i++) {
            if (divs[i].className == withClass) els.push(divs[i]);
        }
        return els;
    };

    function findElement(divs, withClass) {
        var els = findElements(divs, withClass);
        if (els.length > 0) return els[0];
            throw new Error("couldn't find div with class \"" + withClass + "\"");
    }    
    
    it('should output the spec results to the document as div tags', function() {
        var runner = env.currentRunner();
        env.describe("A passing suite", function() {
            env.it("here be passing specs", function() {
                this.expect(true).toBeTruthy();
            });
        });
        
        runner.execute();
        
        var divs = fakeDocument.body.getElementsByTagName("div");
        var passedSpecDiv = findElement(divs, 'suite passed');
        
        expect(passedSpecDiv.className).toEqual('suite passed');
        expect(passedSpecDiv.innerHTML).toContain("here be passing specs");
    });
    
    it('should mark a feature suite by adding a class to the output markup', function() {
        var runner = env.currentRunner();
        FeatureStory.feature('Some cool feature', function() {});
        runner.execute();
        
        var divs = fakeDocument.body.getElementsByTagName("div");
        var passedSpecDiv = findElement(divs, 'suite feature skipped');
        
        expect(passedSpecDiv.className).toEqual('suite feature skipped');
    });
});