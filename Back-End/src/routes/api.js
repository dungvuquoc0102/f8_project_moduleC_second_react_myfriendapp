import express from "express";
import {
  getDiscussionsByUser,
  getDiscussionById,
  addDiscussionByUser,
  editDiscussionById,
  removeDiscussionById,
} from "../controllers/discussionController.js";
import { addUser, checkUser } from "../controllers/userController.js";
import {
  getMessagesByDiscussion,
  addMessageToDiscussion,
  getMessageFromBot,
} from "../controllers/messageController.js";

const router = express.Router();
//hello
router.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello from the server",
  });
});

//discussion
router.get("/discussions/:userId", getDiscussionsByUser);
router.get("/discussion/:discussionId", getDiscussionById);
router.post("/discussions", addDiscussionByUser);
router.patch("/discussions/:discussionId", editDiscussionById);
router.delete("/discussions/:discussionId", removeDiscussionById);

//user
router.post("/register", addUser);
router.post("/login", checkUser);

//message
router.get("/messages/:discussionId", getMessagesByDiscussion);
router.post("/messages", addMessageToDiscussion);
router.post("/messages/response", getMessageFromBot);

export default router;
