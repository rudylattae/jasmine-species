---
layout: default
title: Start
---

## Overview

Jasmine-species enables you to go beyond "describe" and "it" when creating 
[Jasmine](http://pivotal.github.com/jasmine/) specification for your JavaScript 
software.

It also provides an Html Reporter that outputs cleaner specs. 


## Features

**Alternate grammar to describe the behavior of your software:**

* Feature/Story
* Given, When, Then (GWT)
* Context/Specification

**Cleaner Html reporting:**

* Renders the metadata tags of extended suites as css classes for custom styling
* Uses calm styles to display spec results that are easy to look at


## Requirements

* [Jasmine](http://pivotal.github.com/jasmine/) herself
* Any decent javascript namespace/package importer

    - Currently tested with [Namespacedotjs](https://github.com/smith/namespacedotjs)

    - You could try [AJILE](http://ajile.net/)


## Quick Start

1. Add Jasmine-species and its requirements to your runner page
2. Import the grammar you wish to use
3. Proceed with your BDD cycle as normal

**For bonus points**, Include the `calm.css` stylesheet and 
plug-in the StyledHtmlReporter to output your spec reports.
