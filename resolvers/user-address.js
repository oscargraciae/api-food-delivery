import formatErrors from '../utils/formatErrors';
import requiresAuth from '../permissions';

export default {
  Query: {
    getAllAddress: (parent, args, { models }) => models.UserAddress.findAll(),
    getAddressByUser: requiresAuth.createResolver((parent, args, { models, user }) => models.UserAddress.findAll({ where: { userId: user.id } })),
  },
  Mutation: {
    createAddress: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        const address = await models.UserAddress.create({ ...args, userId: user.id });
        return address;
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    }),
  },
};
