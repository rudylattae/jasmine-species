---
layout: default
title: Start
---

## Overview

Jasmine-species enables you to go beyond "describe" and "it" when creating 
[Jasmine](http://pivotal.github.com/jasmine/) specification for your JavaScript 
software.

It also provides an Html Reporter that outputs cleaner specs. 


## A trivial example

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/rudylattae/J4PpC/3/embedded/">
    Example code from jsFiddle
</iframe>

{% highlight javascript %}
feature('Number addition', function() {
    scenario('Adding two positive integers', function() {
        var num1 = 0;
        var num2 = 0;
        var ans = 0;
        
        given('I have the numbers 5 and 10', function() {
            num1 = 5;
            num2 = 10;
        });
        
        when('I sum them', function() {
            ans = num1 + num2;
        });
        
        then('The answer should be 15', function() {
            expect(ans).toEqual(15);
        });
    });
});
{% endhighlight %}


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
