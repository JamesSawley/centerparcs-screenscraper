const sgMail = require('@sendgrid/mail');
const config = require('../config.json').config;

const sendMail = (i) => {

	const currentPrice = config[i].currentPrice;
	const pricePaid = config[i].pricePaid;
	const email = config[i].email;

	console.log('');
	console.log(`${i + 1}: -------- Section 4 - Send email --------`);
	if (currentPrice < pricePaid ) {
		sgMail.setApiKey(process.env.SENDGRID_API_KEY);
		const msg = {
		  to: email,
		  from: 'cheaper@centerparcs.com',
		  subject: 'Discount available!',
		  text: 'Call Center Parcs bookings on 03448 267723 now to secure the discount.',
		  html: `<p>Call Center Parcs bookings on 03448 267723 now to secure the discount. You could now pay just £<strong>${currentPrice}</strong></p>`,
		};
		sgMail.send(msg)
			.then(console.log(`${i + 1}: ... mail sent`))
	} else {
		console.log(`${i + 1}: ... price not cheaper. No mail sent.`)
	}
}


module.exports = sendMail;
