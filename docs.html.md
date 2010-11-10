---
layout: default
title: Documentation
---

## Documentation

If you have already taken a look at the [Use it!](use-it.html) guide, you know 
that the Jasmine Species project provides two extensions to the awesome Jasmine 
BDD tool: **Jasmine Grammar** and **Jasmine Reporting**. 

The **grammar** component of Jasmine Species offers additional "words" 
for use in your Jasmine-powered specifications. So as to keep from polluting 
your global namespace, all the grammar elements are available in modules. 
It is up to you to import only the modules or specific words you wish to use in 
your specefications. 

Here we will look at the grammar modules available and what they offer.


### Feature/Story grammar

**The module**
{% highlight javascript %}
jasmine.grammar.FeatureStory
{% endhighlight %}

**What's in it?**

* **feature**: Defines a suite tagged as a "feature"
* **story**: Defines a suite tagged as a "story"
* **scenario**: Defines a suite tagged as a "scenario"
* **component**: Defines a suite tagged as a "component"

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

**The module**
{% highlight javascript %}
jasmine.grammar.GWT
{% endhighlight %}

**What's in it?**

* **given**: Defines a suite tagged as a "given" step (marked as "isIntermediate")
* **when**: Defines a suite tagged as a "when" step (marked as "isIntermediate")
* **then**: Defines a "then" spec that marks the conclusion of a Given, when, then construct
* **and**: Defines an "and" spec that is a continuation from a "then" statement
* **but**: Defines an "and" spec that is a continuation from a "then" statement

**Trivial usage example**

{% highlight javascript %}
var Account = function(balance) {
    this.balance = balance;
};

feature('Open an account', [], function() {
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


### Context/Specification grammar

**The module**
{% highlight javascript %}
jasmine.grammar.ContextSpecification
{% endhighlight %}

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