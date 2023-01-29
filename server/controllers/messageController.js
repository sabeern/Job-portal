const chatModel = require("../models/chatModel");
const MessageModel = require("../models/messageModel");
const jwt = require('jsonwebtoken');
//Inserting new messages sended by users
const addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  const message = new MessageModel({
    chatId,
    senderId,
    text,
  });
  try {
    const result = await message.save();
    try {
      await chatModel.findByIdAndUpdate(chatId, { updatedAt: Date.now() });
    } catch (err) {
      res.status(500).json(err);
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
//Fetching all messages of selectd chat
const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    if (req.headers['x-custom-header']) {
      token = req.headers['x-custom-header'];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      let userId = decode.loginedUser.id;
      await MessageModel.updateMany({ chatId, senderId: { $ne: userId } }, { $set: { readStatus: true } });
    }
  } catch (err) {
    res.status(500).json(err.message);
    return;
  }
  try {
    const result = await MessageModel.find({ chatId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}
const unreadMessageCount = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const senderId = req.params.senderId;
    const unReadCount = await MessageModel.find({ chatId, readStatus: false, senderId: { $ne: senderId } }).count();
    res.status(200).json(unReadCount);
  } catch (err) {
    res.status(500).json(err.message);
  }
}

module.exports = { addMessage, getMessages, unreadMessageCount };