import { tryLogin } from '../auth';
import formatErrors from '../utils/formatErrors';

export default {
  Query: {
    suscriptions: (parent, args, { models }) => models.Suscription.findAll(),
    suscription: (parent, { id }, { models }) => models.Suscription.findOne({ where: { id } }),
  },
};
