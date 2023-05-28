import Mahasiswa from "../model/MahasiswaModel.js";
import Pendidikan from "../model/PendidikanModel.js";

export const getPendidikan = async (req, res) => {
  try {
    const pendidikan = await Pendidikan.findAll({
      attributes: [
        "id",
        "kd_pendidikan",
        "nama_instansi",
        "gelar",
        "bidang_studi",
        "mulai",
        "sampai",
      ],
    });
    if (pendidikan.length > 0) {
      res.status(200).json({
        message: "data berhasil di tampilkan",
        data: pendidikan,
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

export const postPendidikan = async (req, res) => {
  const { nama_instansi, gelar, bidang_studi, mulai, sampai } = req.body;
  const kd_pendidikan = req.params.nim;
  if (
    !kd_pendidikan ||
    !nama_instansi ||
    !gelar ||
    !bidang_studi ||
    !mulai ||
    !sampai
  ) {
    return res.status(400).json({ error: "semua fields harus terisi" });
  }

  try {
    await Mahasiswa.update(
      {
        point: 10,
      },
      {
        where: {
          nim: kd_pendidikan,
        },
      }
    );
    const pendidikan = await Pendidikan.create({
      kd_pendidikan: kd_pendidikan,
      nama_instansi: nama_instansi,
      gelar: gelar,
      bidang_studi: bidang_studi,
      mulai: mulai,
      sampai: sampai,
    });
    res.status(200).json({
      message: "data berhasil upload",
      data: pendidikan,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const getPendidikanByNim = async (req, res) => {
  try {
    const pendidikan = await Pendidikan.findAll({
      where: {
        kd_pendidikan: req.params.nim,
      },
      attributes: [
        "id",
        "kd_pendidikan",
        "nama_instansi",
        "gelar",
        "bidang_studi",
        "mulai",
        "sampai",
      ],
    });
    if (pendidikan.length > 0) {
      res.status(200).json({
        message: "data berhasil di tampilkan",
        data: pendidikan,
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

export const getPendidikanById = async (req, res) => {
  try {
    const pendidikan = await Pendidikan.findByPk(req.params.id, {
      attributes: [
        "id",
        "kd_pendidikan",
        "nama_instansi",
        "gelar",
        "bidang_studi",
        "mulai",
        "sampai",
      ],
    });
    res.status(200).json({
      message: "data berhasil di tampilkan",
      data: pendidikan,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const putPendidikan = async (req, res) => {
  const { nama_instansi, gelar, bidang_studi, mulai, sampai } = req.body;
  if (!nama_instansi || !gelar || !bidang_studi || !mulai || !sampai) {
    return res.status(400).json({ error: "semua fields harus terisi" });
  }
  try {
    const pendidikan = await Pendidikan.update(
      {
        nama_instansi: nama_instansi,
        gelar: gelar,
        bidang_studi: bidang_studi,
        mulai: mulai,
        sampai: sampai,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({
      message: "data berhasil di ubah",
      data: pendidikan,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const deletPendidikan = async (req, res) => {
  try {
    await Pendidikan.destroy({
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
