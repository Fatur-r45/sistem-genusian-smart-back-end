import { Sequelize } from "sequelize";
import db from "../config/Databse.js";
const { DataTypes } = Sequelize;

const Pengalaman = db.define(
  "pengalaman",
  {
    kd_pengalaman: {
      type: DataTypes.BIGINT(20),
      allowNull: false,
    },
    posisi_pekerjaan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_perusahaan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jenis_pekerjaan: {
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

export default Pengalaman;
