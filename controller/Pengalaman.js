import Pengalaman from "../model/PengalamanModel.js";
import Mahasiswa from "../model/MahasiswaModel.js";

export const getPengalaman = async (req, res) => {
  try {
    const pengalaman = await Pengalaman.findAll({
      attributes: [
        "id",
        "kd_pengalaman",
        "posisi_pekerjaan",
        "nama_perusahaan",
        "jenis_pekerjaan",
        "mulai",
        "sampai",
      ],
    });
    if (pengalaman.length > 0) {
      res.status(200).json({
        message: "data berhasil di tampilkan",
        data: pengalaman,
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

export const postPengalaman = async (req, res) => {
  const { posisi_pekerjaan, nama_perusahaan, jenis_pekerjaan, mulai, sampai } =
    req.body;
  const kd_pengalaman = req.params.nim;
  if (
    !kd_pengalaman ||
    !posisi_pekerjaan ||
    !jenis_pekerjaan ||
    !nama_perusahaan ||
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
          nim: kd_pengalaman,
        },
      }
    );
    const pengalaman = await Pengalaman.create({
      kd_pengalaman: kd_pengalaman,
      posisi_pekerjaan: posisi_pekerjaan,
      jenis_pekerjaan: jenis_pekerjaan,
      nama_perusahaan: nama_perusahaan,
      mulai: mulai,
      sampai: sampai,
    });
    res.status(200).json({
      message: "data berhasil upload",
      data: pengalaman,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const getPengalamanByNim = async (req, res) => {
  try {
    const pengalaman = await Pengalaman.findAll({
      where: {
        kd_pengalaman: req.params.nim,
      },
      attributes: [
        "id",
        "kd_pengalaman",
        "posisi_pekerjaan",
        "nama_perusahaan",
        "jenis_pekerjaan",
        "mulai",
        "sampai",
      ],
    });
    if (pengalaman.length > 0) {
      res.status(200).json({
        message: "data berhasil di tampilkan",
        data: pengalaman,
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

export const getPengalamanById = async (req, res) => {
  try {
    const pengalaman = await Pengalaman.findByPk(req.params.id, {
      attributes: [
        "id",
        "kd_pengalaman",
        "posisi_pekerjaan",
        "nama_perusahaan",
        "jenis_pekerjaan",
        "mulai",
        "sampai",
      ],
    });
    res.status(200).json({
      message: "data berhasil di tampilkan",
      data: pengalaman,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const putPengalaman = async (req, res) => {
  const { posisi_pekerjaan, nama_perusahaan, jenis_pekerjaan, mulai, sampai } =
    req.body;
  if (
    !posisi_pekerjaan ||
    !jenis_pekerjaan ||
    !nama_perusahaan ||
    !mulai ||
    !sampai
  ) {
    return res.status(400).json({ error: "semua fields harus terisi" });
  }
  try {
    const pengalaman = await Pengalaman.update(
      {
        posisi_pekerjaan: posisi_pekerjaan,
        jenis_pekerjaan: jenis_pekerjaan,
        nama_perusahaan: nama_perusahaan,
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
      data: pengalaman,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const deletPengalaman = async (req, res) => {
  try {
    await Pengalaman.destroy({
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
