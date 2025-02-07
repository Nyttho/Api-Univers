import BaseModel from "./BaseModel.js";
import pool from "../lib/db.js";

class Character extends BaseModel {
  constructor() {
    super("characters"); // Nom de la table
  }
  async getByName(name) {
    const query = `SELECT * FROM ${this.tableName} WHERE name = $1`;
    const result = await pool.query(query, [name]);
    return result.rows[0] || null;
  }

  async getAllByUniverseId(universeId) {
    const query = `SELECT * FROM ${this.tableName} WHERE universe_id = $1`;
    const result = await pool.query(query, [universeId]);
    return result.rows || null;
  }
}

export default new Character();
