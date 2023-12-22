import { Pool } from 'pg';


const pool = new Pool({
  user: "fred",
  host: "localhost",
  database: "songs_db",
  password: "rodriguez123",
  port: 5432,
});

export default pool;
