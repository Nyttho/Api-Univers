import BaseModel from "./BaseModel.js";
import pool from "../lib/db.js";

class Message extends BaseModel {
  constructor() {
    super("messages"); // Nom de la table
  }

  async getAllMessages(convId) {
    const query = `SELECT * FROM ${this.tableName} WHERE chatbox_id = $1`;

    try {
      const result = await pool.query(query, [convId]); // ✅ Ajout de `await`
      return result.rows;
    } catch (error) {
      console.error("Erreur SQL:", error);
      throw new Error("Impossible de récupérer les messages");
    }
  }
}

export default new Message();
