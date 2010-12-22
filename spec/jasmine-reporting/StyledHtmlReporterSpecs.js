describe('jasmine.reporting.StyledHtmlReporter', function() {
    var env;
    var reporter;
    var body;
    var fakeDocument;
    
    var FeatureStory = jasmine.grammar.FeatureStory;
    var GWT = jasmine.grammar.GWT;
    var XDoc = jasmine.grammar.XDoc;
    var More = jasmine.grammar.More;
    
    // these helpers were ripped clean out of the jasmin's TrivialReporterSpec
    beforeEach(function() {
        env = new jasmine.Env();
        env.updateInterval = 0;
        jasmine.grammar._currentEnv = env;
        
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
        it('should render a skipped suite with "skipped" class', function() {
            var runner = env.currentRunner();
            env.describe("A skipped suite", function() {});
            
            runner.execute();
            
            var divs = fakeDocument.body.getElementsByTagName("div");
            expect(function() {
                getElementByClassName(divs, 'suite skipped');
            }).not.toThrow();
        });
        
        it('should render a passing suite with "passed" class', function() {
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
        
        it('should render a failing suite with "failed" class', function() {
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
        it('should render tags on a skipped suite as class attributes', function() {
            var runner = env.currentRunner();
            FeatureStory.feature('A skipped suite', function() {});
            
            runner.execute();
            
            var divs = fakeDocument.body.getElementsByTagName("div");
            var suiteDiv = getElementByClassName(divs, 'suite feature skipped');
            var suiteDescription = getElementByClassName(suiteDiv.children, 'description');
            
            expect(suiteDescription.text).toEqual('Feature: A skipped suite');
        });
        
        it('should render tags on a passing suite as class attributes', function() {
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
        
        it('should render tags on a failing suite as class attributes', function() {
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
    
    describe('when reporting results for suites with details', function() {
        describe('given the details are provided as a string', function() {
            it('should render the details as a paragraph with the given tag as the class attribute', function() {
                var runner = env.currentRunner();
                XDoc.example('Providing details for a suite', function() {
                    More.details('This is a simple example', 'note');
                });
                
                runner.execute();
            
                var divs = fakeDocument.body.getElementsByTagName("div");
                var suiteDiv = getElementByClassName(divs, 'suite example skipped');
                var suiteDetails = getElementByClassName(suiteDiv.children, 'note');
                
                expect(suiteDetails.textContent).toEqual('This is a simple example');
            });
        });
        
        describe('given the details are provided as a string with a list of tags', function() {
            it('should render the details as a paragraph with the given tags as the class attributes', function() {
                var runner = env.currentRunner();
                XDoc.example('Providing details for a suite', function() {
                    More.details('This is a simple example', ['note', 'readme']);
                });
                
                runner.execute();
            
                var divs = fakeDocument.body.getElementsByTagName("div");
                var suiteDiv = getElementByClassName(divs, 'suite example skipped');
                var suiteDetails = getElementByClassName(suiteDiv.children, 'note readme');
                
                expect(suiteDetails.textContent).toEqual('This is a simple example');
            });
        });
        
        describe('given the details are provided as a list', function() {
            it('should render the details as an unordered list', function() {
                var runner = env.currentRunner();
                XDoc.example('Providing details for a suite', function() {
                    More.details(['Step 1', 'Step 2', 'Step 3'], 'info');
                });
                
                runner.execute();
            
                var divs = fakeDocument.body.getElementsByTagName("div");
                var suiteDiv = getElementByClassName(divs, 'suite example skipped');
                var suiteDetails = getElementByClassName(suiteDiv.children, 'info');
                
                expect(suiteDetails.children[1].textContent).toEqual('Step 2');
            });
        });
    });
    
    describe('when reporting the results of "examples"', function() {
        it('should render the contents of the example in "pre" "code" tags', function() {
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