import Users from "../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { kirimEmail } from "../helpers/index.js";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "user_name", "nim", "email"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const Register = async (req, res) => {
  const { user_name, email, nim, password, confPassword } = req.body;
  console.log(nim);
  if (password !== confPassword) {
    return res
      .status(400)
      .json({ msg: "password dan confirm password tidak cocok" });
  }
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      user_name: user_name,
      nim: nim,
      email: email,
      password: hashPassword,
    });
    res.json({ msg: "register berhasil" });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: "Password Salah" });
    const userId = user[0].id;
    const user_name = user[0].user_name;
    const nim = user[0].nim;
    const email = user[0].email;
    const accessToken = jwt.sign(
      { userId, user_name, nim, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );
    const refreshToken = jwt.sign(
      { userId, user_name, nim, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ msg: "email tidak ditemukan" });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};

export const linkResetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Users.findAll({
      where: {
        email: email,
      },
    });
    if (!user[0])
      return res.status(400).json({ message: "email tidak ditemukan" });
    const token = jwt.sign(
      {
        iduser: user[0].id,
      },
      process.env.RESSET_PASSWORD,
      {
        expiresIn: "5m",
      }
    );
    await Users.update(
      {
        reset_password: token,
      },
      {
        where: {
          id: user[0].id,
        },
      }
    );
    const template = {
      from: "ADMIN NUSAPUTRA",
      to: email,
      subject: "Link Reset Password",
      html: `<p>silahkan klik link dibawah ini untuk reset password anda</p> <p>${process.env.CLIENT_URL}/reset_password/${token}</p> <p>dan ini adalah token reset anda: ${token}</p>`,
    };
    kirimEmail(template);
    return res.status(200).json({
      message: "link reset sudah terkirim",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  const token = req.params.token;
  const { password, confPassword } = req.body;
  try {
    if (password !== confPassword) {
      return res
        .status(400)
        .json({ msg: "password dan confirm password tidak cocok" });
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await Users.findOne({ where: { reset_password: token } });
    if (!user) {
      return res
        .status(404)
        .json({ error: "token tidak ditemukan/kadaluarsa" });
    }
    user.password = hashPassword;
    await user.save();
    return res.status(200).json({
      message: "password berhasil diubah",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
