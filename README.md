# Jasmine Species

Provides extended BDD grammar and reporting for [Jasmine](http://pivotal.github.com/jasmine). 
It allows for constructs like “Feature -> Scenario”, “Given -> When -> Then” and other useful BDD styles.

With Species you can define higher level feature specs for your software in a more
fluid manner than what you get with just "describe" and "it". 

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

Species also comes with a StyledHtmlReporter which is simply an augmentation of the 
TrivialHtmlReporter that ships with Jasmine. The StyledHtmlReporter outputs reports that
include the additional metadata attached to suites and specs by grammar elemens like "summary"
in the example above.
    
## Get started

For information on how to use Jasmine Species, head to the project site at 
[http://rudylattae.github.com/jasmine-species/](http://rudylattae.github.com/jasmine-species/)


## Contribute

The best way to contribute is to fork this project, make your modifications and 
create a pull request. I'll be more than happy to merge in your work.

The [wiki](https://github.com/rudylattae/jasmine-species/wiki) contains rational 
for certain design decisions, some dev notes and even a dry back story. 
Be sure to Check it out before you begin hacking and slashing.


## Maintainer

* [Rudy Lattae](http://bitorb.com)


## Speak up

If you like it or think it's complete crap, hit me up on twitter 
[@RudyLattae](http://twitter.com/RudyLattae)

If you have some suggestions for improvement, please create an issue with details 
of what you would like to see.

-----

(c) 2010 - Rudy Lattae. Released under the New BSD License.