import mysql from "mysql2/promise";

export async function queryToDB({ query, values = [] }) {
  const dbconnection = await mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
  });

  try {
    const [results] = await dbconnection.execute(query, values);
    return results;
  } catch (error) {
    throw Error(error.message);
  } finally {
    dbconnection.close();
  }
}
