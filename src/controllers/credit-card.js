// import conekta from 'conekta';
import Openpay from 'openpay';

import models from '../models';
import { CONEKTA_KEY } from '../config/consts';

function createCreditCard(card, userId) {
  try {
    const cardObj = {
      token: card.id,
      last4: card.card_number,
      brand: card.brand,
      userId,
    };
    models.CreditCard.create(cardObj);
  } catch (error) {
    console.log("Error----->", error);
  }
}

const controller = {};

controller.getByUser = async (req, res) => {
  const creditCards = await models.CreditCard.findAll({ where: { userId: req.user.id }, order: [['id', 'DESC']] });
  return res.json(creditCards);
};

controller.create = async (req, res) => {
  try {
    const openpay = new Openpay('m7pd5e0tn3gnjzam8jvc', 'sk_baecde9ba76f45d382f7827efdba0b30', false);
    if (req.user.conektaid) {
      openpay.customers.get(req.user.conektaid, (err, customer) => {
        openpay.customers.cards.create(customer.id, { token_id: req.body.token, device_session_id: req.body.deviceSessionId }, (error, card) => {
          if (error) {
            console.log('error---------->', error);
            return res.json(error);
          }
          createCreditCard(card, req.user.id);
          return res.json(card);
        });
      });
    } else {
      openpay.customers.create({
        name: `${req.user.firstName}`,
        last_name: req.user.lastName,
        email: req.user.email,
        // external_id: req.user.id,
      }, async (err, resp) => {
        if (err) {
          return res.json(err);
        }

        openpay.customers.cards.create(resp.id, { token_id: req.body.token, device_session_id: req.body.deviceSessionId }, (error, card) => {
          if (error) {
            console.log('error---------->', error);
          } else {
            createCreditCard(card, req.user.id);
          }
        });

        const user = await models.User.findOne({ where: { id: req.user.id } });
        user.update({ conektaid: resp.id });

        return res.json(resp);
      });
    }
  } catch (error) {
    console.log("Ha ocurrido un error", error);
    return res.json({ message: "Ha ocurrido un error" });
  }
};

export default controller;
