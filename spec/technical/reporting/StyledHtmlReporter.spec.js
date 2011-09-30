describe('jasmine.reporting.StyledHtmlReporter', function() {
    var env;
    var reporter;
    var body;
    var fakeDocument;
    
    var FeatureStory = jasmine.grammar.FeatureStory;
    var GWT = jasmine.grammar.GWT;
    var XDoc = jasmine.grammar.XDoc;
    var Meta = jasmine.grammar.Meta;

    // these helpers were ripped clean out of the jasmin's TrivialReporterSpec
    beforeEach(function() {
        env = new jasmine.Env();
        env.updateInterval = 0;
        jasmine.grammar.setEnv(env);
        
        body = document.createElement("body");
        fakeDocument = { body: body, location: { search: "" }};
        reporter = new jasmine.reporting.StyledHtmlReporter(fakeDocument);
        env.addReporter(reporter);
    });

    function getElementsByClassName(domFragment, withClass) {
        var els = [];
        for (var i = 0; i < domFragment.length; i++) {
            if (domFragment[i].className == withClass) els.push(domFragment[i]);
        }
        return els;
    };

    function getElementByClassName(domFragment, withClass) {
        var els = getElementsByClassName(domFragment, withClass);
        if (els.length > 0) return els[0];
        throw new Error("Could not find element with class \"" + withClass + "\"");
    };
    
    describe('when reporting results for default suites and specs', function() {
        it('renders a skipped suite with "skipped" class', function() {
            var runner = env.currentRunner();
            env.describe("A skipped suite", function() {});
            
            runner.execute();
            
            var divs = fakeDocument.body.getElementsByTagName("div");
            expect(function() {
                getElementByClassName(divs, 'suite skipped');
            }).not.toThrow();
        });
        
        it('renders a passing suite with "passed" class', function() {
            var runner = env.currentRunner();
            env.describe("A passing suite", function() {
                env.it("should pass", function() {
                    this.expect(true).toBeTruthy();
                });
            });
            
            runner.execute();
            
            var divs = fakeDocument.body.getElementsByTagName("div");
            var suiteDiv = getElementByClassName(divs, 'suite passed');
            
            expect(suiteDiv.innerHTML).toContain("should pass");
        });
        
        it('renders a failing suite with "failed" class', function() {
            var runner = env.currentRunner();
            env.describe("A failing suite", function() {
                env.it("should fail", function() {
                    this.expect(true).toBeFalsey();
                });
            });
            
            runner.execute();
            
            var divs = fakeDocument.body.getElementsByTagName("div");
            var suiteDiv = getElementByClassName(divs, 'suite failed');
            
            expect(suiteDiv.innerHTML).toContain("should fail");
        });
    });
    
    describe('when reporting results for suites and specs with tags', function() { 
        it('renders tags on a skipped suite as class attributes', function() {
            var runner = env.currentRunner();
            FeatureStory.feature('A skipped suite', function() {});
            
            runner.execute();
            
            var divs = fakeDocument.body.getElementsByTagName("div");
            var suiteDiv = getElementByClassName(divs, 'suite feature skipped');
            var suiteDescription = getElementByClassName(suiteDiv.children, 'description');
            
            expect(suiteDescription.text).toEqual('Feature: A skipped suite');
        });
        
        it('renders tags on a passing suite as class attributes', function() {
            var runner = env.currentRunner();
            FeatureStory.feature('A passing suite', function() {
                env.it("should pass", function() {
                    this.expect(true).toBeTruthy();
                });
            });
            
            runner.execute();
            
            var divs = fakeDocument.body.getElementsByTagName("div");
            var suiteDiv = getElementByClassName(divs, 'suite feature passed');
            var suiteDescription = getElementByClassName(suiteDiv.children, 'description');
            
            expect(suiteDescription.text).toEqual('Feature: A passing suite');
        });
        
        it('renders tags on a failing suite as class attributes', function() {
            var runner = env.currentRunner();
            FeatureStory.feature('A failing suite', function() {
                env.it("should fail", function() {
                    this.expect(true).toBeFalsey();
                });
            });
            
            runner.execute();
            
            var divs = fakeDocument.body.getElementsByTagName("div");
            var suiteDiv = getElementByClassName(divs, 'suite feature failed');
            var suiteDescription = getElementByClassName(suiteDiv.children, 'description');
            
            expect(suiteDescription.text).toEqual('Feature: A failing suite');
        });
    });
    
    describe('when reporting results for suite with summary entries', function() {
        describe('given a single summary entry', function() {
            it('renders the summary as an unordered list', function() {
                var runner = env.currentRunner();
                env.describe('A suite with summary', function() {
                    Meta.summary('Summary content');
                });
                
                runner.execute();
            
                var divs = fakeDocument.body.getElementsByTagName("div");
                var suiteDiv = getElementByClassName(divs, 'suite skipped');
                var suiteSummary = getElementByClassName(suiteDiv.children, 'summary');
                
                expect(suiteSummary.children[0].textContent).toEqual('Summary content');
            });
        });
        
        describe('given multiple summary entries', function() {
            it('renders the summary as an unordered list', function() {
                var runner = env.currentRunner();
                env.describe('A suite with summary', function() {
                    Meta.summary('Summary content');
                    Meta.summary('Another summary content');
                });
                
                runner.execute();
            
                var divs = fakeDocument.body.getElementsByTagName("div");
                var suiteDiv = getElementByClassName(divs, 'suite skipped');
                var suiteSummary = getElementByClassName(suiteDiv.children, 'summary');
                
                expect(suiteSummary.children[0].children[1].textContent).toEqual('Another summary content');
            });
        });
    });
    
    describe('when reporting results for specs with details', function() {
        describe('given a single detail item', function() {
            it('renders the detail as an unordered list', function() {
                var runner = env.currentRunner();
                env.describe('A suite', function() {
                    env.it('A spec with details', function() {
                        Meta.details('Detail content');
                    });
                });
                
                runner.execute();
            
                var divs = fakeDocument.body.getElementsByTagName("div");
                var specDiv = getElementByClassName(divs, 'spec passed');
                var specDetails = getElementByClassName(specDiv.children, 'details');
                
                expect(specDetails.children[0].children[0].textContent).toEqual('Detail content');
            });
        });
    });
        
    describe('when reporting the results of "examples"', function() {
        it('renders the contents of the example in "pre" "code" tags', function() {
            var runner = env.currentRunner();
            XDoc.example('Illustrating the output of an example', function() {
                env.describe("A simple example", function() {
                    env.it('should be rendered in the report', function() {
                        this.expect(true).toBeTruthy();
                    });
                });
            });
            
            runner.execute();
            
            var divs = fakeDocument.body.getElementsByTagName("div");
            var suiteDiv = getElementByClassName(divs, 'suite example passed');
            var exampleOutput = suiteDiv.getElementsByTagName("pre");
            expect(exampleOutput[0].textContent).toContain("env.describe(\"A simple example\", function");
        });
    });
});