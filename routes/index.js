import express from "express";
import {
  getUsers,
  Register,
  Login,
  Logout,
  linkResetPassword,
  resetPassword,
} from "../controller/Users.js";
import {
  getMahasiswa,
  getMahasiswaByNim,
  postMahasiswa,
  putMahasiswa,
  deletMahasiswa,
  getMahasiswaByName,
  getMahasiswaBySearch,
} from "../controller/Mahasiswa.js";
import {
  deletSertifikat,
  getSertificatById,
  getSertificatByNim,
  getSertifikat,
  postSertifikat,
  putSertifikat,
} from "../controller/Sertifikat.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";
import upload from "../middleware/Multer.js";
import {
  deletPengalaman,
  getPengalaman,
  getPengalamanById,
  getPengalamanByNim,
  postPengalaman,
  putPengalaman,
} from "../controller/Pengalaman.js";
import {
  deletPendidikan,
  getPendidikan,
  getPendidikanById,
  getPendidikanByNim,
  postPendidikan,
  putPendidikan,
} from "../controller/Pendidikan.js";
import { getNotifikasiByNim } from "../controller/Notifikasi.js";
import { getJenisSertifikat } from "../controller/JenisSertifikat.js";

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.post("/users", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);
router.put("/forgotPassword", linkResetPassword);
router.put("/resetPassword/:token", resetPassword);

// ==================================================

router.get("/mahasiswa", getMahasiswa);
router.get("/mahasiswa/search", getMahasiswaBySearch);
router.get("/mahasiswa/:nama", getMahasiswaByName);
router.get("/mahasiswa/nim/:nim", getMahasiswaByNim);
router.post("/mahasiswa", postMahasiswa);
router.put("/mahasiswa/:nim", putMahasiswa);
router.delete("/mahasiswa/:nim", deletMahasiswa);

// ====================================================
router.get("/sertifikat", getSertifikat);
router.get("/sertifikat/:nim", getSertificatByNim);
router.get("/sertifikat/id/:id", getSertificatById);
router.post("/sertifikat/:nim", upload.uploadPdf.single("pdf"), postSertifikat);
router.put("/sertifikat/:id", upload.uploadPdf.single("pdf"), putSertifikat);
router.delete("/sertifikat/:id", deletSertifikat);

// ====================================================
router.get("/pengalaman", getPengalaman);
router.get("/pengalaman/:nim", getPengalamanByNim);
router.get("/pengalaman/id/:id", getPengalamanById);
router.post("/pengalaman/:nim", postPengalaman);
router.put("/pengalaman/:id", putPengalaman);
router.delete("/pengalaman/:id", deletPengalaman);

// ====================================================
router.get("/pendidikan", getPendidikan);
router.get("/pendidikan/:nim", getPendidikanByNim);
router.get("/pendidikan/id/:id", getPendidikanById);
router.post("/pendidikan/:nim", postPendidikan);
router.put("/pendidikan/:id", putPendidikan);
router.delete("/pendidikan/:id", deletPendidikan);

// ==================================================
router.get("/notifikasi/:nim", getNotifikasiByNim);

// ==================================================
router.get("/jenis_sertifikat", getJenisSertifikat);

export default router;
