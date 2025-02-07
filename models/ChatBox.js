import BaseModel from "./BaseModel.js";
import pool from "../lib/db.js";

class ChatBox extends BaseModel {
  constructor() {
    super("chatboxes"); // Nom de la table
  }
  async getCharacter(conversationId) {
    const query = `
      SELECT characters.name AS name, universes.name AS universe, characters.description AS description
      FROM chatboxes
      JOIN characters ON chatboxes.character_id = characters.id
      JOIN universes ON characters.universe_id = universes.id
      WHERE chatboxes.id = $1
    `;
    const values = [conversationId];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }
}

export default new ChatBox();
