# Avo shopper

It’s avocado season and there are special offers everywhere. Help your friends to keep track of finding the cheapest avos by creating a little web app.

Using the supplied Factory Function in `avo-shopper.js` and run the sql scrit in `sql/tables.sql` to create the required table locally.

Check out `test/avo-shopper.test.js` to see how to use the supplied Factory Function.

##  Create these screens:

* Create a screen where new avo deals can be added: A deal has a price and qty. It's created at a given shop. Shops should be selected from a dropdown. Qty and price should not be blank. And a shop must be selected before a deal is added.

* Create a screen that shows a list of all the shops.
	* Use the pre-populated shops in the `data.sql` file

* Create a screen that show all the avo deals for a given shop - link to this screen from the shop list screen above. Show deals in the format `qty for price`. For example `3 for R18`, `5 for R27`

* Create a screen where a new shop can be added. Add a link to this screen from the Shop list screen.

* Show a list of the top 5 avo deals - this should be your landing page. Use deal format. Add some avo picture or ways to show deal details visually.

* Allow a user to enter how much money they have to recommend to them where to go and buy their avo’s. Show the deals, the shop name and the unit_price for each deal.

## Other things

* Deploy your app to heroku - share the link with us.
* Ensure your app is responsive.
* Create a color scheme with some elements of green using : https://coolors.co/
* Create a paper prototype for your screens - plan your screens.
* Use ExpressJS and Handlebars we started the app for you in `index.js`.


