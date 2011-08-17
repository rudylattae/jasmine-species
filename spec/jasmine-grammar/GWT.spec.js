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
    
    describe('whilst', function() {
        it('creates a runs block within the current spec', function() {
            GWT.whilst('an event occurs', function() { return "whilst"; });
            
            expect(parentSpec.queue.blocks[1].func()).toEqual("whilst");
        });
        
        it('adds a "Whilst..." entry to the spec details', function() {
            GWT.whilst('an event occurs', function() { return "whilst"; });
            
            expect(parentSpec.details[0]).toEqual('Whilst an event occurs');
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
    
    describe('hence', function() {
        it('creates a runs block within the current spec', function() {
            GWT.hence('expect this outcome', function() { return "hence"; });
            
            expect(parentSpec.queue.blocks[1].func()).toEqual("hence");
        });
        
        it('adds a "Hence..." entry to the spec details', function() {
            GWT.hence('expect this outcome', function() { return "hence"; });
            
            expect(parentSpec.details[0]).toEqual('Hence expect this outcome');
        });
    });
    
    describe('and', function() {
        it('creates a runs block within the current spec', function() {
            GWT.and('expect this outcome too', function() { return "and"; });
            
            expect(parentSpec.queue.blocks[1].func()).toEqual("and");
        });
        
        it('adds a "And..." entry to the spec details', function() {
            GWT.and('expect this outcome too', function() { return "and"; });
            
            expect(parentSpec.details[0]).toEqual('And expect this outcome too');
        });
    });
    
    describe('likewise', function() {
        it('creates a runs block within the current spec', function() {
            GWT.likewise('expect this outcome too', function() { return "likewise"; });
            
            expect(parentSpec.queue.blocks[1].func()).toEqual("likewise");
        });
        
        it('adds a "Likewise..." entry to the spec details', function() {
            GWT.likewise('expect this outcome too', function() { return "likewise"; });
            
            expect(parentSpec.details[0]).toEqual('Likewise expect this outcome too');
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
});
    
