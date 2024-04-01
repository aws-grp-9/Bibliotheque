require("dotenv").config();


const Pool = require("pg").Pool;
const pool = new Pool({
  connectionString: "postgres://postgres.cbzfxbogzharlatdkrpd:MotdepasseSecret11!@aws-0-eu-west-2.pooler.supabase.com:5432/postgres",
  ssl: {
    rejectUnauthorized: false,
  },
});


export default pool;