const sgMail = require('@sendgrid/mail');
const price = require('../config.json').config.currentPrice;

const sendMail = () => {
	console.log('');
	console.log('-------- Section 4 - Send email --------');

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
}

module.exports = sendMail;
