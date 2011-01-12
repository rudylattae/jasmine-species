---
layout: default
title: Releases
---

# Releases

## 0.8.5b -- Jan 10, 2011

This release contains an overhauled implementation of the GWT grammar. 
The documentation has been reorganized for clarity and updated to reflect 
the changes to the grammar.

As usual any feedback -- how you are using it, bug reports, patches, 
documentation updates, etc. -- are welcome.

Cheers!

### Highlights

The key change is that all GWT grammar elements now create "runs" blocks, 
not suites or specs as before. As such they must only be used in a spec 
block. See the [documentation](docs.html#given_when_then_gwt_grammar) for details. 

Get your copy here: 
[jasmine-species-0.8.5b.zip](https://github.com/downloads/rudylattae/jasmine-species/jasmine-species-0.8.5b.zip)

### Details

**jasmine-grammar**

* Renamed the More module to Meta: it contains "summary" and "details" metadata grammar elements
* Fixed the GWT grammar to work with jasmine spies - [#1](https://github.com/rudylattae/jasmine-species/issues/issue/1)

**jasmine-reporting**

* Displays summary and details metadata attached to suites and specs respectively

**documentation**

* Restructured the documentation to make it easier for new users to get started
* Improved the jsFiddle Quick start demo
* Added a releases section to the project site


## 0.8.2b -- Nov 10, 2010

First public release. Grab the package here: 
[jasmine-species-0.8.2b.zip](https://github.com/downloads/rudylattae/jasmine-species/jasmine-species-0.8.2b.zip)