const nodemailer = require('nodemailer');
const path = require('path');
const hbs = require('nodemailer-express-handlebars');
const {host, post, user, pass} = require('../config/email.json');
const { retryWhen } = require('rxjs');

// Looking to send emails in production? Check out our Email API/SMTP product!
const transport = nodemailer.createTransport({
    host,
    port,
    auth: {
      user,
      pass
    }
  });
  
  transport.use('compile', hbs({
    viewWngine: 'handlebars',
    viewPath: path.resolve('./src/resources/mail/'),
    extName: '.html',
  }));

  module.exports = transport;