// export const isDev = process.env.NODE_ENV === 'development';

const DB_DEVELOPMENT = {
  DATABASE: 'ecommerce_dev',
  USERNAME: 'postgres',
  PASSWORD: 'desarrollo',
  HOST: 'localhost',
};

const DB_TEST = {
  DATABASE: 'ecommerce_dev',
  USERNAME: 'nwsa@evaa',
  PASSWORD: 'Evaa.001$',
  HOST: 'evaa.postgres.database.azure.com',
};

// const DB_PRODUCTION = {
//   DATABASE: 'evaa_production',
//   USERNAME: 'nwsa@evaa',
//   PASSWORD: 'Evaa.001$',
//   HOST: 'evaa.postgres.database.azure.com',
// };

function envConf(env) {
  switch (env) {
    case 'development':
      return DB_DEVELOPMENT;
    case 'test':
      return DB_TEST;
    case 'production':
      return DB_TEST;
    default:
      return DB_TEST;
  }
}

export default {
  ...envConf(process.env.NODE_ENV),
};
