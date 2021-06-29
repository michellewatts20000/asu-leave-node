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
    from: 'Natalie Lang – ASU <membership@asu.org.au>',
    to: req.body.email,
    subject: 'Thanks for using the Workers Make the Difference calculator',
    text: `Hey ${req.body.name},`,
    html: `<font face="calibri">
    <table style="width:600px">

        <tr>
            <td>
                <p><img src="https://actionnetwork.org/user_files/user_files/000/061/655/original/WMtD_emailBanner.png" width="600" height="200" alt="Workers make the difference email banner" /></p>
            </td>
        </tr>

        <tr>
            <td style="padding: 10px;">
                <p>Hey ${req.body.name}!</p>
            </td>
        </tr>

        <tr>
            <td bgcolor=#EC222B style="padding: 10px;">
                <font size="+1" color="#FFFFFF">
                    <p><b>You are owed ${req.body.personal.toFixed(2)} weeks of personal leave, ${req.body.annual} weeks
                            of
                            annual leave, and ${req.body.long} weeks of long service leave.</b></p>
                </font>
            </td>
        </tr>


        <tr>
            <td style="padding: 10px;">Thank you for the essential work that you do. As a front-line worker, you make a
                difference in people’s lives.

                <p><b>But if you have never had long service leave – you are missing out.</b></p>

                <p>Members of the Australian Services Union are campaigning for portable entitlements for all Community
                    and
                    Disability workers. You should have access to portable training, portable personal leave, and
                    portable
                    long service leave. This means that you would:</p>

                <ul>
                    <li>get access to paid time off to recharge;</li>
                    <li>be recognised for your experience and contribution to the sector; and</li>
                    <li>carry your leave with you if you move to a new provider (not going back to zero leave
                        entitlements
                        for doing the same work, with the same communities).</li>
                </ul>

                <p>You deserve no less than the rights and entitlements of every other worker in Australia.</p>

                <p>Nurses, teachers, cleaners, and builders have portable long service leave. So do Community and
                    Disability
                    workers in Victoria, Queensland, and the ACT.</p>

                <p><b>You don’t deserve to miss out. How can we fix this?</b></p>

                <ol>
                    <li>Join the <a href="www.asu.asn.au/asujoin">Australian Services Union.</a> (Membership gives you
                        access to workplace advice, includes free journey insurance, and professional indemnity
                        insurance)
                    </li>
                    <li>Spread the word to keep up momentum.</li>
                    <li>Ask your colleagues at work to do the same.</li>
                </ol>

                <p>Thanks,<br>
                    Natalie Lang - ASU Secretary</p>

            </td>
        </tr>
    </table>
</font>`,
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