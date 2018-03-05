import { tryLogin } from '../auth';
import formatErrors from '../utils/formatErrors';

export default {
  Query: {
    getUser: async (parent, { id }, { models }) => {
      const user = await models.User.findOne({
        where: { id },
        include: [
          models.Suscription,
          { model: models.UserAddress, as: 'userAddress' },
        ],
      });
      return user;
    },
    getAllUsers: async (parent, args, { models }) => {
      const user = await models.User.findAll({ include: [models.Suscription, { model: models.UserAddress, as: 'userAddress' }] });
      return user;
    },
  },
  Mutation: {
    login: async (parent, { email, password }, { models, SECRET, SECRET2 }) => tryLogin(email, password, models, SECRET, SECRET2),
    createUser: async (parent, args, { models }) => {
      try {
        const user = await models.User.create(args);

        return {
          ok: true,
          user,
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    },
  },
};
