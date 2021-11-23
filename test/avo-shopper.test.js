let assert = require("assert");
const pg = require("pg");
let AvoShopper = require("../avo-shopper");
const Pool = pg.Pool;
require('dotenv').config()

const connectionString = process.env.DATABASE_URL || 'postgresql://avos:avos123@localhost:5432/avo_shopper';

const pool = new Pool({
    connectionString
});

describe('The avo shopper', function () {

    beforeEach(async function () {
        await pool.query(`delete from avo_deal;`)    
        await pool.query(`delete from shop;`)    
    });

    it('should be able to create a shop', async function () {

        const avoShopper = AvoShopper(pool);

		await avoShopper.createShop('Veggie Tales');
		const shops = await await avoShopper.listShops();

        assert.equal('Veggie Tales', shops[0].name);
    });

    it('should be able to return a list of all shops', async function () {

        const avoShopper = AvoShopper(pool);

		const beforeShops = await avoShopper.listShops();
        assert.deepStrictEqual(0, beforeShops.length);

		await avoShopper.createShop('Veggie Tales');
		await avoShopper.createShop('Veggie Lovers');
		await avoShopper.createShop('Corner Veggies');

		const shops = await avoShopper.listShops();
        assert.deepStrictEqual(3, shops.length);

    });

    it('should be able to create an avo deal and find it again', async function () {

        const avoShopper = AvoShopper(pool);

		const shopId = await avoShopper.createShop('Veggie Tales');
		await avoShopper.createDeal(shopId, 5, 28);

        // assert.deepStrictEqual([], taxiTrips.findTaxisForRegion('Durban'));
        // assert.deepStrictEqual([], taxiTrips.findTaxisForRegion('Cape Town'));
        // assert.deepStrictEqual([], taxiTrips.findTaxisForRegion('Gauteng'));

    })

    it('should return all the deals for a given shop', async function () {

        const avoShopper = AvoShopper(pool);
        
        // assert.deepStrictEqual([], taxiTrips.findTripsByRegNumber('...'));
        // assert.deepStrictEqual([], taxiTrips.findTripsByRegNumber('***'));

    });

    it('should return the top 5 deals', async function () {

        const avoShopper = AvoShopper(pool);

        const shopId1 = await avoShopper.createShop('Veggie Tales');
        const shopId2 = await avoShopper.createShop('Veggie Max');

		const createDeals = [
            avoShopper.createDeal(shopId1, 5, 38),
		    avoShopper.createDeal(shopId2, 4, 35),
		    avoShopper.createDeal(shopId1, 4, 28),
		    avoShopper.createDeal(shopId1, 3, 28),
		    avoShopper.createDeal(shopId2, 2, 28),
		    avoShopper.createDeal(shopId1, 1, 28),
		    avoShopper.createDeal(shopId1, 3, 32),
		    avoShopper.createDeal(shopId1, 2, 28)];

        await Promise.all(createDeals);

		const topFiveDeals = await avoShopper.topFiveDeals();

		assert.equal(5, topFiveDeals.length);

        const expectedDeals = [
            {
              "price": "28.00",
              "qty": 4,
              "shop_name": "Veggie Tales",
              "unit_price": "7.00",
            },
            {
              "price": "38.00",
              "qty": 5,
              "shop_name": "Veggie Tales",
              "unit_price": "7.60",
            },
            {
              "price": "35.00",
              "qty": 4,
              "shop_name": "Veggie Max",
              "unit_price": "8.75"
            },
            {
              "price": "28.00",
              "qty": 3,
              "shop_name": "Veggie Tales",
              "unit_price": "9.33"
            },
            {
              "price": "32.00",
              "qty": 3,
              "shop_name": "Veggie Tales",
              "unit_price": "10.67"
            }
        ];
    
		assert.deepStrictEqual(expectedDeals, topFiveDeals)

    });


    it('should return the recommeded deals', async function () {

        const avoShopper = AvoShopper(pool);

        const shopId1 = await avoShopper.createShop('Veggie Tales');
        const shopId2 = await avoShopper.createShop('Veggie Max');

		const createDeals = [
            avoShopper.createDeal(shopId1, 5, 40),
		    avoShopper.createDeal(shopId2, 4, 35),
		    avoShopper.createDeal(shopId1, 4, 28),
		    avoShopper.createDeal(shopId1, 3, 28),
		    avoShopper.createDeal(shopId2, 2, 25),
		    avoShopper.createDeal(shopId1, 1, 15),
		    avoShopper.createDeal(shopId1, 3, 32)];

        await Promise.all(createDeals);

		const recommendDeals = await avoShopper.recommendDeals(30);

		assert.equal(4, recommendDeals.length);

        const expectedDeals = [
        
            {
            "name": "Veggie Tales",
            "price": "28.00",
            "qty": 4,
            "unit_price": "7.00"
            },
            {
            "name": "Veggie Tales",
            "price": "28.00",
            "qty": 3,
            "unit_price": "9.33"
            },
            {
            "name": "Veggie Max",
            "price": "25.00",
            "qty": 2,
            "unit_price": "12.50"
            },
            {
            "name": "Veggie Tales",
            "price": "15.00",
            "qty": 1,
            "unit_price": "15.00"
            }
        ];
    
		assert.deepStrictEqual(expectedDeals, recommendDeals)

    });


    after(function () {
        pool.end();
    });

});