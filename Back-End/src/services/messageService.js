import Discussion from "../models/discussionSchema.js";
import Message from "../models/messageSchema.js";

export const createMessageToDiscussion = async ({
  discussionId,
  sender,
  text,
}) => {
  const message = new Message({ discussionId, sender, text });
  const savedMessage = await message.save();
  await Discussion.findByIdAndUpdate(discussionId, {
    $push: { messageIds: savedMessage._id },
  });
  return savedMessage;
};

export const fetchMessagesByDiscussion = async ({
  discussionId,
  limit,
  page,
}) => {
  const messages = await Message.find({ discussionId })
    .sort([["timestamp", -1]])
    .limit(limit)
    .skip(limit * (page - 1));
  return messages.reverse();
};
