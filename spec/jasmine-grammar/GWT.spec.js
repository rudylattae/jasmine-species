describe('jasmine.grammar.GWT', function() {
    var GWT = jasmine.grammar.GWT;
    var env;
    var parentSuite;
    var parentSpec;
    
    beforeEach(function() {
        env = new jasmine.Env();
        jasmine.grammar._currentEnv = env;
        
        parentSuite = env.describe('dummy suite', function() {});
        jasmine.grammar.getEnv().currentSuite = parentSuite;
        
        parentSpec = env.it('dummy spec', function() {});
        jasmine.grammar.getEnv().currentSpec = parentSpec;
    });
    
    describe('given', function() {
        it('creates a runs block within the current spec', function() {
            GWT.given('the system is in a known state', function() { return "given"; });
            
            expect(parentSpec.queue.blocks[1].func()).toEqual("given");
        });
        
        it('adds a "Given..." entry to the spec details', function() {
            GWT.given('the system is in a known state', function() { return "given"; });
            
            expect(parentSpec.details[0]).toEqual('Given the system is in a known state');
        });
    });
    
    describe('Given', function() {
        it('creates a runs block within the current spec', function() {
            GWT.Given('the system is in a known state', function() { return "Given"; });
            
            expect(parentSpec.queue.blocks[1].func()).toEqual("Given");
        });
        
        it('adds a "Given..." entry to the spec details', function() {
            GWT.Given('the system is in a known state', function() { return "Given"; });
            
            expect(parentSpec.details[0]).toEqual('Given the system is in a known state');
        });
    });
    
    describe('when', function() {
        it('creates a runs block within the current spec', function() {
            GWT.when('an event occurs', function() { return "when"; });
            
            expect(parentSpec.queue.blocks[1].func()).toEqual("when");
        });
        
        it('adds a "When..." entry to the spec details', function() {
            GWT.when('an event occurs', function() { return "when"; });
            
            expect(parentSpec.details[0]).toEqual('When an event occurs');
        });
    });
    
    describe('When', function() {
        it('creates a runs block within the current spec', function() {
            GWT.When('an event occurs', function() { return "When"; });
            
            expect(parentSpec.queue.blocks[1].func()).toEqual("When");
        });
        
        it('adds a "When..." entry to the spec details', function() {
            GWT.When('an event occurs', function() { return "When"; });
            
            expect(parentSpec.details[0]).toEqual('When an event occurs');
        });
    });
    
    describe('then', function() {
        it('creates a runs block within the current spec', function() {
            GWT.then('expect this outcome', function() { return "then"; });
            
            expect(parentSpec.queue.blocks[1].func()).toEqual("then");
        });
        
        it('adds a "Then..." entry to the spec details', function() {
            GWT.then('expect this outcome', function() { return "then"; });
            
            expect(parentSpec.details[0]).toEqual('Then expect this outcome');
        });
    });
    
    describe('Then', function() {
        it('creates a runs block within the current spec', function() {
            GWT.Then('expect this outcome', function() { return "Then"; });
            
            expect(parentSpec.queue.blocks[1].func()).toEqual("Then");
        });
        
        it('adds a "Then..." entry to the spec details', function() {
            GWT.Then('expect this outcome', function() { return "Then"; });
            
            expect(parentSpec.details[0]).toEqual('Then expect this outcome');
        });
    });
    
    describe('and', function() {
        it('creates a runs block within the current spec', function() {
            GWT.and('expect this outcome too', function() { return "and"; });
            
            expect(parentSpec.queue.blocks[1].func()).toEqual("and");
        });
        
        it('adds an "And..." entry to the spec details', function() {
            GWT.and('expect this outcome too', function() { return "and"; });
            
            expect(parentSpec.details[0]).toEqual('And expect this outcome too');
        });
    });
    
    describe('And', function() {
        it('creates a runs block within the current spec', function() {
            GWT.And('expect this outcome too', function() { return "And"; });
            
            expect(parentSpec.queue.blocks[1].func()).toEqual("And");
        });
        
        it('adds an "And..." entry to the spec details', function() {
            GWT.And('expect this outcome too', function() { return "And"; });
            
            expect(parentSpec.details[0]).toEqual('And expect this outcome too');
        });
    });
    
    describe('but', function() {
        it('creates a runs block within the current spec', function() {
            GWT.but('expect this outcome', function() { return "but"; });
            
            expect(parentSpec.queue.blocks[1].func()).toEqual("but");
        });
        
        it('adds a "But..." entry to the spec details', function() {
            GWT.but('expect this outcome', function() { return "but"; });
            
            expect(parentSpec.details[0]).toEqual('But expect this outcome');
        });
    });
    
    describe('But', function() {
        it('creates a runs block within the current spec', function() {
            GWT.But('expect this outcome', function() { return "But"; });
            
            expect(parentSpec.queue.blocks[1].func()).toEqual("But");
        });
        
        it('adds a "But..." entry to the spec details', function() {
            GWT.But('expect this outcome', function() { return "But"; });
            
            expect(parentSpec.details[0]).toEqual('But expect this outcome');
        });
    });
    
    describe('"given, when, then, ..." grammar', function() {
        describe('when used as steps in a spec', function() {
            it('creates runs blocks in sequence and adds entries for all the steps to the spec details', function() {
                GWT.given('a piece of cake', function() { return "I have my cake"; });
                GWT.when('I eat it', function() { return "I just ate my cake"; });
                GWT.then('I no longer have my cake', function() { return "I do not have my cake"; });
                
                expect(parentSpec.details[0]).toEqual('Given a piece of cake');
                expect(parentSpec.queue.blocks[1].func()).toEqual("I have my cake");
                
                expect(parentSpec.details[1]).toEqual('When I eat it');
                expect(parentSpec.queue.blocks[2].func()).toEqual("I just ate my cake");
                
                expect(parentSpec.details[2]).toEqual('Then I no longer have my cake');
                expect(parentSpec.queue.blocks[3].func()).toEqual("I do not have my cake");
            });
        });
        
        describe('when used in combination with jasmine "spyOn"', function() {
            it('the spy intercepts method calls as usual', function() {
                var Klass = function() {};
                Klass.prototype.method = function() {
                    return true;
                };
                
                var obj = new Klass();
                
                GWT.given('I spy on a method', function() {
                    spyOn(obj, 'method');
                    expect(obj.method.callCount).toEqual(0);
                });
                
                GWT.when('the method is invoked', function() {
                    obj.method();
                });
                
                GWT.then('the spy should indicate that it was called', function() {
                    expect(obj.method).toHaveBeenCalled(); 
                    expect(obj.method.callCount).toEqual(1); 
                });
            });
        });
    });
    
    describe('"Given, When, Then, ..." grammar', function() {
        describe('When used as steps in a spec', function() {
            it('creates runs blocks in sequence and adds entries for all the steps to the spec details', function() {
                GWT.Given('a piece of cake', function() { return "I have my cake"; });
                GWT.When('I eat it', function() { return "I just ate my cake"; });
                GWT.Then('I no longer have my cake', function() { return "I do not have my cake"; });
                
                expect(parentSpec.details[0]).toEqual('Given a piece of cake');
                expect(parentSpec.queue.blocks[1].func()).toEqual("I have my cake");
                
                expect(parentSpec.details[1]).toEqual('When I eat it');
                expect(parentSpec.queue.blocks[2].func()).toEqual("I just ate my cake");
                
                expect(parentSpec.details[2]).toEqual('Then I no longer have my cake');
                expect(parentSpec.queue.blocks[3].func()).toEqual("I do not have my cake");
            });
        });
        
        describe('When used in combination with jasmine "spyOn"', function() {
            it('the spy intercepts method calls as usual', function() {
                var Klass = function() {};
                Klass.prototype.method = function() {
                    return true;
                };
                
                var obj = new Klass();
                
                GWT.Given('I spy on a method', function() {
                    spyOn(obj, 'method');
                    expect(obj.method.callCount).toEqual(0);
                });
                
                GWT.When('the method is invoked', function() {
                    obj.method();
                });
                
                GWT.Then('the spy should indicate that it was called', function() {
                    expect(obj.method).toHaveBeenCalled(); 
                    expect(obj.method.callCount).toEqual(1); 
                });
            });
        });
    });
});
    
