---
layout: default
title: Start
---

## Overview

Jasmine-species enables you to go beyond "describe" and "it" when creating 
[Jasmine](http://pivotal.github.com/jasmine/) specification for your JavaScript 
software.

It also provides an Html Reporter that outputs cleaner specs. 


## Quick Start

If you already have a spec runner with Jasmine and a namespace importer, 
you can follow the quick steps below to start enjoying jasmine-species.

### 1. Add jasmine-grammar and jasmine-reporting to your runner page

{% highlight html %}
    <link rel="stylesheet" type="text/css" href="lib/jasmine-species/calm.css">

    <script type="text/javascript" src="lib/jasmine-species/jasmine-grammar.js"></script>
    <script type="text/javascript" src="lib/jasmine-species/jasmine-reporting.js"></script>
{% endhighlight %}

### 2. Import the grammar you wish to use

{% highlight javascript %}
    Namespace.use('jasmine.grammar.FeatureStory.*');  // imports feature, scenario, ...
    Namespace.use('jasmine.grammar.GWT.*');   // imports given, when, ...
{% endhighlight %}

### 3. Plug-in the StyledHtmlReporter to handle your spec reporting

{% highlight javascript %}
jasmine.getEnv().addReporter(new jasmine.reporting.StyledHtmlReporter());
{% endhighlight %}

### 4. Happy BDDing!

Create your specs with the extended grammar:

{% highlight javascript %}
feature('Number crunching', function() {
    scenario('Adding two positive integers', function() {
        var ans = 0;
        
        when('I sum the numbers 5 and 10', function() {
            ans = 5 + 10;
        });
        
        then('The answer should be 15', function() {
            expect(ans).toEqual(15);
        });
    });
});
{% endhighlight %}


## An interactive example on JSFiddle

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/rudylattae/R9Vrk/embedded/">
    "Jasmine-Species - Quick Start" example on jsfiddle
</iframe>


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

