/**
 * Jasmine Grammar - Additional Jasmine grammar to enable alternate BDD approaches.
 * 
 * Copyright (C) 2010-2011, Rudy Lattae
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

(function(jasmine) {
    // ensure jasmine dependency is met
    if (typeof jasmine === 'undefined') {
        throw new Error("Jasmine must be available before Jasmine Species is loaded.")
    }


    var _currentEnv;

    /**
     * Injects a custom Jasmine environment
     */
    function setEnv(env) {
        _currentEnv = env;
    }

    /**
     * Yields a lazy reference to the current jasmine env
     */
    function getEnv() {
        if (_currentEnv == null) {
            _currentEnv = jasmine.getEnv();
        }
        return _currentEnv;
    };


    /**
     * Feature / Story => Scenario => ... style grammar
     */
    var FeatureStory = {
        feature: function(description, specDefinitions) {
            var suite = getEnv().describe('Feature: ' + description, specDefinitions);
            suite.tags = ['feature'];
            return suite;
        },

        story: function(description, specDefinitions) {
            var suite = getEnv().describe('Story: ' + description, specDefinitions);
            suite.tags = ['story'];
            return suite;
        },

        component: function(description, specDefinitions) {
            var suite = getEnv().describe('Component: ' + description, specDefinitions);
            suite.tags = ['component'];
            return suite;
        },

        scenario: function(desc, func) {
            return getEnv().it('Scenario: ' + desc, func);
        }
    };


    /**
     * Given => When => Then ... style grammar
     */
    var GWT = {
        given: function(desc, func) {
            return _addStepToCurrentSpec('Given ' + desc, func);
        },

        when: function(desc, func) {
            return _addStepToCurrentSpec('When ' + desc, func);
        },

        then: function(desc, func) {
            return _addStepToCurrentSpec('Then ' + desc, func);
        },

        and: function(desc, func) {
            return _addStepToCurrentSpec('And ' + desc, func);
        },

        but: function(desc, func) {
            return _addStepToCurrentSpec('But ' + desc, func);
        }
    };


    /**
     * Concern => Context => Specification style grammar
     */
    var ContextSpecification = {
        concern: function(description, specDefinitions) {
            var suite = getEnv().describe(description, specDefinitions);
            suite.tags = ['concern'];
            return suite;
        },

        context: function(description, specDefinitions) {
            var suite = getEnv().describe(description, specDefinitions);
            suite.tags = ['context'];
            return suite;
        },

        spec: function(desc, func) {
            return getEnv().it(desc, func);
        }
    };


    /**
     * Executable docs (Topic => Example) style grammar
     */
    var XDoc = {
        topic: function(description, specDefinitions) {
            var suite = getEnv().describe(description, specDefinitions);
            suite.tags = ['topic'];
            return suite;
        },

        /**
         * Defines a suite tagged as an "example".
         *
         * An axample suite stores the inner suites as a string in the "defs" attribute
         */
        example: function(description, specDefinitions) {
            var suite = getEnv().describe(description, specDefinitions);
            suite.tags = ['example'];
            suite.expose = true;
            suite.defs = specDefinitions.toString()
                .replace(/^function.*\(.*\).*{/, '')
                .replace(/}$/, '').trim(); // stored for later output
            return suite;
        },

        pass: function(desc, func) {
            return getEnv().it(desc);
        }
    };


    /**
     * Some more useful constructs that attach metadata to suites and specs
     */
    var Meta = {

        /**
         * Adds summary content to the current suite.
         *
         * @param {String} content(s)     variable number of detail content
         * @see jasmine.grammar.SuiteDetails
         */
        summary: function() {
            var suite = getEnv().currentSuite;
            suite.summary = suite.summary || [];

            if (arguments.length > 0) {
                for(i=0; i<arguments.length; i++) {
                    suite.summary.push(arguments[i]);
                }
            }
        },

        /**
         * Adds detail entries in the current spec.
         *
         * @param {String} content(s)     variable number of detail content
         * @see jasmine.grammar.SuiteDetails
         */
        details: function() {
            var spec = getEnv().currentSpec;
            spec.details = spec.details || [];

            if (arguments.length > 0) {
                for(i=0; i<arguments.length; i++) {
                    spec.details.push(arguments[i]);
                }
            }
        }
    };


    /**
     * Adds the given function as a step (runs block) in the current spec. Also adds the description to the details list of the spec
     */
    function _addStepToCurrentSpec(desc, func) {
        var spec = getEnv().currentSpec;
        spec.details = spec.details || [];
        spec.details.push(desc);
        spec.runs(func);
        return spec;
    }


    // ==== exports ====
    jasmine.grammar = {
        FeatureStory: FeatureStory,
        GWT: GWT,
        ContextSpecification: ContextSpecification,
        XDoc: XDoc,
        Meta: Meta,
        setEnv: setEnv
    };

})(jasmine);


// Top level namespace for the package
jasmine.grammar = (typeof jasmine.grammar === 'undefined') ? {} : jasmine.grammar;


/**
 * Add proper case aliases to GWT for Coffeescript use
 */

(function(GWT) {
  GWT.Given = GWT.given;
  GWT.When  = GWT.when;
  GWT.Then  = GWT.then;
  GWT.And   = GWT.and;
  GWT.But   = GWT.but;
}) (jasmine.grammar.GWT);

