import { Sequelize } from "sequelize";
import db from "../config/Databse.js";
const { DataTypes } = Sequelize;

const Sertifikat = db.define(
  "sertifikat",
  {
    kd_sertifikat: {
      type: DataTypes.BIGINT(20),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_acara: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    keterangan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pdf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggal_dapat: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Sertifikat;
