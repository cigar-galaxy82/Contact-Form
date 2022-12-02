const { SuperfaceClient } = require('@superfaceai/one-sdk');

const sdk = new SuperfaceClient();

export default async function run(req,res) {
  console.log(req.body)
  // Load the profile
   const profile = await sdk.getProfile('communication/send-email@2.1.0');
   const message = `
Email: ${req.body.email}
Phone: ${req.body.phone}
Name: ${req.body.first} ${req.body.last}
Message: ${req.body.message} 
`
  // Use the profile
  const result = await profile
    .getUseCase('SendEmail')
    .perform({
      from: 'submitform@edudigy.cc',
      to: 'te5547155@gmail.com',
      subject: 'New Message',
      text: message
    }, {
      provider: 'sendgrid',
      security: {
        bearer_token: {
          token: '<your token from sendgrid>'
        }
      }
    });

  try {
    const data = result.unwrap();
    res.send(data)
  } catch (error) {
    console.error(error);
  }
}

