import { defineCliConfig } from 'sanity/cli';
import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const requireEnv = (key: string) => {
  const value = process.env[key]?.trim();
  if (!value) throw new Error(`[sanity.cli] Missing required environment variable: ${key}`);
  return value;
};

export default defineCliConfig({
  api: {
    projectId: requireEnv('PUBLIC_SANITY_PROJECT_ID'),
    dataset: requireEnv('PUBLIC_SANITY_DATASET'),
  },
  typegen: {
    path: './{src,studio}/**/*.{ts,tsx,js,jsx}',
    schema: './schema.json',
    generates: './sanity.types.ts',
    overloadClientMethods: true,
  },
});
