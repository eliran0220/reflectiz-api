import mysql from 'mysql2/promise';
export let db: mysql.Connection;
export async function connect(): Promise<mysql.Connection | void> {
    if (db) return db;
    db = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_ROOT_PASSWORD,
        port: Number(process.env.MYSQL_LOCAL_PORT)

    });
    await db.connect();
    console.log("Connected to db!")
  }

  export async function initDb():Promise<void> {
    const init_db_query = `CREATE DATABASE IF NOT EXISTS DB`
    await db.query(init_db_query);
    const use_query = `USE DB`;
    await db.query(use_query);
    const init_url_table = `
        CREATE TABLE IF NOT EXISTS DOMAINS(
            domain_id INT AUTO_INCREMENT,
            domain VARCHAR(255) NOT NULL, 
            attributes JSON,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (domain_id));`;
    await db.query(init_url_table);
  }