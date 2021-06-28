const router = require('express').Router();
const nodemailer = require('nodemailer');
const {
  Entry
} = require('../../models');

// Create new entries
router.post('/', async (req, res) => {
  const {
    name,
    phone,
    post,
    employer,
    email,
    sector,
    years,
    union,
    shift,
    personal,
    annual,
    long
  } = req.body;
  console.log(req.body);

  const entryResult = await Entry.create({
    name,
    phone,
    post,
    employer,
    email,
    sector,
    years,
    personal,
    annual,
    long,
    shift: shift === 'yesshift',
    union: union === 'yesunion',
  });

  res.json({
    success: true,
    entryResult,
  });

  var mailOptions = {
    from: '"Natalie Lang"',
    to: req.body.email,
    subject: 'Thanks for using the Workers Make the Difference calculator',
    text: `Hey ${req.body.name},`,
    html: `<b>Hey ${req.body.name}! </b><br><br>You are owed ${req.body.personal.toFixed(0)} weeks of personal leave, ${req.body.annual.toFixed(0)} weeks of annual leave, and ${req.body.long.toFixed(2)} weeks of long service leave.<br><br>
     
      Thank you for the work you do. Your work is essential, and you make the difference in people’ s lives. But if you have never had long service leave – you are missing out.<br>

      The Australian Services Union is calling
      for portable entitlements for all community and disability workers. We should have access to portable training, portable personal leave and portable long service leave. <br>

      If we had access to portable long service leave, it would mean:<br>
<ul>
      <li>access to well - earned breaks to recharge;</li>
      <li>recognition for our experience and contribution to the sector; and</li>
      <li>experienced workers could carry their leave with them to new providers and not go back to zero leave entitlements for doing the same work with the same communities.</li>
</ul>
      You deserve no less than the rights and entitlements of every other worker in the Australian economy.<br>

      Nurses, teachers, cleaners and builders have portable long service leave. So do community and disability workers in Victoria, Queensland and the ACT.<br>

      We can’ t afford to miss out. How can we fix this? <br>

      <ol>
      <li>Join the <a href="www.asu.asn.au/asujoin">Australian Services Union.</a>
      Membership gives you access to advice, includes free journey insurance and professional indemnity insurance.</li>

     <li>Spread the word to keep up momentum. </li>

     <li>Ask your colleagues at work to do the same.</li>
     </ol>

      Thanks,<br>
      Natalie Lang</b>
      Secretary - ASU
      </b>`,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
});

var transport = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  tls: {
    ciphers: 'SSLv3'
  },
  auth: {
    user: 'membership@asu.org.au',
    pass: process.env.PASS,
  }
});




module.exports = router;