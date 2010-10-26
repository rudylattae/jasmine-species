/**
 * Jasmine-Grammar - Additional Jasmine grammar to enable alternate BDD approaches.
 * Copyright (C) 2010, Rudy Lattae
 * License: Simplified BSD
 * 
 * Jasmine-Grammar contains some additions to the jasmine api that  make it 
 * more suitable to alternate BDD approaches. The end-goal is streamline the 
 * grammatical aspect of specing out an application from different view-points.
 * 
 * The new grammar should make it easier to create other types of specifications 
 * apart from "describe" and "it should". They are simply wrappers 
 * for "describe" and "it" so they follow the same rules for nesting. 
 */

// Top level namespace for the package
jasmine.grammar = (typeof jasmine.grammar === 'undefined') ? {} : jasmine.grammar;

jasmine.grammar.VERSION = '0.8.1b';


/**
 * Feature / Story => Scenario => ... style grammar
 */
jasmine.grammar.FeatureStory = {
    
    /**
     * Defines a suite tagged as a "feature"
     */
    feature: function(description, specDefinitions) {
        var suite = jasmine.grammar.getEnv().describe('Feature: ' + description, specDefinitions);
        suite.tags = ['feature'];
        return suite;
    },
    
    /**
     * Defines a suite tagged as a "story"
     */
    story: function(description, specDefinitions) {
        var suite = jasmine.grammar.getEnv().describe('Story: ' + description, specDefinitions);
        suite.tags = ['story'];
        return suite;
    },
    
    /**
     * Defines a suite tagged as a "scenario"
     */
    scenario: function(description, specDefinitions) {
        var suite = jasmine.grammar.getEnv().describe('Scenario: ' + description, specDefinitions);
        suite.tags = ['scenario'];
        return suite;
    },
    
    /**
     * Defines a suite tagged as a "component"
     */
    component: function(description, specDefinitions) {
        var suite = jasmine.grammar.getEnv().describe('Component: ' + description, specDefinitions);
        suite.tags = ['component'];
        return suite;
    }
};


/**
 * Given => When => Then ... style grammar
 */
jasmine.grammar.GWT = {
    
    /**
     * Defines a suite tagged as a "step" and marked as "isIntermediate"
     * 
     * An intermediate suite is not expected to declare any expectations. As such
     * any reporter rendering the results of an intermediate suite should render it as passed
     * if it does not have an explicitly failed expectation.
     */
    step: function(description, specDefinitions, tags) {
        var suite = jasmine.grammar.getEnv().describe(description, specDefinitions);
        suite.tags = ['step'];
        if (typeof tags !== 'undefined') {
            suite.tags = suite.tags.concat(tags);
        }
        suite.isIntermediate = true;
        return suite;
    },
    
    /**
     * Defines a suite tagged as a "given" step
     */
    given: function(description, specDefinitions) {
        return jasmine.grammar.GWT.step('Given ' + description, specDefinitions, ['given'])
    },
    
    /**
     * Defines a suite tagged as a "when" step
     */
    when: function(description, specDefinitions) {
        return jasmine.grammar.GWT.step('When ' + description, specDefinitions, ['when']);
    },
    
    /**
     * Defines a "then" spec that marks the conclusion of a Given, when, then construct
     */
    then: function(desc, func) {
        return jasmine.grammar.getEnv().it('Then ' + desc, func);
    },
    
    /**
     * Defines an "and" spec that is a continuation from a "then" statement
     */
    and: function(desc, func) {
        return jasmine.grammar.getEnv().it('And ' + desc, func);
    },
    
    /**
     * Defines a "but" spec that is a continuation from a "then" statement
     */
    but: function(desc, func) {
        return jasmine.grammar.getEnv().it('But ' + desc, func);
    }
};



/**
 * Concern => Context => Specification style grammar
 */
jasmine.grammar.ContextSpecification = {
    
    /**
     * Defines a suite tagged as a "concern"
     */
    concern: function(description, specDefinitions) {
        var suite = jasmine.grammar.getEnv().describe(description, specDefinitions);
        suite.tags = ['concern'];
        return suite;
    },
    
    /**
     * Defines a suite tagged as a "context"
     */
    context: function(description, specDefinitions) {
        var suite = jasmine.grammar.getEnv().describe(description, specDefinitions);
        suite.tags = ['context'];
        return suite;
    },
    
    /**
     * Defines a simple spec -- similar to it
     */
    spec: function(desc, func) {
        return jasmine.grammar.getEnv().it(desc, func);
    }
}

/**
 * Executable docs (Topic => Example) style grammar
 */
jasmine.grammar.XDoc = {
    
    /**
     * Defines a suite tagged as a "topic"
     */
    topic: function(description, specDefinitions) {
        var suite = jasmine.grammar.getEnv().describe(description, specDefinitions);
        suite.tags = ['topic'];
        return suite;
    },
    
    /**
     * Defines a suite tagged as an "example".
     *
     * An axample suite actually stores the inner suites as a string in the "defs" attribute 
     */
    example: function(description, specDefinitions) {
        var suite = jasmine.grammar.getEnv().describe(description, specDefinitions);
        suite.tags = ['example'];
        suite.expose = true;
        suite.defs = specDefinitions.toString()
            .replace(/^function.*\(.*\).*{/, '')
            .replace(/}$/, '').trim(); // stored for later output 
        return suite;
    },
    
    /**
     * Defines a simple spec without any associated function
     */
    pass: function(desc, func) {
        return jasmine.grammar.getEnv().it(desc);
    }
};


/**
 * Some more useful constructs that add data to or modify the behavior of suites/specs 
 */
jasmine.grammar.More = {
    
    /**
     * Attaches details to the parent suite.
     *
     * @param {String}/{List} value     content of the details
     * @param {String}  tags            the tags for the details
     * @see jasmine.grammar.SuiteDetails
     */
    details: function(value, tags) {
        if (typeof tags === 'undefined') {
            tags = 'details';
        }
        jasmine.grammar.getEnv().currentSuite.details = new jasmine.grammar.SuiteDetails(value, tags);
    }
};


// Utilities
// =========

/**
 * Getter for the Jasmine environment. Makes it possible to inject a different environment when necessary.
 */
jasmine.grammar.getEnv = function() {
  return jasmine.grammar._currentEnv = jasmine.grammar._currentEnv || jasmine.getEnv();
};

/**
 * Defines a details object to be attached to a suite
 * 
 * @constructor
 * @param {String}/{List} value     the content of the details (string or list)
 * @param {String}  tags            the tags for the details
 * @see jasmine.grammar.More.details
 */
jasmine.grammar.SuiteDetails = function(value, tags) {
    this.value = value;
    this.tags = tags;
};