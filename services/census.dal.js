const dal = require("./postgres_db");
const express = require("express");
const app = express();

const getAllCensus = () => {
  return new Promise(function (resolve, reject) {
    const sql = "SELECT * FROM census ORDER BY family_name ASC";
    dal.query(sql, [], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

const getCensusByFamilyName = (family_name) => {
  console.log("Outside promise");
  return new Promise(function (resolve, reject) {
    app.set("view-engine", "ejs");
    console.log("Inside promise: Family name: " + family_name);
    const sql = "SELECT * FROM census1 WHERE family_name = $1";
    dal.query(sql, [family_name], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

module.exports = {
  getAllCensus,
  getCensusByFamilyName,
};
