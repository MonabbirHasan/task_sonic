const db = require("../config/config");
class TaskModel {
  /////////////////////
  // ALL TASK MODEL
  ////////////////////
  static all_task_model(callback) {
    const sql = "SELECT * FROM tasks";
    db.query(sql, callback);
  }
  ///////////////////////
  // SINGLE TASK MODEL
  //////////////////////
  static single_task_model(task_id, callback) {
    const sql = "SELECT t.*, u.user_name, u.user_role, u.user_status, u.user_id FROM tasks AS t JOIN users AS u ON t.user_id = u.user_id WHERE t.task_id = ?";
    db.query(sql, [task_id], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        const data = result[0];
        callback(null, data);
      }
    });
  }
  ///////////////////////////
  // SINGLE USER TASK MODEL
  //////////////////////////
  static single_user_task_model(user_id, callback) {
    const sql = `SELECT t.*, u.user_name, u.user_role, u.user_status, u.user_id FROM tasks AS t JOIN users AS u ON t.user_id = u.user_id WHERE u.user_id = ?`;
    db.query(sql, [user_id], callback);
  }
  ///////////////////////
  // CREATE TASK MODEL
  //////////////////////
  static create_task_model(data, callback) {
    const sql = "INSERT INTO tasks SET?";
    db.query(sql, data, callback);
  }
  ///////////////////////
  // UPDATE TASK MODEL
  //////////////////////
  static update_task_model(data, task_id, callback) {
    const sql = "UPDATE tasks SET? WHERE task_id=?";
    db.query(sql, [data, task_id], callback);
  }
  //////////////////////////////
  // UPDATE TASK STATUS MODEL
  //////////////////////////////
  static update_task_status_model(task_status, task_id, callback) {
    const sql = "UPDATE tasks SET task_status=? WHERE task_id=?";
    db.query(sql, [task_status, task_id], callback);
  }
  ///////////////////////
  // DELETE TASK MODEL
  //////////////////////
  static delete_task_model(task_id, callback) {
    const sql = "DELETE FROM tasks WHERE task_id=?";
    db.query(sql, [task_id], callback);
  }
}
module.exports = TaskModel;
