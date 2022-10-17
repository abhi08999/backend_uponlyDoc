const {
  create,
  createDoc,
  getUserByPhone,
  login,
  clinicDoc,
  getDoctor,
} = require("./users.service");
const { sign } = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config();

/**
 *
 * @param {String} imgPath Path of the image
 * @param {Number} user_id Id of Number
 * @param {String} base64Str Base64 of image
 * @returns {String} Path of image generated
 */
const saveImage = (imgPath, user_id, base64Str) => {
  const path = `upload/${imgPath}/`;
  const buffer = new Buffer.from(base64Str, "base64");
  let fileName = imgPath + user_id + "_" + "image." + "jpeg";

  // Buffer to actual image
  fs.writeFileSync("./" + path + fileName, buffer, "utf8");
  return `${path}${fileName}`;
};

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      if (results) {
        return res.status(400).json({
          success: 0,
          message: "User with this phone Number is already exist",
        });
      }
      const jsonToken = sign({ results }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      return res.status(200).json({
        success: 1,
        message: "User created successfully",
        token: jsonToken,
      });
    });
  },

  getAllDoctors: (req, res) => {
    getDoctor((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if(results.recordsets == "" || null){
        return res.json({
          success: 0,
          message:"Empty data Doctor not found",
        });
      }
      else{
      return res.json({
        success: 1,
        data: results.recordsets
      });
    }
    });
  },

  login: (req, res) => {
    const body = req.body;
    login(body, (err, results) => {
      if (err) {
        throw err;
      }
      const jsonToken = sign({ results }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      if (results) {
        return res.json({
          success: 1,
          message: "login sucessfully",
          token: jsonToken,
          data: results,
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid Phone Number",
        });
      }
    });
  },

  getUsersInfo: (req, res) => {
    const phone = req.params.phone;
    getUserByPhone(phone, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      if (!results) {
        return res.status(200).json({
          success: 0,
          message: "User Not Found",
        });
      } else {
        return res.status(200).json({
          success: 1,
          message: "User Exist",
          data: results,
        });
      }
    });
  },
  createDoctor: (req, res) => {
    const body = req.body;
    const certificate_base64Str = body.certificate;
    const aadhar_base64Str = body.aadhar;
    const pancard_base64Str = body.pancard;
    let certificateImage = "";
    let aadharImage = "";
    let pancardImage = "";

    if (certificate_base64Str !== "" || certificate_base64Str !== null) {
      certificateImage = saveImage(
        "certificate",
        body.user_id,
        certificate_base64Str
      );
    }
    if (aadhar_base64Str !== "" || aadhar_base64Str !== null) {
      aadharImage = saveImage("aadhar", body.user_id, aadhar_base64Str);
    }
    if (pancard_base64Str !== "" || pancard_base64Str !== null) {
      pancardImage = saveImage("pancard", body.user_id, pancard_base64Str);
    }

    createDoc(
      body,
      certificateImage,
      aadharImage,
      pancardImage,
      (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection error",
          });
        }
        return res.status(200).json({
          success: 1,
          message: "profile created successfully",
          data: {
            aadhar: "http://localhost:5000/" + aadharImage,
            pancard: "http://localhost:5000/" + pancardImage,
            certificate: "http://localhost:5000/" + certificateImage,
          },
        });
      }
    );
  },
  DoctorClinic: (req, res) => {
    const body = req.body;
    const Clinic_certificate_base64Str = body.certificate;
    let clinic_CertificateImage = "";
    if (
      Clinic_certificate_base64Str !== "" ||
      Clinic_certificate_base64Str !== null
    ) {
      clinic_CertificateImage = saveImage(
        "clinic_Certificate",
        body.user_id,
        Clinic_certificate_base64Str
      );
    }

    clinicDoc(body, clinic_CertificateImage, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "clinic added successfully",
        data: { clinic: "http://localhost:5000/" + clinic_CertificateImage },
      });
    });
  },
};
