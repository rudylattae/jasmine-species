/**
 * Jasmine-Aroma - Add some fragrance to the cool Jasmine JavaScript BDD framework
 * Copyright (C) 2010, Rudy Lattae
 * License: Simplified BSD
 * 
 * Jasmine-Aroma contains some additions to the jasmine api 
 * to make it more suitable to alternate BDD approaches.
 *
 * The package provides additions to the jasmine grammar that hopefully make it easier to 
 * create other types of specifications apart from "describe" and "it should".
 *
 * They are simply wrappers for "describe" and "it" so they follow the same rules
 * of nested specifications. The main benefit here is that you can spec out the various aspects of
 * your application from multiple viewpoints.
 */

// Top level namespace for the package
jasmine.aroma = (typeof jasmine.aroma === 'undefined') ? {} : jasmine.aroma;

jasmine.aroma.VERSION = '0.2.1dev';

/**
 * Getter for the Jasmine environment. Makes it possible to inject a different environment when necessary.
 */
jasmine.aroma.getEnv = function() {
  return jasmine.aroma._currentEnv = jasmine.aroma._currentEnv || jasmine.getEnv();
};


/**
 * Feature / Story => Scenario => ... style grammar
 */
jasmine.aroma.FeatureStory = {
    feature: function(description, specDefinitions) {
        var suite = jasmine.aroma.getEnv().describe('Feature: ' + description, specDefinitions);
        suite.type = 'feature';
        return suite;
    },
    
    story: function(description, specDefinitions) {
        var suite = jasmine.aroma.getEnv().describe('Story: ' + description, specDefinitions);
        suite.type = 'story';
        return suite;
    },
    
    scenario: function(description, specDefinitions) {
        var suite = jasmine.aroma.getEnv().describe('Scenario: ' + description, specDefinitions);
        suite.type = 'scenario';
        return suite;
    },
    
    component: function(description, specDefinitions) {
        var suite = jasmine.aroma.getEnv().describe('Component: ' + description, specDefinitions);
        suite.type = 'component';
        return suite;
    }
};


/**
 * Given => When => Then ... style grammar
 */
jasmine.aroma.GWT = {
    given: function(description, specDefinitions) {
        var suite = jasmine.aroma.getEnv().describe('Given ' + description, specDefinitions);
        suite.type = 'step';
        suite.isIntermediate = true;
        return suite;
    },
    
    when: function(description, specDefinitions) {
        var suite = jasmine.aroma.getEnv().describe('When ' + description, specDefinitions);
        suite.type = 'step';
        suite.isIntermediate = true;
        return suite;
    },
    
    then: function(desc, func) {
        return jasmine.aroma.getEnv().it('Then ' + desc, func);
    },
    
    and: function(desc, func) {
        return jasmine.aroma.getEnv().it('And ' + desc, func);
    },
    
    but: function(desc, func) {
        return jasmine.aroma.getEnv().it('But ' + desc, func);
    }
};



/**
 * Concern => Context => Specification style grammar
 */
jasmine.aroma.ContextSpecification = {
    concern: function(description, specDefinitions) {
        var suite = jasmine.aroma.getEnv().describe(description, specDefinitions);
        suite.type = 'concern';
        return suite;
    },
    
    context: function(description, specDefinitions) {
        var suite = jasmine.aroma.getEnv().describe(description, specDefinitions);
        suite.type = 'context';
        return suite;
    },
    
    spec: function(desc, func) {
        return jasmine.aroma.getEnv().it(desc, func);
    }
}