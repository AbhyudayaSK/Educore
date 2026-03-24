import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const envSchema = z.object({
  PORT: z.string().default('5000'),
  DATABASE_URL: z.string(),
  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  FRONTEND_URL: z.string(),
});

const fs = require('fs');

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  fs.writeFileSync('env-error.log', JSON.stringify(_env.error.format(), null, 2));
  console.error('❌ Invalid environment variables', _env.error.format());
  process.exit(1);
}

export const env = _env.data;
