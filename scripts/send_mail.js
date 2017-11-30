const sgMail = require('@sendgrid/mail');
const config = require('../config.json');

const currentPrice = config.currentPrice;
const pricePaid = config.currentPrice;

const sendMail = () => {
	console.log('');
	console.log('-------- Section 4 - Send email --------');
	if (currentPrice < pricePaid ) {
		sgMail.setApiKey(process.env.SENDGRID_API_KEY);
		const msg = {
		  to: 'sawleyjr09@gmail.com',
		  from: 'cheaper@centerparcs.com',
		  subject: 'Discount available!',
		  text: 'Call Center Parcs bookings on 03448 267723 now to secure the discount.',
		  html: `<p>Call Center Parcs bookings on 03448 267723 now to secure the discount. You could now pay just £<strong>${price}</strong></p>`,
		};
		sgMail.send(msg)
			.then(console.log('... mail sent'))
	} else {
		console.log('... price not cheaper. No mail sent.')
	}
}


module.exports = sendMail;
