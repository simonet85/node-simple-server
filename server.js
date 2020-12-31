const express = require('express');
const PORT = 3000;
const app = express();
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const { render } = require('jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Find public assets
app.use(express.static(path.join(__dirname, 'public')));

//Set up our views path
app.set('views ', path.join(__dirname, 'views'));
//Set up our view engine
app.set('view engine', 'jade');

app.get('/', (req, res) => {
  res.render('index', { title: 'Welcome' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/services', (req, res) => {
  res.render('services', { title: 'Services' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact' });
});

app.post('/contact/send', (req, res) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'b106c58c3c0b82',
      pass: 'c6916c1ed7f373',
    },
  });

  const mailOptions = {
    from: '"Christian Simonet 👻" <christian.85@live.fr>', // sender address
    to: 'pakoyal127@1092df.com', // list of receivers
    subject: 'Website submission ✔', // Subject line
    text:
      'You have a submission with the following infos : Name :' +
      req.body.name +
      '  Email :' +
      req.body.email +
      ' Message :' +
      req.body.message +
      '', // plain text body
    html:
      '<p>You have a submission with the following infos : </p>  <ul><li>Name :' +
      req.body.name +
      '</li><li>' +
      '  Email :' +
      '</li><li>' +
      req.body.email +
      '</li><li>' +
      'Message :' +
      '</li><li>' +
      req.body.message +
      '</li></ul>  ', // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.redirect('/');
    } else {
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      res.redirect('/');
    }
  });
});

app.listen(PORT);

console.log('Server is running on Port 3000...');
