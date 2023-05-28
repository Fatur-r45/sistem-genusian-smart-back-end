import { Op } from "sequelize";
import Mahasiswa from "../model/MahasiswaModel.js";
import Sertifikat from "../model/SertifikatModel.js";
import Pendidikan from "../model/PendidikanModel.js";
import Pengalaman from "../model/PengalamanModel.js";
import Users from "../model/UserModel.js";

export const getMahasiswa = async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.findAll({
      attributes: ["nim", "nama", "jurusan", "point", "tentang_saya"],
      order: [["point", "desc"]],
      // include: [{ model: Sertifikat }],
    });
    const rankMahasiswa = mahasiswa.map((data, index) => {
      return {
        nama: data.nama,
        jurusan: data.jurusan,
        rank: index + 1,
        point: data.point,
        tentang_saya: data.tentang_saya,
      };
    });
    if (mahasiswa.length > 0) {
      res.status(200).json({
        message: "data berhasil di tampilkan",
        data: rankMahasiswa,
      });
    } else {
      res.status(200).json({
        message: "tidak ada data",
        data: [],
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.mesage,
    });
  }
};

export const getMahasiswaByNim = async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.findAll({
      where: {
        nim: req.params.nim,
      },
      attributes: ["nim", "nama", "jurusan", "point", "tentang_saya"],
      // include: [
      //   {
      //     model: Sertifikat,
      //     attributes: { exclude: ["createdAt", "updatedAt"] },
      //   },
      // ],
    });
    const ranks = await Mahasiswa.findAll({
      order: [["point", "desc"]],
    });
    const rankScore = mahasiswa[0].point;
    const sameScoreRanks = ranks.filter((r) => r.point === rankScore);
    const rankNumber = sameScoreRanks.length;

    const rankMahasiswa = {
      nim: mahasiswa[0].nim,
      nama: mahasiswa[0].nama,
      jurusan: mahasiswa[0].jurusan,
      point: mahasiswa[0].point,
      tentang_saya: mahasiswa[0].tentang_saya,
      rank: rankNumber,
    };
    if (mahasiswa.length > 0) {
      res.status(200).json({
        message: "data berhasil di tampilkan",
        data: rankMahasiswa,
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

export const getMahasiswaBySearch = async (req, res) => {
  const search = req.query.keyword;
  try {
    if (search === "") {
      res.status(200).json({
        message: "keyword tidak ditemukan",
        data: [],
      });
    } else {
      const mahasiswa = await Mahasiswa.findAll({
        where: {
          nama: {
            [Op.like]: "%" + search + "%",
          },
        },
        attributes: ["nim", "nama", "jurusan", "point", "tentang_saya"],
        limit: 5,
      });
      if (mahasiswa.length > 0) {
        res.status(200).json({
          message: "data berhasil di tampilkan",
          data: mahasiswa,
        });
      } else {
        res.status(200).json({
          message: "data tidak di temukan",
          data: [],
        });
      }
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const getMahasiswaByName = async (req, res) => {
  const nama = req.params.nama;
  const cariNama = nama.split("-").join(" ");
  try {
    const mahasiswa = await Mahasiswa.findAll({
      where: {
        nama: cariNama,
      },
      attributes: ["nim", "nama", "jurusan", "point", "tentang_saya"],
      include: [
        {
          model: Users,
          attributes: ["user_name"],
        },
        {
          model: Sertifikat,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: Pendidikan,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: Pengalaman,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    const ranks = await Mahasiswa.findAll({
      order: [["point", "desc"]],
    });
    const rankScore = mahasiswa[0].point;
    const sameScoreRanks = ranks.filter((r) => r.point === rankScore);
    const rankNumber = sameScoreRanks.length;

    // const rankMahasiswa = {
    //   nim: mahasiswa[0].nim,
    //   nama: mahasiswa[0].nama,
    //   jurusan: mahasiswa[0].jurusan,
    //   point: mahasiswa[0].point,
    //   tentang_saya: mahasiswa[0].tentang_saya,
    //   sertifikat: mahasiswa[0].sertifikat,
    //   rank: rankNumber,
    // };
    if (mahasiswa.length > 0) {
      res.status(200).json({
        message: "data berhasil di tampilkan",
        data: mahasiswa[0],
        rank: rankNumber,
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

export const postMahasiswa = async (req, res) => {
  const { nim, nama, jurusan, point, tentang_saya } = req.body;
  try {
    const mahasiswa = await Mahasiswa.create({
      nim: nim,
      nama: nama,
      jurusan: jurusan,
      tentang_saya: tentang_saya,
      point: point,
    });
    res.status(201).json({
      message: "data berhasil di tambahkan",
      data: mahasiswa,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const putMahasiswa = async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.update(
      {
        nama: req.body.nama,
        jurusan: req.body.jurusan,
        tentang_saya: req.body.tentang_saya,
      },
      {
        where: {
          nim: req.params.nim,
        },
      }
    );
    res.status(200).json({
      message: "data berhasil di ubah",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const deletMahasiswa = async (req, res) => {
  try {
    await Mahasiswa.destroy({
      where: {
        nim: req.params.nim,
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
