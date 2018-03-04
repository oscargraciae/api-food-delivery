import formatErrors from '../utils/formatErrors';
import requiresAuth from '../permissions';

export default {
  Query: {
    dishes: (parent, args, { models }) => {
      return models.Dish.findAll();
    },
  },
  Mutation: {
    createDish: async (parent, args, { models }) => {
      try {
        const dish = await models.Dish.create({ ...args });
        return {
          ok: true,
          dish,
        };
      } catch (error) {
        return {
          ok: false,
          errors: formatErrors(error, models),
        };
      }
    },
  },
};
