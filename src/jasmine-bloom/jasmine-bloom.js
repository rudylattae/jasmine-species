/**
 * Jasmine-Bloom - Relaxed reporting for your Jasmine specs
 * Copyright (C) 2010, Rudy Lattae
 * License: Simplified BSD
 * 
 * Jasmine-Bloom provides a slightly modified Html Reporter that outputs additional 
 * meta-data relating to your specs. The aim is to make it easier to modify the 
 * presentation of the spec report.
 */
 
// Top level namespace for the package
jasmine.bloom = (typeof jasmine.bloom === 'undefined') ? {} : jasmine.bloom;

jasmine.bloom.VERSION = '0.4.2dev';


jasmine.bloom.StyledHtmlReporter = function(doc) {
    this.document = doc || document;
    this.suiteDivs = {};
    this.logRunningSpecs = false;
};

jasmine.bloom.StyledHtmlReporter.prototype = new jasmine.TrivialReporter();
jasmine.bloom.StyledHtmlReporter.prototype.constructor = jasmine.aroma.StyledHtmlReporter;


jasmine.bloom.StyledHtmlReporter.prototype.reportRunnerStarting = function(runner) {
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
        this.createDom('a', { className: 'description', href: '?spec=' + encodeURIComponent(suite.getFullName()) }, suite.description),
        (typeof suite.details !== 'undefined') ? this.createDomFromDetails(suite.details) : null,
        (typeof suite.expose !== 'undefined' && suite.expose) ? this.createDom('pre', {}, suite.defs): null);
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

jasmine.bloom.StyledHtmlReporter.prototype.reportSuiteResults = function(suite) {
  var results = suite.results();
  var status = results.passed() ? 'passed' : 'failed';
  if (results.totalCount == 0 && (!status == 'failed' || !suite.isIntermediate)) { // todo: change this to check results.skipped
    status = 'skipped';
  }
  this.suiteDivs[suite.id].className += " " + status;
};


/**
 * Creates the proper dom element for the given details object.
 *
 * If the details.value is a simple string, the element created is a "p".
 * If the details.value is a list, the element created is an unordered list.
 * The details.tags are rendered to the class attribute on the dom element created  
 */
jasmine.bloom.StyledHtmlReporter.prototype.createDomFromDetails = function(details) {
    var classAttrs = '';
    if (typeof details.tags !== 'undefined') {
        classAttrs = (details.tags instanceof Array) ? details.tags.join(' ') : details.tags; 
    }
    if (details.value instanceof Array) {
        return this.createDomList('ul', { className: classAttrs}, details.value);
    }
    
    return this.createDom('p', { className: classAttrs}, details.value);
}

/**
 * Creates dom element with the suite defs as content 
 */
jasmine.bloom.StyledHtmlReporter.prototype.createDomFromSuiteDefs = function(defs) {
    var classAttrs = '';
    if (typeof defs !== 'undefined') {
        return this.createDom('p', {}, defs);
    }
}

/**
 * Creates a list of 'li' elements given an array
 */
jasmine.bloom.StyledHtmlReporter.prototype.createDomList = function(type, attrs, items) {
    var list;
    if (typeof items !== 'undefined' && items.length > 0) {
        list = this.createDom(type, attrs);
        for (var i = 0; i < items.length; i++) {
            list.appendChild(this.createDom('li', {}, items[i]));
        }
    }
    return list;
};