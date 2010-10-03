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

jasmine.bloom.VERSION = '0.2.5dev';


jasmine.bloom.StyledReporter = function(doc) {
    this.document = doc || document;
    this.suiteDivs = {};
    this.logRunningSpecs = false;
};

jasmine.bloom.StyledReporter.prototype = new jasmine.TrivialReporter();
jasmine.bloom.StyledReporter.prototype.constructor = jasmine.aroma.StyledReporter;


jasmine.bloom.StyledReporter.prototype.reportRunnerStarting = function(runner) {
  var showPassed, showSkipped;

  this.outerDiv = this.createDom('div', { className: 'jasmine_reporter' },
      this.createDom('div', { className: 'banner' },
        this.createDom('div', { className: 'logo' },
            this.createDom('a', { href: 'http://pivotal.github.com/jasmine/', target: "_blank" }, "Jasmine"),
            this.createDom('span', { className: 'version' }, runner.env.versionString())),
        this.createDom('div', { className: 'options' },
            "Show ",
            showPassed = this.createDom('input', { id: "__jasmine_TrivialReporter_showPassed__", type: 'checkbox' }),
            this.createDom('label', { "for": "__jasmine_TrivialReporter_showPassed__" }, " passed "),
            showSkipped = this.createDom('input', { id: "__jasmine_TrivialReporter_showSkipped__", type: 'checkbox' }),
            this.createDom('label', { "for": "__jasmine_TrivialReporter_showSkipped__" }, " skipped")
            )
          ),

      this.runnerDiv = this.createDom('div', { className: 'runner running' },
          this.createDom('a', { className: 'run_spec', href: '?' }, "run all"),
          this.runnerMessageSpan = this.createDom('span', {}, "Running..."),
          this.finishedAtSpan = this.createDom('span', { className: 'finished-at' }, ""))
      );

  this.document.body.appendChild(this.outerDiv);

  var suites = runner.suites();
  for (var i = 0; i < suites.length; i++) {
    var suite = suites[i];

    var suiteTags = (typeof suite.tags === 'undefined') ? '' : ' ' + suite.tags.join(' ');
    
    var suiteDiv = this.createDom('div', { className: 'suite' + suiteTags },
        this.createDom('a', { className: 'run_spec', href: '?spec=' + encodeURIComponent(suite.getFullName()) }, "run"),
        this.createDom('a', { className: 'description', href: '?spec=' + encodeURIComponent(suite.getFullName()) }, suite.description));
    this.suiteDivs[suite.id] = suiteDiv;
    var parentDiv = this.outerDiv;
    if (suite.parentSuite) {
      parentDiv = this.suiteDivs[suite.parentSuite.id];
    }
    parentDiv.appendChild(suiteDiv);
  }

  this.startedAt = new Date();

  var self = this;
  showPassed.onchange = function(evt) {
    if (evt.target.checked) {
      self.outerDiv.className += ' show-passed';
    } else {
      self.outerDiv.className = self.outerDiv.className.replace(/ show-passed/, '');
    }
  };

  showSkipped.onchange = function(evt) {
    if (evt.target.checked) {
      self.outerDiv.className += ' show-skipped';
    } else {
      self.outerDiv.className = self.outerDiv.className.replace(/ show-skipped/, '');
    }
  };
};

jasmine.bloom.StyledReporter.prototype.reportSuiteResults = function(suite) {
  var results = suite.results();
  var status = results.passed() ? 'passed' : 'failed';
  if (results.totalCount == 0 && (!status == 'failed' || !suite.isIntermediate)) { // todo: change this to check results.skipped
    status = 'skipped';
  }
  this.suiteDivs[suite.id].className += " " + status;
};