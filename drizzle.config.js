require('dotenv/config');
const { defineConfig } = require('drizzle-kit');

module.exports = defineConfig({
  schema: './src/database/schema/index.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || '',
  },
});
