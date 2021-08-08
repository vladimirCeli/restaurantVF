var {
  Router
} = require("express");
const Cart = require("../models/cart");
const Platillo = require("../models/platillo");
var router = Router();

const https = require('https');
const querystring = require('querystring');

const request = async () => {
	const path='/v1/checkouts';
	const data = querystring.stringify({
		'entityId':'8a8294175d602369015d73bf009f1808',
		'amount':req.body.total,
		'currency':'USD',
		'paymentType':'DB'
	});
	const options = {
		port: 443,
		host: 'test.oppwa.com',
		path: path,
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': data.length,
			'Authorization':'Bearer OGE4Mjk0MTc1ZDYwMjM2OTAxNWQ3M2JmMDBlNTE4MGN8ZE1xNU1hVEQ1cg=='
		}
	};
	return new Promise((resolve, reject) => {
		const postRequest = https.request(options, function(res) {
			const buf = [];
			res.on('data', chunk => {
				buf.push(Buffer.from(chunk));
			});
			res.on('end', () => {
				const jsonString = Buffer.concat(buf).toString('utf8');
				try {
					resolve(JSON.parse(jsonString));
				} catch (error) {
					reject(error);
				}
			});
		});
		postRequest.on('error', reject);
		postRequest.write(data);
		postRequest.end();
	});
};

request().then(console.log).catch(console.error)

router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Bienvenido a La Place"
  });
});

router.get('/add-to-cart/:id', function (req, res) {
  var pId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Platillo.findById(pId, function (err, platillo) {
    if (err) {
      return res.redirect('/menu');
    }
    cart.add(platillo, platillo.id);
    req.session.cart = cart;
    console.log(req.session.cart, 'CART OK');
    res.redirect('/carrito');
  });
});


router.get('/delete-to-cart/:id', function (req, res, next) {
  var prodId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.decrease(prodId);
  req.session.cart = cart;
  res.redirect('/carrito');
});

router.get('/delete-all-cart/:id', function (req, res, next) {
  var prodId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.delete(prodId);
  req.session.cart = cart;
  res.redirect('/carrito');
});


module.exports = router;