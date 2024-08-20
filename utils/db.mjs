import * as pg from "pg";
const { Pool } = pg.default;
import "dotenv/config";

const connectionPool = new Pool({
  user: `${process.env.DB_USERNAME}`,
  host: `${process.env.DB_HOST}`,
  database: `${process.env.DB_NAME}`,
  password: `${process.env.DB_PASSWORD}`,
  port: `${process.env.DB_PORT}`,
});

export default connectionPool;
