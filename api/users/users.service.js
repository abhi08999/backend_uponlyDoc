const { pool, sql } = require("../../config");


module.exports = {
  create: (body, callback) => {
    const request = pool();
    request
      .input("phone", sql.NVarChar, body.phone)
      .query(`select * from users where phone = @phone`, (error, results) => {
        if (error) {
          return callback(error);
        }
        if (results.recordset[0]) {
          return callback(null, results);
        } else {
          request
            .input("full_name", sql.NVarChar, body.full_name)
            .input("email", sql.NVarChar, body.email)
            .input("role", sql.NVarChar, body.role)
            .input("isVerified", sql.Int, body.isVerified)
            .input("created_at", sql.DateTime, body.created_at)
            .input("deleted_at", sql.DateTime, body.deleted_at)
            .input("updated_at", sql.DateTime, body.updated_at);
          request.query(
            "INSERT INTO users(full_name,phone,email,role,isVerified,created_at,deleted_at,updated_at) VALUES(@full_name,@phone,@email,@role,@isVerified,@created_at,@deleted_at,@updated_at)"
          );
          return callback();
        }
      });
  },
  getDoctor: async (callback) => {
    const request = pool();
     request.query(
      `select * from doctor`,
      (error, results ) => {
        if (error) {
          return callback(error);
        }
        return callback(null,results);
      }
    );
  },

  login: (body, callback) => {
    const request = pool();
    request
      .input("phone", sql.NVarChar, body.phone)
      .query(`select * from users where phone = @phone `, (error, results) => {
        if (error) {
          callback(error);
        } else {
          return callback(null, results.recordset[0]);
        }
      });
  },
  getUserByPhone: (phone, callback) => {
    const request = pool();
    request
      .input("phone", sql.NVarChar, phone)
      .query(`select * from users where phone = @phone `, (error, results) => {
        if (error) {
          callback(error);
        } else {
          return callback(null, results.recordset[0]);
        }
      });
  },

  createDoc: (body, certificateImage,aadharImage,pancardImage, callback) => {

    const request = pool();
    request
      .input("user_id", sql.Int, body.user_id)
      .input("city", sql.NVarChar, body.city)
      .input("speciality", sql.NVarChar, body.speciality)
      .input("gender", sql.NVarChar, body.gender)
      .input("experience", sql.Int, body.experience)
      .input("certificateImage", sql.NVarChar, certificateImage)
      .input("aadharImage", sql.NVarChar, aadharImage)
      .input("pancardImage", sql.NVarChar, pancardImage)
      .input("created_at", sql.DateTime, body.created_at)
      .input("deleted_at", sql.DateTime, body.deleted_at)
      .input("updated_at", sql.DateTime, body.updated_at)
      .query(
        "INSERT INTO doctor( user_id,city,speciality,gender,experience,certificateImage,aadharImage,pancardImage,created_at,deleted_at,updated_at) VALUES(@user_id,@city,@speciality,@gender,@experience,@certificateImage,@aadharImage,@pancardImage,@created_at,@deleted_at,@updated_at)",
        (error, results) => {
          if (error) {
            return callback(error);
          } else {
            return callback(null, results);
          }
        }
      );
  },

  clinicDoc: (body, certificate,callback) => {
    const request = pool();
    request
      .input("user_id", sql.Int, body.user_id)
      .input("clinic_name", sql.NVarChar, body.clinic_name)
      .input("address", sql.NVarChar, body.address)
      .input("certificate", sql.NVarChar, certificate)
      .input("start_time", sql.Time, body.start_time)
      .input("end_time", sql.Time, body.end_time)
      .input("created_at", sql.DateTime, body.created_at)
      .input("deleted_at", sql.DateTime, body.deleted_at)
      .input("updated_at", sql.DateTime, body.updated_at)
      .query(
        "INSERT INTO clinic( user_id,clinic_name,address,certificate,start_time,end_time,created_at,deleted_at,updated_at) VALUES(@user_id,@clinic_name,@address,@certificate,@start_time,@end_time,@created_at,@deleted_at,@updated_at)",
        (error, results) => {
          if (error) {
            return callback(error);
          } else {
            return callback(null, results);
          }
        }
      );
  },
};
