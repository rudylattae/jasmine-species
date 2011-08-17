---
layout: default
title: Documentation
---

# Documentation

## Requirements and setup

To use jasmine-species in your project, you simply include it and the 
necessary dependencies into your spec runner. Below are the requirements:

* [Jasmine BDD](http://pivotal.github.com/jasmine/)
* [Namespacedotjs](https://github.com/smith/namespacedotjs), 
or any javascript namespace importing tool

For more information on setting up your your project to use jasmine-specied, 
see the [Getting started](index.html) guide.

If you have already taken a look at the [Getting started](index.html) guide, 
you know that the jasmine-species project provides two extensions to the 
awesome Jasmine BDD tool: **Grammar (jasmine-grammar)** and 
**Reporting (jasmine-reporting)**. 
Here you will find descriptions of the features offered by each of these
extensions.


## Grammar extensions (jasmine-grammar)

The grammar component offers additional "words" for use in your 
Jasmine-powered specifications. In order to keep from polluting your global 
namespace, all the grammar elements are available in modules. Thus you have 
the choice to import only the modules or specific words you wish to use in 
your specefications. 

Here we will look at the grammar modules available and what they offer.


### Feature/Story grammar

Located in the **jasmine.grammar.FeatureStory** module.

**What's in it?**

* **feature**: Defines a suite tagged as a "feature"
* **story**: Defines a suite tagged as a "story"
* **component**: Defines a suite tagged as a "component"
* **scenario**: Defines a spec

**Trivial usage example**

{% highlight javascript %}
component('ATM', function() {
    feature('Withdrawing cash', function() {
        scenario('Enough funds to cover requested amount', function() {
            // ... blah, blah, blah ...    
        });
        
        scenario('Non sufficient funds', function() {
            // ... blah, blah, blah ...    
        });
    });
});
{% endhighlight %}


### Given, When, Then (GWT) grammar

Located in the **jasmine.grammar.GWT** module.

**What's in it?**

* **given**: Defines a suite tagged as a "given" step (marked as "isIntermediate")
* **when**: Defines a suite tagged as a "when" step (marked as "isIntermediate")
* **whilst**[^cs]: Defines a suite tagged as a "whilst" step (marked as "isIntermediate")
* **then**: Defines a "then" spec that marks the conclusion of a Given, when, then construct
* **hence**[^cs]: Defines a "hence" spec that marks the conclusion of a Given, whilst, hence construct
* **and**: Defines an "and" spec that is a continuation from a "then" statement
* **likewise**[^cs]: Defines an "likewise" spec that is a continuation from a "hence" statement
* **but**: Defines an "and" spec that is a continuation from a "then" statement

[^cs]: Provided for CoffeeScript use, as `when`, `then`, and `and` are
CoffeeScript keywords.

**Trivial usage example**

{% highlight javascript %}
var Account = function(balance) {
    this.balance = balance;
};

feature('Open an account', function() {
    scenario('I have $5', function() {
        var cash; 
        var account;
        
        given('I have enough money to open an account', function() {
            cash = 5;
        });
        when('I open my account', function() {
            account = new Account(cash);
        });
        then('my account balance should be $5', function() {
            expect(account.balance).toEqual(5);
        });
    });
});
{% endhighlight %}

**Trivial usage example - CoffeeScript**

{% highlight coffeescript %}
Account = (balance) ->
  @balance = balance

feature "Open an account", ->
  scenario "I have $5", ->
    
    given "I have enough money to open an account", ->
      cash = 5

    whilst "I open my account", ->
      account = new Account cash

    hence "my account balance should be $5", ->
      (expect account.balance).toEqual 5
{% endhighlight %}


**Note:** all the "words" in this module **must only be used within a spec**. 
These grammar elements create ["runs"](http://pivotal.github.com/jasmine/async.html) 
blocks as such they need to live within a spec block and not a suite. 

E.g. you may not do this:

{% highlight javascript %}
describe('My suite', function() {
    given('A pre-condition is met', function() {
        // ...
    });
});
{% endhighlight %}

You may use the GWT grammar within spec blocks:

{% highlight javascript %}
describe('My suite', function() {
    it('My spec', function() {
        given('A pre-condition is met', function() {
            // ...
        });
    });
});
{% endhighlight %}


### Context/Specification grammar

Located in the **jasmine.grammar.ContextSpecification** module.

**What's in it?**

* **concern**: Defines a suite tagged as a "concern"
* **context**: Defines a suite tagged as a "context"
* **spec**: Defines a simple spec -- similar to "it"

**Trivial usage example**

{% highlight javascript %}
concern('Lists', function() {
    context('A new list', function() {
        var l = [];
        spec('Is empty', function() {
            expect(l.length).toBe(0);
        });
    });
    
    context('A list with stuff in it', function() {
        var l = [];
        l.push('Stuff');
        
        spec('Is not empty', function() {
            expect(l.length > 0).toBe(true);
        });
    });
});
{% endhighlight %}


### Metadata grammar

Located in the **jasmine.grammar.Meta** module.

**What's in it?**

* **summary**: Adds summary content to the current **suite**
* **details**: Adds detail entries in the current **spec**

**Trivial usage example**

You may only add summary metadata to a suite:

{% highlight javascript %}
describe('My suite', function() {
    summary(
        'Some relevant info about this suite',
        'Another less relevant info',
        'You get the idea ...'
    );
});
{% endhighlight %}

You may only add details metadata to a spec:

{% highlight javascript %}
describe('My suite', function() {
    it('My spec', function() {
        details('Some key details about this spec');
    });
});
{% endhighlight %}

**Note:** Both these constructs are provided primarily to assist 
in describing features. The metadata they attach is currently only 
displayed by the StyledHtmlReporter that ships with jasmine-species.


## Reporting extensions (jasmine-reporting)

### StyledHtmlReporter

The StyledHtmlReporter is a simple extension of the TrivialReporter 
that ships with Jasmine. It provides the following additional features:

* outputs additional metadata generated by jasmine-grammar
* provides an alternative visualization for the report -- a simple css style sheet
