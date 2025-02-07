import BaseModel from "./BaseModel.js";
import pool from "../lib/db.js";

class Universe extends BaseModel {
  constructor() {
    super("universes"); // Nom de la table
  }

  async getByName(name) {
    const query = `SELECT * FROM ${this.tableName} WHERE name = $1`;
    const result = await pool.query(query, [name]);
    return result.rows[0] || null;
  }
}

export default new Universe();
