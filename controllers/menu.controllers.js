const menuCtrl = {};
const Platillo = require("../models/platillo");
const Cart = require("../models/cart");;
const Pago = require("../models/pagos");
menuCtrl.renderMenu = async (req, res) => {
	try {
		const platillosDB = await Platillo.find();
		res.render("menu", {
			title: "Menú",
			platillos: platillosDB
		});
	} catch (error) {
		console.log('error', error);
	}
};

/**
  *ACI PAYMENT CHECKOUT
  */  
const https = require('https');
const querystring = require('querystring');
const request = async (total) => {  
	const path = '/v1/checkouts';
	const data = querystring.stringify({
		"authentication.entityId": "8ac7a4c970bf1ef60170bf541bad00e8",
		"authentication.password": "npHBAg7saQ",
		"authentication.userId": "8ac7a4c970bf1ef60170bf4d8b340067",
		'amount': "23.00",
		'currency': 'USD',
		'paymentType': 'DB'
	});
	const options = {
		port: 443,
		host: 'test.oppwa.com',
		path: path,
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': data.length,
			'Authorization': 'Bearer OGE4Mjk0MTc1ZDYwMjM2OTAxNWQ3M2JmMDBlNTE4MGN8ZE1xNU1hVEQ1cg=='
		}
	};
	return new Promise((resolve, reject) => {
		const postRequest = https.request(options, function (res) {
			const buf = [];
			res.on('data', chunk => { buf.push(Buffer.from(chunk));});
			res.on('end', () => {
				const jsonString = Buffer.concat(buf).toString('utf8');
				try { resolve(JSON.parse(jsonString)); }
				catch (error) { reject(error); }
			});
		});
		postRequest.on('error', reject);
		postRequest.write(data); 
		postRequest.end();
	});
};


/**
  * Renderizado de carrito
  */  
menuCtrl.renderCarrito = (req, res) => {
	if (!req.session.cart) {
		return res.render("carrito", {
			title: 'Carrito',
			platillos: [],
			checkoutId: null
		});
	}
	var cart = new Cart(req.session.cart);
res.render('carrito', {
  title: 'Carrito',
  platillos: cart.generateArray(),
  total: cart.total, 
  checkoutId: request()
});
};

/**
  * renderizado de tarjeta + request ACI PAYMENT
  */  
menuCtrl.renderpago = (req, res) => {
	request(req.session.cart.total).then(function (data) {
		console.log(data.id)
		return res.render("tarjeta", {
			title: 'Carrito',
			total: req.session.cart.total,
			checkoutId: data.id
		}); 
	}).catch(console.error);
}

/**
  * Renderizado post pago, ventana de success + request ACI PAY
  */  
menuCtrl.renderpagar = (req, res) => {
	request(req.session.cart.total).then(function (data) {
		console.log(data.id)
		new Pago({ 
			id: data.id,
			total:  req.session.cart.total,
			estado: true,
		}).save(function (err) { 
		  if (!err) {
			console.log("Pago guardado con éxito");
			console.log(Pago); 
			res.send(req.flash('success_msg', 'Pago guardado con éxito'));   
		  } else {
			console.log("Ha ocurrido un error ", err);
			res.send("error ");
		  }
		});
	}).catch(console.error);
	
	res.render("success", { title: "Pago Exitoso" });  
  }; 

module.exports = menuCtrl;