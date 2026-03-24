import fs from 'fs';
import path from 'path';
import { pool } from '../config/db';

const logFile = path.join(process.cwd(), 'migration-new.log');
function log(msg: string) {
  console.log(msg);
  fs.appendFileSync(logFile, msg + '\n');
}

async function runMigrations() {
  fs.writeFileSync(logFile, 'Starting migrations...\n');
  let connection;
  try {
    log('Connecting to database...');
    connection = await pool.getConnection();
    log('Connected successfully.');
    
    log('Running schema migrations...');
    const schemaPath = path.join(process.cwd(), 'src/db/migrations/01_initial_schema.sql');
    log('Schema path used: ' + schemaPath);
    if (!fs.existsSync(schemaPath)) {
      throw new Error('Schema file not found at ' + schemaPath);
    }
    const schemaSql = fs.readFileSync(schemaPath, 'utf-8');
    log('Schema first 100 chars: ' + schemaSql.substring(0, 100).replace(/\n/g, ' '));
    
    const statements = schemaSql.split(';').map(s => s.trim()).filter(Boolean);
    for (const statement of statements) {
      log('Executing statement: ' + statement.substring(0, 50) + '...');
      await connection.query(statement);
    }
    log('Migrations completed successfully.');

    log('Running seeds...');
    const seedPath = path.join(process.cwd(), 'src/db/seed.sql');
    log('Seed path used: ' + seedPath);
    if (!fs.existsSync(seedPath)) {
      throw new Error('Seed file not found at ' + seedPath);
    }
    const seedSql = fs.readFileSync(seedPath, 'utf-8');
    log('Seed first 100 chars: ' + seedSql.substring(0, 100).replace(/\n/g, ' '));
    const seedStatements = seedSql.split(';').map(s => s.trim()).filter(Boolean);
    for (const statement of seedStatements) {
      log('Executing seed: ' + statement.substring(0, 50) + '...');
      await connection.query(statement);
    }
    log('Seeds completed successfully.');
  } catch (err: any) {
    log('Migration failed: ' + err.message + '\n' + err.stack);
    fs.writeFileSync('migrate-error.log', String(err));
    setTimeout(() => process.exit(1), 100);
  } finally {
    if (connection) connection.release();
    log('Done.');
    setTimeout(() => process.exit(0), 100);
  }
}

runMigrations();
