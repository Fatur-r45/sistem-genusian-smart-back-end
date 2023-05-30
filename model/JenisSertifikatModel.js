import { Sequelize } from "sequelize";
import db from "../config/Databse.js";
const { DataTypes } = Sequelize;

const JenisSertifikat = db.define(
  "JenisSertifikat",
  {
    jenis: {
      type: DataTypes.STRING,
    },
    point: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

export default JenisSertifikat;
