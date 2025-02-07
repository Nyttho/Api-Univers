import ChatBox from "../models/ChatBox.js";

export const getAllConversations = async (req, res) => {
  try {
    const userId = req.user.id;
    const conversations = await ChatBox.getAll();
    if (conversations.length === 0) {
      return res.status(404).json({ error: "Conversations not found" });
    }

    const userConversation = conversations.filter(
      (conv) => conv.created_by === userId
    );
    if (userConversation.length === 0) {
      return res.status(404).json({ error: "Conversations not found" });
    }

    return res.status(200).json({ userConversation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOneConversation = async (req, res) => {
  try {
    const userId = req.user.id;
    const conversationId = req.params.id;
    const conversation = await ChatBox.getById(conversationId);

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    if (userId !== conversation.created_by) {
      return res
        .status(403)
        .json({ error: "You're not allowed to access this conversation" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createConversation = async (req, res) => {
  try {
    const userId = req.user.id;
    const characterId = req.params.id;
    const newConversation = {
      user_id: userId,
      character_id: characterId,
    };
    const chat = await ChatBox.create(newConversation);
    return res
      .status(201)
      .json({ message: "Conversation created successfully", id: chat.id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteConversation = async (req, res) => {
  try {
    const conversationId = req.params.id;
    const userId = req.user.id;

    const conversation = await ChatBox.getById(conversationId);

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    if (userId !== conversation.created_by) {
      return res
        .status(403)
        .json({ error: "You're not allowed to modify this conversation" });
    }
    await ChatBox.delete(conversationId);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
