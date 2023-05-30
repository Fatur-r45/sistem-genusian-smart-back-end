import Notifikasi from "../model/NotifikasiModel.js";

export const getNotifikasiByNim = async (req, res) => {
  const { nim } = req.params;
  try {
    const notifikasi = await Notifikasi.findAll({
      where: {
        nim: nim,
      },
    });
    if (notifikasi.length > 0) {
      return res.status(200).json({
        message: "data berhasil di tampilkan",
        data: notifikasi,
      });
    } else {
      return res.status(200).json({
        message: "tidak ada data",
        data: [],
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
