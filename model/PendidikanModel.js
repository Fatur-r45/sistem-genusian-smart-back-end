import { Sequelize } from "sequelize";
import db from "../config/Databse.js";
const { DataTypes } = Sequelize;

const Pendidikan = db.define(
  "pendidikan",
  {
    kd_pendidikan: {
      type: DataTypes.BIGINT(20),
      allowNull: false,
    },
    nama_instansi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gelar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bidang_studi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mulai: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    sampai: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Pendidikan;
