# Running the code

At the top, select Run -> Install, followed by Run -> Test.

# Background:

This code models a supermarket checkout where users can do things like:
- Add products to their cart
- Configure product discounts (ex: 2 for 1, 10% off)
- Checkout
- Print a receipt

# Part 1:

The owner of the system has a new feature request. They want to introduce a new way of buying products - bundles. Instead of adding just one item to the cart, you can add a "bundle", which has a name, and a set of items that are added as part of the bundle.  Example, you can can buy a "fruit salad" bundle, which includes one apple and one banana. This is solely a marketing/checkout experience feature - once the bundle is added, the items can appear in the cart exactly as if they had been added individually.

# Requirements:
- A “user” can add a bundle to the cart (this would probably happen via checkout)
- If a “bundle” is added to the cart all the items in the bundle will be added to the cart, and show up on the receipt

# Out of scope:
- Having multiples of a single item in the bundle (ex: one apple and two bananas)
- Showing bundles in the receipt (it can look the same as if you had added the items independently)
- Discounted bundles (discounts can apply the same as if the items had been added independently)

# Expectations:

A lot of day to day software development involves quickly getting up to speed with unfamiliar code bases, refactoring code that does not stand the test of time and adding new features on top of code that may not be structured well.

We've created this interview in order to replicate that environment as closely as possible. We ask that you work like you normally would, ask questions and feel free to google the syntax that you're not sure of.

While you are currently operating under a time constraint and may not have time to make changes you would like to, we encourage you to call out refactors you might make if you had more time.
