import { Sequelize } from "sequelize";
import db from "../config/Databse.js";
const { DataTypes } = Sequelize;

const Notifikasi = db.define(
  "notifikasi",
  {
    title: {
      type: DataTypes.STRING,
    },
    body: {
      type: DataTypes.STRING,
    },
    nim: {
      type: DataTypes.BIGINT(20),
    },
  },
  {
    freezeTableName: true,
  }
);

export default Notifikasi;
