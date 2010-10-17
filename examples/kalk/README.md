Kalk Example
============

This is an example of how you can use jasmine-aroma and jasmine-bloom to 
build your a project using a multi-faceted Behavior Driven Development (BDD). 
Once you have run the specs and read through the code, 
you should have a good understanding of how to combine aroma and bloom 
to improve your BDD workflow.

This example project illustrates:

* adding aroma and bloom into your jasmine project
* importing only the grammar you need from aroma
* defining high level specifications using features
* defining unit specifications (plain old describe/it should specs)
* implementing user acceptance tests as user stories
* describing exposed api through executable documentation (xdocs)


Layout
------

    kalk/
        specs/      <-- specifications for the project
        src/        <-- the code that is crafted based on the specs

depending on the size and complexity of the project, you may need to create 
sub directories for each spec family. e.g.:

    specs/
        features/
        specs/
        stories/
        xdocs/

However, in some cases it may make more sense to group spec families under 
the product features/components they describe. e.g.:

    specs/
        account/
            link_account_feature.js
            manage_account_feature.js
            UserAccountSpec.js
        cart/
            index.html
            CartSpecs.js
        billing/

Use whichever best suites the context and clearly communicates the product 
design to the stakeholders.


Usage
-----

Open the "specs/index.html" file in one of the supported browsers.