// const client = require('@sendgrid/client');
import client from '@sendgrid/client';

function test() {
  client.setApiKey('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');
  client.setDefaultRequest('baseUrl', 'https://api.sendgrid.com/');
  const request = { method: 'GET', url: '/v3/contactdb/lists' };

  client.request(request).then(([response, body]) => {
    console.log(response.statusCode);
    console.log(body);
  });
}

function addContactToList(user) {
  client.setApiKey('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');
  client.setDefaultRequest('baseUrl', 'https://api.sendgrid.com/');

  client.request({ method: 'POST', url: '/v3/contactdb/recipients', body: [{ email: user.email, first_name: user.firstName, last_name: user.lastName }] }).then(([response, body]) => {

    const res = body.persisted_recipients;
    for (let i = 0; i < res.length; i++) {
      const recipientId = res[i];
      console.log("Reciienteid----->", recipientId);
      client.request({ method: 'POST', url: `/v3//contactdb/lists/3864916/recipients/${recipientId}` });
    }

    console.log(response.statusCode);
    console.log(body);

    return body;
  });
}

export { test, addContactToList };
