const chatModel = require("../models/chatModel");
const ChatModel = require("../models/chatModel");
const userModel = require("../models/userModel");

const createChat = async (req, res) => {
  const test = await chatModel.findOne({ members: [req.body.senderId, req.body.receiverId] });
  if (test) {
    res.status(200).send({ msg: 'Already chat exist' });
    return;
  }
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(200).json(error);
  }
}

const userChats = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

const findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json(error)
  }
}

const getUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const userDetails = await userModel.findById(userId);
    res.status(200).send({ userDetails });
  } catch (err) {
    console.log('User not found');
  }
}

module.exports = { createChat, userChats, findChat, getUser };