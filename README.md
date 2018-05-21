# Jasmine-species

Jasmine-species provides extended BDD grammar and reporting for 
[Jasmine](https://jasmine.github.io/). It allows for constructs 
like "Feature -> Scenario", "Given -> When -> Then" (GWT) and other useful BDD styles.

Using the extended grammar provided by jasmine-species, you may define executable 
specifications for your product at multiple levels of granularity. For example, 
you may define higher level features with acceptance criteria using the Feature/Story 
grammar. You may use the GWT grammar to describe states and transitions based on 
a particular scenario. In essence, you may now create specs for your software 
in a more fluid manner than what you get with just "describe" and "it". 

For example, your spec for the addition feature in a calculator software could read:

    feature('Addition', function() {
        summary(
            'In order to do basic calculations involving numbers',
            'As a math challenged student',
            'I want to be told the sum of two numbers'
        );
        
        scenario('Adding two positive numbers', function() {
            var calc = new Calculator();
            
            given('I input 10 into the calculator', function() {
                calc.input(10);
            });
            
            and('I input +', function() {
                calc.input('+');
            });
            
            when('I input 4', function() {
                calc.input(4);
            });
            
            then('The result should be 14', function() {
                expect(calc.result).toEqual(14);
            });
        });
    });

Jasmine-species also comes with a StyledHtmlReporter which is simply an augmentation of the 
TrivialHtmlReporter that ships with Jasmine. The StyledHtmlReporter outputs reports that
include the additional metadata attached to suites and specs by grammar elemens like "summary"
in the example above.
    
## Getting started

For information on how to use Jasmine-species in your product specs, head to the project site at 
[http://rudylattae.github.com/jasmine-species/](http://rudylattae.github.com/jasmine-species/)


## Contribute

I welcome any questions or feedback about bugs and suggestions on how to 
improve jasmine-species.

### As a user

If you like it or think it's complete crap, hit me up on twitter 
[@RudyLattae](http://twitter.com/RudyLattae) and let me know. I appreciate constructive 
criticsms or high fives :)

If you have some suggestions for improvement, please create an issue with details 
of what you would like to see. I'll take a look at it and work with you to either kill 
the idea or implement it.

### As a developer/hacker

The best way to contribute is to fork this project, make your modifications and 
create a pull request. I'll be more than happy to merge in your work.

Please ensure that you provide supporting specs for your contribution. Also if you are 
creating a new feature or fixing a bug, create an issue for it so as to minimize 
duplication of effort.

The [wiki](https://github.com/rudylattae/jasmine-species/wiki) contains rational 
for certain design decisions, some dev notes and even a dry back story. 
Be sure to Check it out before you begin hacking and slashing.


## Maintainer

* [Rudy Lattae](http://bitorb.com)


-----

(c) 2010-2011 - Rudy Lattae. Released under the New BSD License.
