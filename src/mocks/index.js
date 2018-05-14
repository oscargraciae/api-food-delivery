import faker from 'faker';
import models from '../models';

const TOTAL = 2;

export default async () => {
  try {
    await Array.from({ length: TOTAL }).forEach(async (_, i) => {
      await models.CreditCard.create({
        token: '2323jsdkshdhjhj32323b32j32',
        last4: '2344',
        brand: 'MC',
      });
    });
  } catch (error) {
    throw error;
  }
};
