'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

// function senderActions(senderId) {
//   const messageData = {
//     recipient: {
//       id: senderId,
//     },
//     sender_action: 'typing_on',
//   };
//   callSendApi(messageData);
// }

var handlePostback = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(senderId, payload) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('PAYLOAD------>', payload);
            _context.t0 = payload;
            _context.next = _context.t0 === 'GET_STARTED_ASYSWEB' ? 4 : _context.t0 === 'MENU_PAYLOAD' ? 6 : _context.t0 === 'HOW_WORK_PAYLOAD' ? 11 : _context.t0 === 'DELIVERY_PAYLOAD' ? 16 : _context.t0 === 'OFFERS_PAYLOAD' ? 21 : _context.t0 === 'FAQ_PAYLOAD' ? 26 : 29;
            break;

          case 4:
            // senderActions(senderId);
            defaultMessage(senderId);
            return _context.abrupt('break', 31);

          case 6:
            _context.next = 8;
            return showMenu(senderId);

          case 8:
            _context.next = 10;
            return defaultQuestions(senderId);

          case 10:
            return _context.abrupt('break', 31);

          case 11:
            _context.next = 13;
            return howWork(senderId);

          case 13:
            _context.next = 15;
            return defaultQuestions(senderId);

          case 15:
            return _context.abrupt('break', 31);

          case 16:
            _context.next = 18;
            return delivery(senderId);

          case 18:
            _context.next = 20;
            return defaultQuestions(senderId);

          case 20:
            return _context.abrupt('break', 31);

          case 21:
            _context.next = 23;
            return offers(senderId);

          case 23:
            _context.next = 25;
            return defaultQuestions(senderId);

          case 25:
            return _context.abrupt('break', 31);

          case 26:
            _context.next = 28;
            return defaultQuestions(senderId);

          case 28:
            return _context.abrupt('break', 31);

          case 29:
            defaultMessage(senderId);
            return _context.abrupt('break', 31);

          case 31:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function handlePostback(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-use-before-define */

var request = require('request');

// const token = 'EAAEjeOuRL5oBAJ1MV5EArh56aL0zPRtbnrEHJmj5UeSxeLikprSAgZCVgoWefsUuhSzr1kUAApABp4uNkLU5TA2yRN6MFIrVmbAf3rmWGl32DblwrefSLzelEIPc78YDTxwZC9W6HLQmFzvqGhIXZBscF7OwKvHxZANhdWZBV7AZDZD';
var token = 'EAADeZAZAb76T0BAI7cFxJtY9NSbsxp2uzrMKGDQnRPtpgcFiPc15ZAc5qZAX8WxeLmSoWGoPff8HUaZBhGU0D1QCtGavjFv6duRZCvJLLNJ4Y5LQwzO74X81UhFZB65iZC4WLB41k3Jgw4qSE487pq44o4Gwv3cAZBTUIXic1AkBZBfQZDZD';

var controller = {};

controller.get = function (req, res) {
  if (req.query['hub.verify_token'] === 'eathouse_token') {
    return res.send(req.query['hub.challenge']);
  }
  return res.send('No tienes permisos');
};

controller.setMessage = function (req, res) {
  var webhookEvent = req.body.entry[0];
  if (webhookEvent.messaging) {
    webhookEvent.messaging.forEach(function (event) {
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
      // defaultQuestions(senderId);
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
      access_token: token
    },
    method: 'POST',
    json: response
  }, function (err) {
    if (err) {
      console.log('ERROR-->', err);
    } else {
      console.log('Mensaje enviado', response);
    }
  });
}

function defaultMessage(senderId) {
  var messageData = {
    recipient: {
      id: senderId
    },
    message: {
      text: 'Hola, gracias por contactarnos. Soy ChefBot de eathouse estoy aquí para ayudarte a resolver algunas de tus dudas, estas son algunas preguntas frecuentes qué hacen nuestros clientes. ⬇',
      quick_replies: [{
        content_type: 'text',
        title: '¿Como funciona?',
        payload: 'HOW_WORK_PAYLOAD'
      }, {
        content_type: 'text',
        title: 'Menú y precios',
        payload: 'MENU_PAYLOAD'
      }, {
        content_type: 'text',
        title: 'Zonas de entrega',
        payload: 'DELIVERY_PAYLOAD'
      }, {
        content_type: 'text',
        title: 'Promociones',
        payload: 'OFFERS_PAYLOAD'
      }]
    }
  };
  // senderActions(senderId);
  callSendApi(messageData);
}

function defaultQuestions(senderId) {
  var messageData = {
    recipient: {
      id: senderId
    },
    message: {
      text: '¿Te puedo ayudar en algo más?',
      quick_replies: [{
        content_type: 'text',
        title: '¿Como funciona?',
        payload: 'HOW_WORK_PAYLOAD'
      }, {
        content_type: 'text',
        title: 'Menú y precios',
        payload: 'MENU_PAYLOAD'
      }, {
        content_type: 'text',
        title: 'Zonas de entrega',
        payload: 'DELIVERY_PAYLOAD'
      }, {
        content_type: 'text',
        title: 'Promociones',
        payload: 'OFFERS_PAYLOAD'
      }]
    }
  };
  // senderActions(senderId);
  setTimeout(function () {
    callSendApi(messageData);
  }, 4000);
}

function showMenu(senderId) {
  // const dishes = await models.Dish.findAll({ where: { active: true } });
  // const dishesElem = dishes.map(item => ({ title: item.name, subtitle: item.price, image_url: item.image }));

  // console.log('DISHES---->', dishesElem);
  var messageData = {
    recipient: {
      id: senderId
    },
    message: {
      attachment: {
        type: 'template',
        payload: {
          // template_type: 'generic',
          template_type: 'generic',
          // top_element_style: 'compact',
          elements: [{
            title: 'Milanesa de Pollo Light',
            subtitle: '$90MX',
            image_url: 'https://s3-us-west-2.amazonaws.com/eathouse/dishes/pollo-light.png'
          }, {
            title: 'Milanesa de Pollo Empanizada',
            subtitle: '$90MX',
            image_url: 'https://s3-us-west-2.amazonaws.com/eathouse/dishes/menu2.jpg'
          },
          // {
          //   title: 'Milanesa de Res Light',
          //   subtitle: '$80MX',
          //   image_url: 'https://s3-us-west-2.amazonaws.com/eathouse/dishes/milanesa-light.png',
          // },
          {
            title: 'Milanesa de Pollo a la Plancha.',
            subtitle: '$90MX',
            image_url: 'https://s3.us-west-2.amazonaws.com/eathouse/dishes/p-milanesa-pollo.png'
          }, {
            title: 'Ensalada del Chef',
            subtitle: '$80MX',
            image_url: 'https://s3.us-west-2.amazonaws.com/eathouse/dishes/p-ensalada-huevo.png'
          }, {
            title: 'Ensalada Santa Fe',
            subtitle: '$90MX',
            image_url: 'https://s3.us-west-2.amazonaws.com/eathouse/dishes/santa-fe-fondo.jpg'
          },
          // {
          //   title: 'Ensalada de Atún con Coditos',
          //   subtitle: '$80MX',
          //   image_url: 'https://s3.us-west-2.amazonaws.com/eathouse/dishes/p-ensalada-coditos.png',
          // },
          {
            title: 'Milanesa de Res Empanizada',
            subtitle: '$90MX',
            image_url: 'https://s3-us-west-2.amazonaws.com/eathouse/dishes/menu5.jpg'
          }, {
            title: 'Tortas de Papa',
            subtitle: '$80MX',
            image_url: 'https://s3.us-west-2.amazonaws.com/eathouse/dishes/tortas-papa-fondo.png'
          },
          // {
          //   title: 'Ensalada Cesar con Pollo',
          //   subtitle: '$90MX',
          //   image_url: 'https://s3-us-west-2.amazonaws.com/eathouse/dishes/menu8.jpg',
          // },
          {
            title: 'Pasta con Albóndigas',
            subtitle: '$90MX',
            image_url: 'https://s3.us-west-2.amazonaws.com/eathouse/dishes/pasta-fondo.jpg'
          }, {
            title: 'Cortadillo de Res',
            subtitle: '$90MX',
            image_url: 'https://s3.us-west-2.amazonaws.com/eathouse/dishes/cortadillo-fondo.jpg'
          }]
        }
      }
    }
  };
  callSendApi(messageData);
}

function howWork(senderId) {
  var messageData = {
    recipient: {
      id: senderId
    },
    message: {
      text: '\n      *1) Elige tu comida:* Selecciona de una variedad de platillos que tenemos disponibles.\n\n*2) Ordena o planifica tus platillos:* Ordena tus platillos antes de las 11:00am o programa por adelantado tus platillos.\n\n*3) Disfruta tu comida:* Tu orden ser\xE1 entregada a la puerta de tu casa u oficina entre 12:30 pm y la 1:30 pm.\n\nEnv\xEDo Gratis. Todo se ordena desde nuestro sitio web www.eathouse.mx o desde nuestras APPs.\n      '
    }
  };

  callSendApi(messageData);
}

function delivery(senderId) {
  var messageData = {
    recipient: {
      id: senderId
    },
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'button',
          text: 'Disponible en zona Valle, Valle Oriente, San Jeronimo, Chepevera y Cumbres. Envío Gratis.  🛵',
          buttons: [{
            title: 'Ver en el mapa',
            type: 'web_url',
            url: 'https://eathouse.mx/map-available',
            webview_height_ratio: 'tall'
          }]
        }
      }
    }

  };

  callSendApi(messageData);
}

function offers(senderId) {
  var messageData = {
    recipient: {
      id: senderId
    },
    message: {
      text: 'Obtén un 20% de descuento en la compra de 5 platillos o más, puedes ordenar para un mismo día o programarlos para diferentes días.'
    }
  };

  callSendApi(messageData);
}

exports.default = controller;