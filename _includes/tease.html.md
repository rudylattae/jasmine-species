----

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