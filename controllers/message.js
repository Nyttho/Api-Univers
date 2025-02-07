import Message from "../models/Message.js";
import ChatBox from "../models/ChatBox.js";
import { getCharacterResponse } from "../utils/ia.js";

export const getAllMessages = async (req, res) => {
  try {
    const conversationId = req.params.id;
    const messages = await Message.getAllMessages(conversationId);
    if (messages.length === 0) {
      return res.status(404).json({ error: "Messages not found" });
    }

    return res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createMessage = async (req, res) => {
  try {
    const userId = req.user.id;
    const conversationId = req.params.id;

    const { content } = req.body;

    if (!content) {
      res.status(400).json({ error: "Message is required" });
    }

    const newUserMessage = {
      content,
      sender_id: userId,
      chatbox_id: conversationId,
      sender_type: "user",
    };

    await Message.create(newUserMessage);

    const character = await ChatBox.getCharacter(conversationId);

    const characterResponse = await getCharacterResponse(character, content);

    const newCharacterMessage = {
      content: characterResponse,
      sender_id: userId,
      chatbox_id: conversationId,
      sender_type: "character",
    };

    await Message.create(newCharacterMessage);

    return res.status(201).json({ characterResponse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//A terminer
export const updateLastMessage = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
