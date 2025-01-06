import Discussion from "../models/discussionSchema.js";
import {
  fetchDiscussionsByUser,
  fetchDiscussionById,
  createDiscussionByUser,
  updateDiscussionById,
  deleteDiscussionById,
} from "../services/discussionService.js";

export const getDiscussionsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const allDiscussions = await fetchDiscussionsByUser({ userId });
    res.status(200).json(allDiscussions);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getDiscussionById = async (req, res) => {
  try {
    const discussionId = req.params.discussionId;
    const discussion = await fetchDiscussionById({ discussionId });
    res.status(200).json(discussion);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const addDiscussionByUser = async (req, res) => {
  try {
    const { userId, title } = req.body;
    const discussion = await createDiscussionByUser({ userId, title });
    res.status(200).json(discussion);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const editDiscussionById = async (req, res) => {
  try {
    const discussionId = req.params.discussionId;
    const { title } = req.body;
    await updateDiscussionById({ discussionId, title });
    const updatedDiscussion = await Discussion.findById(discussionId);
    res.status(200).json(updatedDiscussion);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const removeDiscussionById = async (req, res) => {
  try {
    const discussionId = req.params.discussionId;
    const discussion = await deleteDiscussionById({ discussionId });
    res.status(200).json(discussion);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
