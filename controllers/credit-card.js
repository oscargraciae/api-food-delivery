import conekta from 'conekta';

import models from '../models';

function createCreditCard(card, userId) {
  const cardObj = {
    token: card.id,
    last4: card.last4,
    brand: card.brand,
    userId,
  };
  models.CreditCard.create(cardObj);
}

const controller = {};

controller.getByUser = async (req, res) => {
  const creditCards = await models.CreditCard.findAll({ where: { userId: req.user.id }, order: [['id', 'DESC']] });
  return res.json(creditCards);
};

controller.create = async (req, res) => {
  conekta.api_key = 'key_jaiWQwqGqEkQqqkUqhdy2A';
  conekta.locale = 'es';

  if (req.user.conektaid) {
    conekta.Customer.find(req.user.conektaid, (err, customer) => {
      customer.createPaymentSource({ type: 'card', token_id: req.body.token }, (err, card) => {
        if (err) {
          return res.json(err);
        }
        const resp = card;
        createCreditCard(resp, req.user.id);
        return res.json(resp);
      });
    });
  } else {
    conekta.Customer.create({
      name: `${req.user.firstName} ${req.user.lastName}`,
      email: req.user.email,
      payment_sources: [{
        type: 'card',
        token_id: req.body.token,
      }],
    }, async (err, resp) => {
      if (err) {
        return res.json(err);
      }
      const customer = resp.toObject();
      const user = await models.User.findOne({ where: { id: req.user.id } });
      user.update({ conektaid: customer.id });
      createCreditCard(customer.payment_sources[0]);
      return res.json(resp.toObject());
    });
  }
};

export default controller;
