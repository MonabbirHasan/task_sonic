const db = require("../config/config");
class UserModel {
  /////////////////////////
  // ALL USER MODEL
  /////////////////////////
  static all_user_model(callback) {
    const sql = "SELECT * FROM users";
    db.query(sql, callback);
  }
  /////////////////////////
  //SINGLE USER MODEL
  /////////////////////////
  static single_user_model(user_id, callback) {
    const sql = "SELECT * FROM users WHERE user_id=?";
    db.query(sql, [user_id], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        const data = result[0];
        callback(null, data);
      }
    });
  }
  ///////////////////////////
  //FIND USER BY EMAIL MODEL
  ///////////////////////////
  static find_user_by_email_model(email, callback) {
    const sql = "SELECT * FROM users WHERE user_email=?";
    db.query(sql, [email], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        const data = result[0];
        callback(null, data);
      }
    });
  }
  /////////////////////////
  // CREATE USER MODEL
  /////////////////////////
  static create_user_model(data, callback) {
    const sql = "INSERT INTO users SET?";
    db.query(sql, data, callback);
  }
  /////////////////////////
  // UPDATE USER MODEL
  /////////////////////////
  static update_user_model(data, user_id, callback) {
    const sql = "UPDATE users SET? WHERE user_id=?";
    db.query(sql, [data, user_id], callback);
  }
  /////////////////////////
  // DELETE USER MODEL
  /////////////////////////
  static delete_user_model(user_id, callback) {
    const sql = "DELETE FROM users WHERE user_id=?";
    db.query(sql, [user_id], callback);
  }
}
module.exports = UserModel;
