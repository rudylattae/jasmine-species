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
        it('should create a runs block within the current spec', function() {
            GWT.given('the system is in a known state', function() { return "given"; });
            
            expect(parentSpec.queue.blocks[1].func()).toEqual("given");
        });
        
        it('should add the block description prefixed with "Given" to the spec details', function() {
            GWT.given('the system is in a known state', function() { return "given"; });
            
            expect(parentSpec.details[0]).toEqual('Given the system is in a known state');
        });
    });
    
    describe('when', function() {
        it('should create a runs block within the current spec', function() {
            GWT.when('an event occurs', function() { return "when"; });
            
            expect(parentSpec.queue.blocks[1].func()).toEqual("when");
        });
        
        it('should add the block description prefixed with "When" to the spec details', function() {
            GWT.when('an event occurs', function() { return "when"; });
            
            expect(parentSpec.details[0]).toEqual('When an event occurs');
        });
    });
    
    describe('then', function() {
        it('should create a runs block within the current spec', function() {
            GWT.then('expect this outcome', function() { return "then"; });
            
            expect(parentSpec.queue.blocks[1].func()).toEqual("then");
        });
        
        it('should add the block description prefixed with "Then" to the spec details', function() {
            GWT.then('expect this outcome', function() { return "then"; });
            
            expect(parentSpec.details[0]).toEqual('Then expect this outcome');
        });
    });
    
    describe('and', function() {
        it('should create a runs block within the current spec', function() {
            GWT.and('expect this outcome too', function() { return "and"; });
            
            expect(parentSpec.queue.blocks[1].func()).toEqual("and");
        });
        
        it('should add the block description prefixed with "And" to the spec details', function() {
            GWT.and('expect this outcome too', function() { return "and"; });
            
            expect(parentSpec.details[0]).toEqual('And expect this outcome too');
        });
    });
    
    describe('but', function() {
        it('should create a runs block within the current spec', function() {
            GWT.but('expect this outcome', function() { return "but"; });
            
            expect(parentSpec.queue.blocks[1].func()).toEqual("but");
        });
        
        it('should add the block description prefixed with "But" to the spec details', function() {
            GWT.but('expect this outcome', function() { return "but"; });
            
            expect(parentSpec.details[0]).toEqual('But expect this outcome');
        });
    });
    
    describe('"given, when, then" when used as steps in a spec', function() {
        it('should create runs blocks with matching details within the current spec for all steps', function() {
            GWT.given('a piece of cake', function() { return "I am a given"; });
            GWT.when('I eat it', function() { return "I am a when"; });
            GWT.then('I should have it too', function() { return "I am a then"; });
            
            expect(parentSpec.queue.blocks[1].func()).toEqual("I am a given");
            expect(parentSpec.details[0]).toEqual('Given a piece of cake');
            
            expect(parentSpec.queue.blocks[2].func()).toEqual("I am a when");
            expect(parentSpec.details[1]).toEqual('When I eat it');
            
            expect(parentSpec.queue.blocks[3].func()).toEqual("I am a then");
            expect(parentSpec.details[2]).toEqual('Then I should have it too');
        });
    });
});
