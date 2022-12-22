  # Getting started
  
At the top, select Run -> Install, followed by Run -> Test.
  
If that all works, you are good to get started!

# The Supermarket Receipt Refactoring Kata

Credit to Emily Bache for making this refactoring kata. https://github.com/emilybache/SupermarketReceipt-Refactoring-Kata/tree/with_tests

This is a variation of a popular kata described in http://codekata.com/kata/kata01-supermarket-pricing/. The aim of the exercise is refactor the code and add a new feature. 

The supermarket has a catalog with different types of products (rice, apples, milk, toothbrushes,...). Each product has a price, and the total price of the shopping cart is the total of all the prices of the items. You get a receipt that details the items you've bought, the total price and any discounts that were applied.

The supermarket runs special deals, e.g.
 - Buy two toothbrushes, get one free. Normal toothbrush price is €0.99
 - 20% discount on apples, normal price €1.99 per kilo.
 - 10% discount on rice, normal price €2.49 per bag
 - Five tubes of toothpaste for €7.49, normal price €1.79
 - Two boxes of cherry tomatoes for €0.99, normal price €0.69 per box.

These are just examples: the actual special deals change each week.

Interview Questions

A lot of day to day software development involves quickly getting up to speed with unfamiliar code bases, refactoring code that does not stand the test of time and adding new features on top of code that may not be structured well. 

We've created this interview in order to replicate that environment as closely as possible. We ask that you work like you normally would, ask questions and feel free to google the syntax that you're not sure of.

While you are currently operating under a time constraint and may not have time to make changes you would like to, we encourage you to call out refactors you might make if you had more time.

Part 1 - Bug fix:

This code currently has a few issues that need fixing.  Update the code so that it compiles and the tests pass.

Part 2 - New Feature:
 

Implement the new feature described below 
New feature: Bundled items

The owner of the system has a new feature request. They want to introduce a new way of buying products - bundles. Instead of adding just one item to the cart, you can add a "bundle", which has a name, and a set of items that are added as part of the bundle.  Example, you can can buy a "fruit salad" bundle, which includes one apple and one banana. This is solely a marketing/checkout experience feature - once the bundle is added, the items can appear in the cart exactly as if they had been added individually.

Requirements:

    A “user” can add a bundle to the cart (this would probably happen via checkout)

    If a “bundle” is added to the cart all the items in the bundle will be added to the cart, and show up on the receipt

Out of scope:

    Having multiples of a single item in the bundle (ex: one apple and two bananas)

    Showing bundles in the receipt (it can look the same as if you had added the items independently)

    Discounted bundles (discounts can apply the same as if the items had been added independently)