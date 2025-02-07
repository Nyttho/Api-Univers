import BaseModel from "./BaseModel.js";
import pool from "../lib/db.js";

class Message extends BaseModel {
  constructor() {
    super("messages");
  }

  async getAllMessages(convId) {
    const query = `SELECT * FROM ${this.tableName} WHERE chatbox_id = $1`;

    try {
      const result = await pool.query(query, [convId]);
      return result.rows;
    } catch (error) {
      console.error("Erreur SQL:", error);
      throw new Error("Impossible de récupérer les messages");
    }
  }

  async getLastMessage(convId) {
    const query = `
      SELECT * FROM ${this.tableName} 
      WHERE chatbox_id = $1 
      ORDER BY created_at DESC 
      LIMIT 1
    `;

    try {
      const result = await pool.query(query, [convId]);
      return result.rows[0] || null; // Retourne null si aucun message trouvé
    } catch (error) {
      console.error("Erreur SQL:", error);
      throw new Error("Impossible de récupérer le dernier message");
    }
  }
}

export default new Message();
