/* eslint-disable no-use-before-define */

const request = require('request');

import models from '../models';

const token = 'EAAEjeOuRL5oBAJ1MV5EArh56aL0zPRtbnrEHJmj5UeSxeLikprSAgZCVgoWefsUuhSzr1kUAApABp4uNkLU5TA2yRN6MFIrVmbAf3rmWGl32DblwrefSLzelEIPc78YDTxwZC9W6HLQmFzvqGhIXZBscF7OwKvHxZANhdWZBV7AZDZD';

const controller = {};

controller.get = (req, res) => {
  if (req.query['hub.verify_token'] === 'eathouse_token') {
    return res.send(req.query['hub.challenge']);
  }
  return res.send('No tienes permisos');
};

controller.setMessage = (req, res) => {
  const webhookEvent = req.body.entry[0];
  if (webhookEvent.messaging) {
    webhookEvent.messaging.forEach((event) => {
      console.log('EVENTO--->', event);
      handleEvent(event.sender.id, event);
    });
  }

  return res.sendStatus(200);
};

function handleEvent(senderId, event) {
  if (event.message) {
    if (event.message.quick_reply) {
      handlePostback(senderId, event.message.quick_reply.payload);
    } else {
      defaultQuestions(senderId);
    }
  } else if (event.postback) {
    handlePostback(senderId, event.postback.payload);
  }
}

function handleMessage(senderId, event) {
  if (event.text) {
    defaultMessage(senderId);
  } else if (event.attachments) {
    // handleAttachments(senderId, event);
  }
}

function callSendApi(response) {
  request({
    uri: 'https://graph.facebook.com/v2.11/me/messages',
    qs: {
      access_token: token,
    },
    method: 'POST',
    json: response,
  }, (err) => {
    if (err) {
      console.log('ERROR-->', err);
    } else {
      console.log('Mensaje enviado', response);
    }
  });
}

// function senderActions(senderId) {
//   const messageData = {
//     recipient: {
//       id: senderId,
//     },
//     sender_action: 'typing_on',
//   };
//   callSendApi(messageData);
// }

async function handlePostback(senderId, payload) {
  console.log('PAYLOAD------>', payload);
  switch (payload) {
    case 'GET_STARTED_ASYSWEB':
      // senderActions(senderId);
      defaultMessage(senderId);
      break;
    case 'MENU_PAYLOAD':
      // senderActions(senderId);
      await showMenu(senderId);
      await defaultQuestions(senderId);
      break;
    case 'HOW_WORK_PAYLOAD':
      // senderActions(senderId);
      await howWork(senderId);
      await defaultQuestions(senderId);
      break;
    case 'DELIVERY_PAYLOAD':
      await delivery(senderId);
      await defaultQuestions(senderId);
      break;
    case 'OFFERS_PAYLOAD':
      await offers(senderId);
      await defaultQuestions(senderId);
      break;
    default:
      defaultMessage(senderId);
      break;
  }
}


function defaultMessage(senderId) {
  const messageData = {
    recipient: {
      id: senderId,
    },
    message: {
      text: 'Hola, gracias por contactarnos. Soy ChefBot de eathouse estoy aquí para ayudarte a resolver algunas de tus dudas, estas son algunas preguntas frecuentes qué hacen nuestros clientes. ⬇',
      quick_replies: [
        {
          content_type: 'text',
          title: '¿Como funciona?',
          payload: 'HOW_WORK_PAYLOAD',
        },
        {
          content_type: 'text',
          title: 'Menú y precios',
          payload: 'MENU_PAYLOAD',
        },
        {
          content_type: 'text',
          title: 'Zonas de entrega',
          payload: 'DELIVERY_PAYLOAD',
        },
        {
          content_type: 'text',
          title: 'Promociones',
          payload: 'OFFERS_PAYLOAD',
        },
        // {
        //   content_type: 'text',
        //   title: 'Formas de pago',
        //   payload: 'PAYMENT_PAYLOAD',
        // },
      ],
    },
  };
  // senderActions(senderId);
  callSendApi(messageData);
}

function defaultQuestions(senderId) {
  const messageData = {
    recipient: {
      id: senderId,
    },
    message: {
      text: '¿Te puedo ayudar en algo más?',
      quick_replies: [
        {
          content_type: 'text',
          title: '¿Como funciona?',
          payload: 'HOW_WORK_PAYLOAD',
        },
        {
          content_type: 'text',
          title: 'Menú y precios',
          payload: 'MENU_PAYLOAD',
        },
        {
          content_type: 'text',
          title: 'Zonas de entrega',
          payload: 'DELIVERY_PAYLOAD',
        },
        {
          content_type: 'text',
          title: 'Promociones',
          payload: 'OFFERS_PAYLOAD',
        },
        // {
        //   content_type: 'text',
        //   title: 'Formas de pago',
        //   payload: 'PAYMENT_PAYLOAD',
        // },
      ],
    },
  };
  // senderActions(senderId);
  setTimeout(() => {
    callSendApi(messageData);
  }, 4000);
}

