import { app } from './app';
import { env } from './config/env';
import { pool } from './config/db';

async function start() {
  try {
    const client = await pool.getConnection();
    client.release();
    console.log('Database connected successfully');

    app.listen(env.PORT, () => {
      console.log(`Server is running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();
