import { Sequelize } from "sequelize";

const db = new Sequelize("genusian_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
