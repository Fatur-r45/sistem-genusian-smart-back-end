import Sertifikat from "../model/SertifikatModel.js";
import fs from "fs";
import Mahasiswa from "../model/MahasiswaModel.js";
import path from "path";

export const getSertifikat = async (req, res) => {
  try {
    const sertifikat = await Sertifikat.findAll({
      attributes: [
        "id",
        "kd_sertifikat",
        "title",
        "nama_acara",
        "keterangan",
        "pdf",
        "tanggal_dapat",
      ],
    });
    if (sertifikat.length > 0) {
      res.status(200).json({
        message: "data berhasil di tampilkan",
        data: sertifikat,
      });
    } else {
      res.status(200).json({
        message: "tidak ada data",
        data: [],
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const postSertifikat = async (req, res) => {
  if (req.file && req.file.path) {
    const { title, nama_acara, keterangan, tanggal_dapat, point } = req.body;
    const pdf = req.file.path;
    const kd_sertifikat = req.params.nim;
    if (
      !kd_sertifikat ||
      !title ||
      !nama_acara ||
      !keterangan ||
      !tanggal_dapat
    ) {
      return res.status(400).json({ error: "semua fields harus terisi" });
    }
    const url = pdf.replace(/\\/g, "/");

    try {
      await Mahasiswa.update(
        {
          point: point,
        },
        {
          where: {
            nim: kd_sertifikat,
          },
        }
      );
      const sertifikat = await Sertifikat.create({
        kd_sertifikat: kd_sertifikat,
        title: title,
        nama_acara: nama_acara,
        keterangan: keterangan,
        pdf: url,
        tanggal_dapat: tanggal_dapat,
      });
      res.status(200).json({
        message: "data berhasil upload",
        data: sertifikat,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  } else {
    return res.status(400).json({ error: "file harus terisi" });
  }
};

export const getSertificatByNim = async (req, res) => {
  try {
    const sertifikat = await Sertifikat.findAll({
      where: {
        kd_sertifikat: req.params.nim,
      },
      attributes: [
        "id",
        "kd_sertifikat",
        "title",
        "nama_acara",
        "keterangan",
        "pdf",
        "tanggal_dapat",
      ],
    });
    if (sertifikat.length > 0) {
      res.status(200).json({
        message: "data berhasil di tampilkan",
        data: sertifikat,
      });
    } else {
      res.status(200).json({
        message: "data tidak di temukan",
        data: [],
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const getSertificatById = async (req, res) => {
  try {
    const sertifikat = await Sertifikat.findByPk(req.params.id, {
      attributes: [
        "id",
        "kd_sertifikat",
        "title",
        "nama_acara",
        "keterangan",
        "pdf",
        "tanggal_dapat",
      ],
    });
    res.status(200).json({
      message: "data berhasil di tampilkan",
      data: sertifikat,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const putSertifikat = async (req, res) => {
  if (req.file && req.file.path) {
    const { title, nama_acara, keterangan, tanggal_dapat } = req.body;
    const pdf = req.file.path;
    const url = pdf.replace(/\\/g, "/");
    try {
      const dataSertifikat = await Sertifikat.findByPk(req.params.id);
      if (req.file) removepdf(dataSertifikat.pdf);
      const sertifikat = await Sertifikat.update(
        {
          title: title,
          nama_acara: nama_acara,
          keterangan: keterangan,
          pdf: url,
          tanggal_dapat: tanggal_dapat,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json({
        message: "data berhasil di ubah",
        data: sertifikat,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  } else {
    // return res.status(400).json({ error: "file harus terisi" });
    const { title, nama_acara, keterangan, tanggal_dapat } = req.body;
    const dataSertifikat = await Sertifikat.findByPk(req.params.id);
    const pdf = dataSertifikat.pdf;
    try {
      const sertifikat = await Sertifikat.update(
        {
          title: title,
          nama_acara: nama_acara,
          keterangan: keterangan,
          pdf: pdf,
          tanggal_dapat: tanggal_dapat,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json({
        message: "data berhasil di ubah",
        data: sertifikat,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
};

export const deletSertifikat = async (req, res) => {
  try {
    const data = await Sertifikat.findByPk(req.params.id);
    removepdf(data.pdf);
    await Sertifikat.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      message: "data berhasil di hapus",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const removepdf = (filePath) => {
  // console.log(filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