function showMenu(senderId) {
  // const dishes = await models.Dish.findAll({ where: { active: true } });
  // const dishesElem = dishes.map(item => ({ title: item.name, subtitle: item.price, image_url: item.image }));

  // console.log('DISHES---->', dishesElem);
  const messageData = {
    recipient: {
      id: senderId,
    },
    message: {
      attachment: {
        type: 'template',
        payload: {
          // template_type: 'generic',
          template_type: 'generic',
          // top_element_style: 'compact',
          elements: [
            {
              title: 'Milanesa de Pollo Light',
              subtitle: '$90MX',
              image_url: 'https://s3-us-west-2.amazonaws.com/eathouse/dishes/pollo-light.png',
            },
            {
              title: 'Milanesa de Pollo Empanizada',
              subtitle: '$90MX',
              image_url: 'https://s3-us-west-2.amazonaws.com/eathouse/dishes/menu2.jpg',
            },
            // {
            //   title: 'Milanesa de Res Light',
            //   subtitle: '$80MX',
            //   image_url: 'https://s3-us-west-2.amazonaws.com/eathouse/dishes/milanesa-light.png',
            // },
            {
              title: 'Milanesa de Pollo a la Plancha.',
              subtitle: '$90MX',
              image_url: 'https://s3.us-west-2.amazonaws.com/eathouse/dishes/p-milanesa-pollo.png',
            },
            {
              title: 'Ensalada del Chef',
              subtitle: '$80MX',
              image_url: 'https://s3.us-west-2.amazonaws.com/eathouse/dishes/p-ensalada-huevo.png',
            },
            {
              title: 'Ensalada Santa Fe',
              subtitle: '$90MX',
              image_url: 'https://s3.us-west-2.amazonaws.com/eathouse/dishes/santa-fe-fondo.jpg',
            },
            // {
            //   title: 'Ensalada de Atún con Coditos',
            //   subtitle: '$80MX',
            //   image_url: 'https://s3.us-west-2.amazonaws.com/eathouse/dishes/p-ensalada-coditos.png',
            // },
            {
              title: 'Milanesa de Res Empanizada',
              subtitle: '$90MX',
              image_url: 'https://s3-us-west-2.amazonaws.com/eathouse/dishes/menu5.jpg',
            },
            {
              title: 'Tortas de Papa',
              subtitle: '$80MX',
              image_url: 'https://s3.us-west-2.amazonaws.com/eathouse/dishes/tortas-papa-fondo.png',
            },
            // {
            //   title: 'Ensalada Cesar con Pollo',
            //   subtitle: '$90MX',
            //   image_url: 'https://s3-us-west-2.amazonaws.com/eathouse/dishes/menu8.jpg',
            // },
            {
              title: 'Pasta con Albóndigas',
              subtitle: '$90MX',
              image_url: 'https://s3.us-west-2.amazonaws.com/eathouse/dishes/pasta-fondo.jpg',
            },
            {
              title: 'Cortadillo de Res',
              subtitle: '$90MX',
              image_url: 'https://s3.us-west-2.amazonaws.com/eathouse/dishes/cortadillo-fondo.jpg',
            },
            // {
            //   title: 'Pasta Alfredo',
            //   subtitle: '$90MX',
            //   image_url: 'https://s3.us-west-2.amazonaws.com/eathouse/dishes/pasta-alfredo.jpeg',
            // },
            // {
            //   title: 'Pasta con Pollo a la Parmesana',
            //   subtitle: '$90MX',
            //   image_url: 'https://s3.us-west-2.amazonaws.com/eathouse/dishes/pollo-parmesana.jpg',
            // },
          ],
        },
      },
    },
  };
  callSendApi(messageData);
}

function howWork(senderId) {
  const messageData = {
    recipient: {
      id: senderId,
    },
    message: {
      text: `
      *1) Elige tu comida:* Selecciona de una variedad de platillos que tenemos disponibles.\n\n*2) Ordena o planifica tus platillos:* Ordena tus platillos antes de las 11:00am o programa por adelantado tus platillos.\n\n*3) Disfruta tu comida:* Tu orden será entregada a la puerta de tu casa u oficina entre 12:30 pm y la 1:30 pm.\n\nEnvío Gratis. Todo se ordena desde nuestro sitio web www.eathouse.mx o desde nuestras APPs.
      `,
    },
  };

  callSendApi(messageData);
}

function delivery(senderId) {
  const messageData = {
    recipient: {
      id: senderId,
    },
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'button',
          text: 'Disponible en zona Valle, Valle Oriente, San Jeronimo, Chepevera y Cumbres. Envío Gratis.  🛵',
          buttons: [
            {
              title: 'Ver en el mapa',
              type: 'web_url',
              url: 'https://eathouse.mx/map-available',
              webview_height_ratio: 'tall',
            },
          ],
        },
      },
    },

  };

  callSendApi(messageData);
}

function offers(senderId) {
  const messageData = {
    recipient: {
      id: senderId,
    },
    message: {
      text: 'Obtén un 20% de descuento en la compra de 5 platillos o más, puedes ordenar para un mismo día o programarlos para diferentes días.',
    },
  };

  callSendApi(messageData);
}


export default controller;
