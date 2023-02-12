const menuCtrl = {};
const Platillo = require("../models/platillo");
const Cart = require("../models/cart");;
const Pago = require("../models/pagos");
const User = require("../models/users");
const nodemailer= require("nodemailer");
const passport= require("passport");
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
  
  const request = async () => {
	  const path='/v1/checkouts';
	  const data = querystring.stringify({
		  'entityId':'8a8294175d602369015d73bf009f1808',
		  'amount':'92.00',
		  'currency':'EUR',
		  'paymentType':'DB',
		  'registrations[0].id':'8ac7a4a1853519dd01853640ac7c2edb',
		  'registrations[1].id':'8ac7a49f853519e001853640add82fa8',
		  'standingInstruction.source':'CIT',
		  'standingInstruction.mode':'REPEATED',
		  'standingInstruction.type':'UNSCHEDULED'
	  });
	  const options = {
		  port: 443,
		  host: 'eu-test.oppwa.com',
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
  
  request().then(console.log).catch(console.error);

/**
  * Renderizado de carrito
  */  
 menuCtrl.renderCarrito = (req, res) => {
	var user = req.user || null;
	console.log(user.carrito, 'CARRITO TO RENDER');
	if (user.carrito.length > 0) {
		res.render('carrito', {
			title: 'Carrito',
			platillos: generateArray(user.carrito[0].items),
			total: user.carrito[0].total
		});
	} else {
		res.render('carrito', {
			title: 'Carrito',
			platillos: [],
			total: 0
		});
	}
};

generateArray = function (cart) {
  var arr = [];
  for (const p in cart) {
    arr.push(cart[p]);
  }
  return arr;
}

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
			const transporter = nodemailer.createTransport({
				secure: true,
				requireTLS: true,
				secured: true,
				host: 'smtp.ethereal.email',
				port: 587,
				auth: {
					user: 'oda.rutherford19@ethereal.email',
					pass: 'gGmdvEYF8GbBKFPBMj'
				}
			}); 
			  const mailOptions = {
				from: "Factura",
				to: req.user.email,  
				subject: "Factura de compra - La Place",
				html: `<h3 class="bg-success mx-auto">Gracias por confiar en nosotros</h3><br>
    <h4 class="mx-auto">Detalles de la compra:</h4> 
    <p>Cantidad de platillos:  `+req.session.cart.quantity+`</p> 
    <p>Total:  $`+req.session.cart.total+`</p>   
    <a class="btn btn-success" href="https://restaurantss.onrender.com/">Volver a la página web</a>`
    
			  };
			   
			  transporter.sendMail(mailOptions, function(err){
				  if(err){
					console.log("Error :(")
				  }else{
					console.log("Email Sent")
				  }
				});
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