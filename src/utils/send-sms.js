import twilio from 'twilio';

export default (message, phone) => {
  const accountSid = 'AC8d936b8298b25c1820624a58f0b67466'; // Your Account SID from www.twilio.com/console
  const authToken = 'ee5404c1235be5117b91bb2919f87249';   // Your Auth Token from www.twilio.com/console

  const client = new twilio(accountSid, authToken);

  client.messages.create({
    body: message,
    to: `+52${phone}`,
    from: '+18326267620',
  }).then(message => console.log("Respuesta de twilio", message.sid));
};
