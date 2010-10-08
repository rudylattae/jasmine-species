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

jasmine.aroma.VERSION = '0.6.5b';


/**
 * Feature / Story => Scenario => ... style grammar
 */
jasmine.aroma.FeatureStory = {
    feature: function(description, specDefinitions) {
        var suite = jasmine.aroma.getEnv().describe('Feature: ' + description, specDefinitions);
        suite.tags = ['feature'];
        return suite;
    },
    
    story: function(description, specDefinitions) {
        var suite = jasmine.aroma.getEnv().describe('Story: ' + description, specDefinitions);
        suite.tags = ['story'];
        return suite;
    },
    
    scenario: function(description, specDefinitions) {
        var suite = jasmine.aroma.getEnv().describe('Scenario: ' + description, specDefinitions);
        suite.tags = ['scenario'];
        return suite;
    },
    
    component: function(description, specDefinitions) {
        var suite = jasmine.aroma.getEnv().describe('Component: ' + description, specDefinitions);
        suite.tags = ['component'];
        return suite;
    }
};


/**
 * Given => When => Then ... style grammar
 */
jasmine.aroma.GWT = {
    step: function(description, specDefinitions, tags) {
        var suite = jasmine.aroma.getEnv().describe(description, specDefinitions);
        suite.tags = ['step'];
        if (typeof tags !== 'undefined') {
            suite.tags = suite.tags.concat(tags);
        }
        suite.isIntermediate = true;
        return suite;
    },
    
    given: function(description, specDefinitions) {
        return jasmine.aroma.GWT.step('Given ' + description, specDefinitions, ['given'])
    },
    
    when: function(description, specDefinitions) {
        return jasmine.aroma.GWT.step('When ' + description, specDefinitions, ['when']);
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
        suite.tags = ['concern'];
        return suite;
    },
    
    context: function(description, specDefinitions) {
        var suite = jasmine.aroma.getEnv().describe(description, specDefinitions);
        suite.tags = ['context'];
        return suite;
    },
    
    spec: function(desc, func) {
        return jasmine.aroma.getEnv().it(desc, func);
    }
}

/**
 * Executable docs (Topic => Example) style grammar
 */
jasmine.aroma.XDocs = {
    topic: function(description, specDefinitions) {
        var suite = jasmine.aroma.getEnv().describe(description, specDefinitions);
        suite.tags = ['topic'];
        return suite;
    },    
    
    example: function(description, specDefinitions) {
        var suite = jasmine.aroma.getEnv().describe(description, specDefinitions);
        suite.tags = ['example'];
        suite.expose = true;
        suite.defs = specDefinitions.toString(); // stored for later output 
        return suite;
    },
    
    /**
     * Specifies the passing condition for an example
     */
    pass: function(desc, func) {
        return jasmine.aroma.getEnv().it(desc);
    },
    
    details: function(value, tags) {
        jasmine.aroma.getEnv().currentSuite.details = new jasmine.aroma.SuiteDetails(value, tags);
    }
}

// Utilities
// =========

/**
 * Getter for the Jasmine environment. Makes it possible to inject a different environment when necessary.
 */
jasmine.aroma.getEnv = function() {
  return jasmine.aroma._currentEnv = jasmine.aroma._currentEnv || jasmine.getEnv();
};

/**
 * Defines a details object to be attached to a suite
 */
jasmine.aroma.SuiteDetails = function(value, tags) {
    this.value = value;
    this.tags = tags;
}