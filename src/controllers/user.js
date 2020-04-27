import bcrypt from 'bcryptjs';
import models from '../models';
import { addContactToList } from '../utils/sendgrid-client';
import { mailResetPassword } from '../mailers/user';

const controller = {};

controller.get = async (req, res) => {
  const { id } = req.params;
  const user = await models.User.findOne({
    where: { id },
    include: [
      { model: models.UserAddress, as: 'user_address' },
      { model: models.Bussine },
    ],
  });

  return res.json(user);
};

controller.login = (req, res, next) => {
  res.status(200).json({
    ok: true,
    user: req.user.toAuthJSON(),
  });
  return next();
};

controller.loginFacebook = (req, res, next) => {
  console.log("Test FACEBOOK---->");
  res.status(200).json({
    ok: true,
    user: req.user.toAuthJSON(),
  });
  return next();
};

controller.create = async (req, res) => {
  try {
    const user = await models.User.create(req.body);
    if (user) {
      await addContactToList(user);
    }
    return res.status(201).json({
      ok: true,
      user,
    });
  } catch (err) {
    return res.json({
      ok: false,
      errors: err.message,
    });
  }
};

controller.sendPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await models.User.findOne({ where: { email } });

  if (!user) {
    return res.json({ message: 'Usuario no encontrado' });
  }
  const message = await mailResetPassword(user);
  return res.json({ message: 'Correo enviado', prueba: message });
};

controller.validationToken = async (req, res) => {
  const { t, id } = req.query;

  const user = await models.User.findOne({ where: { id } });

  if (!await bcrypt.compare(user.email, t)) {
    return res.json({ isValid: false, message: 'Usuario invalido' });
  }

  return res.json({ message: 'Usuario valido', isValid: true, userId: user.id });
};

controller.changePassword = async (req, res) => {
  const { id } = req.params;
  const us = await models.User.update({ password: req.body.newPassword }, { where: { id } });


  return res.json({ message: 'Usuario valido', userId: us, ok: true });
};

controller.createAddress = async (req, res) => {
  try {
    const data = req.body;
    const address = await models.UserAddress.create({ ...data, userId: req.user.id });
    if (address) {
      const user = await models.User.findOne({
        where: { id: req.user.id },
      });
      user.update({ withAddress: true });
    }
    return res.json({
      ok: true,
      address,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error,
    });
  }
};


controller.createAddressWithBusiness = async (req, res) => {
  try {
    const data = req.body;
    const business = await models.Bussine.findOne({ where: { id: data.businessId } });
    const address = await models.UserAddress.create({
      addressMap: business.addressMap,
      street: business.street,
      area: business.area,
      lat: business.lat,
      lng: business.lng,
      city: business.city,
      state: business.state,
      phone: data.phone,
      notes: data.notes,
      userId: req.user.id,
    });
    if (address) {
      const user = await models.User.findOne({ where: { id: req.user.id } });
      user.update({ withAddress: true, bussinesId: business.id });
    }
    return res.json({
      ok: true,
      address,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error,
    });
  }
};

controller.changeAlerts = async (req, res) => {
  try {
    const { remainderAlert, marketing } = req.body;
    const user = await models.User.update({ remainderAlert, marketing }, { where: { id: req.user.id } });
    return res.json({
      ok: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error,
    });
  }
};

export default controller;
