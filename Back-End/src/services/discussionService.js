import Discussion from "../models/discussionSchema.js";
import User from "../models/userSchema.js";

export const createDiscussionByUser = async ({ userId, title }) => {
  const discussion = new Discussion({
    userId,
    title,
    messageIds: [],
  });
  const savedDiscussion = await discussion.save();
  await User.findByIdAndUpdate(userId, {
    $push: { discussionIds: savedDiscussion._id },
  });
  return savedDiscussion;
};

export const fetchDiscussionsByUser = async ({ userId }) => {
  const discussions = await Discussion.find({
    userId,
  });
  if (!discussions) throw new Error("Discussion not found");
  return discussions;
};

export const fetchDiscussionById = async ({ discussionId }) => {
  const discussion = await Discussion.findById(discussionId);
  if (!discussion) throw new Error("Discussion not found");
  return discussion;
};

export const updateDiscussionById = async ({ discussionId, title }) => {
  const discussion = await Discussion.findByIdAndUpdate(discussionId, {
    title,
  });
  if (!discussion) throw new Error("Discussion not found");
  return discussion;
};

export const deleteDiscussionById = async ({ discussionId }) => {
  const discussion = await Discussion.findByIdAndDelete(discussionId);
  if (!discussion) throw new Error("Discussion not found");
  return discussion;
};
