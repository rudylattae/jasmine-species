/**
 * Jasmine-Bloom - Cleaner reporting for your Jasmine specs
 * Copyright (C) 2010, Rudy Lattae
 * License: Simplified BSD
 * 
 * Jasmine-Bloom provides a slightly modified Html Reporter that outputs additional 
 * meta-data relating to your specs. The aim is to make it easier to augment the 
 * visual display of spec report.
 * 
 * Although jasmine-bloom is completely compatible with output from 
 * the standard "Describe" and "it" grammar, I encourage you to try it out
 * with jasmine-aroma's "feature", "story", etc. constructs. It's cool.
 */
 
// Top level namespace for the package
jasmine.bloom = (typeof jasmine.bloom === 'undefined') ? {} : jasmine.bloom;

jasmine.bloom.VERSION = '0.1.0dev';


jasmine.aroma.StyledReporter = function(doc) {
  this.document = doc || document;
  this.suiteDivs = {};
  this.logRunningSpecs = false;
};

jasmine.aroma.StyledReporter.prototype = new jasmine.TrivialReporter();
jasmine.aroma.StyledReporter.prototype.constructor = jasmine.aroma.StyledReporter;