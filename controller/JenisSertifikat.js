import JenisSertifikat from "../model/JenisSertifikatModel.js";

export const getJenisSertifikat = async (req, res) => {
  try {
    const data = await JenisSertifikat.findAll();
    if (data.length > 0) {
      return res.status(200).json({
        message: "data berhasil di tampilkan",
        data: data,
      });
    } else {
      return res.status(200).json({
        message: "data berhasil di tampilkan",
        data: [],
      });
    }
  } catch (error) {}
};
