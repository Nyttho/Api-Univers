import BaseModel from "./BaseModel.js";
import pool from "../lib/db.js";

class User extends BaseModel {
  constructor() {
    super("users"); // Nom de la table
  }

  // Méthodes spécifiques à User, si nécessaires
  async getByEmail(email) {
    const query = `SELECT * FROM ${this.tableName} WHERE email = $1;`;
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
  }
}

export default new User();
