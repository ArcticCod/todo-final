require("dotenv").config();
const mysql = require("mysql");
const { DBHOST, DBUSER, DBPASS, DBDATABASE } = process.env;

const writePool = mysql.createPool({
  connectionLimit: 3,
  host: DBHOST,
  user: DBUSER,
  password: DBPASS,
  database: DBDATABASE,
});
const query = async (queryString, args) => {
  const result = await new Promise((resolve, reject) => {
    writePool.getConnection((err, con) => {
      if (err) {
        return reject(err);
      }
      con.query(queryString, args, (err, rows) => {
        con.release();
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  });
  return result;
};

module.exports = query;
