describe('jasmine.bloom.StyledHtmlReporter', function() {
    var env;
    var reporter;
    var body;
    var fakeDocument;
    
    var FeatureStory = jasmine.aroma.FeatureStory;
    var GWT = jasmine.aroma.GWT;
    var XDocs = jasmine.aroma.XDocs;
    
    // these helpers were ripped clean out of the jasmin's TrivialReporterSpec
    beforeEach(function() {
        env = new jasmine.Env();
        env.updateInterval = 0;
        jasmine.aroma._currentEnv = env;
        
        body = document.createElement("body");
        fakeDocument = { body: body, location: { search: "" }};
        reporter = new jasmine.bloom.StyledHtmlReporter(fakeDocument);
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
    
    describe('when reporting results for intermediate suites', function() { 
        it('should render an intermediate suite with no specs as passed', function() {
            var runner = env.currentRunner();
            GWT.when('an intermediate event occurs', function() {});
            
            runner.execute();
            
            var divs = fakeDocument.body.getElementsByTagName("div");
            var suiteDiv = getElementByClassName(divs, 'suite step when passed');
            var suiteDescription = getElementByClassName(suiteDiv.children, 'description');
            
            expect(suiteDescription.text).toEqual('When an intermediate event occurs');
        });
        
        it('should render an intermediate suite with passing specs as passed', function() {
            var runner = env.currentRunner();
            GWT.given('a pre-condition is met', function() {
                env.it("should pass", function() {
                    this.expect(true).toBeTruthy();
                });
            });
            
            runner.execute();
            
            var divs = fakeDocument.body.getElementsByTagName("div");
            var suiteDiv = getElementByClassName(divs, 'suite step given passed');
            var suiteDescription = getElementByClassName(suiteDiv.children, 'description');
            
            expect(suiteDescription.text).toEqual('Given a pre-condition is met');
        });
        
        it('should render an intermediate suite with failing specs as failed', function() {
            var runner = env.currentRunner();
            GWT.given('a pre-condition is met', function() {
                env.it("should fail", function() {
                    this.expect(true).toBeFalsey();
                });
            });
            
            runner.execute();
            
            var divs = fakeDocument.body.getElementsByTagName("div");
            var suiteDiv = getElementByClassName(divs, 'suite step given failed');
            var suiteDescription = getElementByClassName(suiteDiv.children, 'description');
            
            expect(suiteDescription.text).toEqual('Given a pre-condition is met');
        });
    });
    
    describe('when reporting results for suites with details', function() {
        describe('given the details are provided as a string', function() {
            it('should render the details as a paragraph with the given tag as the class attribute', function() {
                var runner = env.currentRunner();
                XDocs.example('Providing details for a suite', function() {
                    XDocs.details('This is a simple example', 'note');
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
                XDocs.example('Providing details for a suite', function() {
                    XDocs.details('This is a simple example', ['note', 'readme']);
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
                XDocs.example('Providing details for a suite', function() {
                    XDocs.details(['Step 1', 'Step 2', 'Step 3'], 'info');
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
            XDocs.example('Illustrating the output of an example', function() {
                env.describe('A simple example', function() {
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