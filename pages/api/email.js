const { SuperfaceClient, err } = require('@superfaceai/one-sdk');

const sdk = new SuperfaceClient();

export default async function run(req,res) {
  const body = req.body
  if(isEmpty(req.body)) {
     // Load the profile
    const profile = await sdk.getProfile('communication/send-email@2.1.0');
    const message = `
    Email: ${body.email}
    Phone: ${body.phone}
    Name: ${body.first} ${body.last}
    Message: ${body.message} 
    `
      // Use the profile
      const result = await profile
      .getUseCase('SendEmail')
      .perform({
        from: process.env.FROM_EMAIL,
        to: process.env.TO_EMAIL,
        subject: 'New Message',
        text: message
      }, {
        provider: 'sendgrid',
        security: {
          bearer_token: {
            token: process.env.TOKEN
          }
        }
      });

    try {
      const data = result.unwrap();
      res.send(data)
    } catch (error) {
      console.error(error);
    }
  }else{
    res.status(400).end();
  }
}

function isEmpty(object) {
  console.log(object)
  for (let key in object) {
      if (object[key].length === 0)
      {
        return false
      }
  }
  return true
}