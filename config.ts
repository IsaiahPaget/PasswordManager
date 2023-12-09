import dotenv from 'dotenv'

dotenv.config()

const config = {
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    // waitForConnections: true,
    // connectionLimit: 10,
    // maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    // idleTimeout: process.env.CONNECTION_TIMEOUT, // idle connections timeout, in milliseconds, the default value 60000
    // queueLimit: 0,
    // enableKeepAlive: true,
    // keepAliveInitialDelay: 0
  },
}

export default config
