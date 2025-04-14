import { Pool } from 'pg';
import mongoose from 'mongoose';

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT),
});

const connectMongo = async () => {
  await mongoose.connect(process.env.MONGO_URI!);
  console.log('MongoDB connected');
};

export { pool, connectMongo };
