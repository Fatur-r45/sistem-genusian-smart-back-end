import express from "express";
import db from "./config/Databse.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./routes/index.js";
// import Sertifikat from "./model/SertifikatModel.js";
// import Pengalaman from "./model/PengalamanModel.js";
// import Pendidikan from "./model/PendidikanModel.js";
dotenv.config();
const app = express();

try {
  await db.authenticate();
  // console.log("Database Conected");
  // await Pendidikan.sync();
} catch (error) {
  console.log(error);
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
// app.use("/images", express.static(path.join(path.resolve(), "images")));
// app.use(
//   "/asset/images",
//   express.static(path.join(path.resolve(), "asset/images"))
// );
app.use("/asset/pdf", express.static("asset/pdf"));
// console.log(path.join(path.resolve(), "images"));
app.use(express.json());
app.use(router);

app.use((err, req, res, next) => {
  res.json({
    message: err.message,
  });
});

app.listen(5000, () => console.log("server runing at port 5000"));
