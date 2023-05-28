import { Sequelize } from "sequelize";
import db from "../config/Databse.js";
import Sertifikat from "./SertifikatModel.js";
import Pendidikan from "./PendidikanModel.js";
import Pengalaman from "./PengalamanModel.js";
import Users from "./UserModel.js";
const { DataTypes } = Sequelize;

const Mahasiswa = db.define(
  "mahasiswa",
  {
    nim: {
      type: DataTypes.BIGINT(20),
      primaryKey: true,
      unique: true,
    },
    nama: {
      type: DataTypes.STRING,
    },
    jurusan: {
      type: DataTypes.STRING,
    },
    tentang_saya: {
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

Mahasiswa.hasMany(Users, { foreignKey: "nim" });
Users.belongsTo(Mahasiswa, { foreignKey: "nim" });
Mahasiswa.hasMany(Sertifikat, { foreignKey: "kd_sertifikat" });
Sertifikat.belongsTo(Mahasiswa, { foreignKey: "kd_sertifikat" });
Mahasiswa.hasMany(Pendidikan, { foreignKey: "kd_pendidikan" });
Pendidikan.belongsTo(Mahasiswa, { foreignKey: "kd_pendidikan" });
Mahasiswa.hasMany(Pengalaman, { foreignKey: "kd_pengalaman" });
Pengalaman.belongsTo(Mahasiswa, { foreignKey: "kd_pengalaman" });

Mahasiswa.removeAttribute("id");
export default Mahasiswa;
