// import database
const db = require("../config/database");

// membuat class Patient
class Patient {
  /**
   * Membuat method static all.
   */
  static all() {
    // return Promise sebagai solusi Asynchronous
    return new Promise((resolve, reject) => {
      const sql = "SELECT * from patients";
      /**
       * Melakukan query menggunakan method query.
       * Menerima 2 params: query dan callback
       */
      db.query(sql, (err, results) => {
        resolve(results);
      });
    });
  }

  // membuat method static create
  static async create(data) {
    // in_date_at = new Date();
    const id = await new Promise((resolve, reject) => {
      const sql = "INSERT INTO patients SET ?";
      db.query(sql, data, (err, results) => {
        resolve(results.insertId);
      });
    });

    const patient = this.find(id);
    return patient;
  }

  // mencari data patient berdasarkan id
  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * from patients WHERE id = ?";
      db.query(sql, id, (err, results) => {
        // destructure object results
        const patient = results;
        resolve(patient);
      });
    });
  }

  // mengupdate data patient
  static async update(data, id) {
    // out_date_at = new Date();
    await new Promise((resolve, reject) => {
      const sql = "UPDATE patients SET ? WHERE id = ?";
      db.query(sql, [data, id], (err, results) => {
        resolve(results);
      });
    });

    const patient = await Patient.find(id);
    return patient;
  }

  // menghapus data patient
  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM patients WHERE id = ?";
      db.query(sql, id, (err, results) => {
        resolve(results);
      });
    });
  }

  static search(name) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * from patients WHERE name = ?";
      db.query(sql, name, (err, results) => {
        // destructure object results
        const patient = results;
        resolve(patient);
      });
    });
  }

  static findByStatus(status) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * from patients WHERE status = ?";
      db.query(sql, status, (err, results) => {
        // destructure object results
        const patient = results;
        resolve(patient);
      });
    });
  }

  static total(status) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT COUNT(*) as total from patients WHERE status = ?";
      db.query(sql, status, (err, results) => {
        // destructure object results
        const patient = results;
        resolve(patient);
      });
    });
  }
}

// export class Patient
module.exports = Patient;
