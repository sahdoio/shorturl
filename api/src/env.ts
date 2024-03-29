const env = {
  ENV: 'FROM_ENV',
  PORT: 'FROM_ENV',
  ROUTE_ROOT: '/api/v1',
  APP_HOST: 'FROM_ENV',
  database: {
    DEFAULT: {
      DRIVER: 'postgres',
      HOST: 'FROM_ENV',
      PORT: 'FROM_ENV',
      USERNAME: 'FROM_ENV',
      PASSWORD: 'FROM_ENV',
      NAME: 'FROM_ENV'
    },
    TEST: {
      DRIVER: 'postgres',
      HOST: 'FROM_ENV',
      PORT: 'FROM_ENV',
      USERNAME: 'FROM_ENV',
      PASSWORD: 'FROM_ENV',
      NAME: 'FROM_ENV'
    },
  },
  redis: {
    HOST: 'FROM_ENV',
    PORT: 6379,
  },
  i18n: {
    LOCALES: ['en'],
    DEFAULT_LOCALE: 'en'
  },
  paginatedResult: {
    defaultItemsPerPage: 10,
    defaultCurrentPage: 1
  }
}

export default env
