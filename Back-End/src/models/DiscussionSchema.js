import mongoose from "mongoose";

const discussionSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  messageIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  createdAt: { type: Date, default: Date.now },
});

const Discussion = mongoose.model("Discussion", discussionSchema);
export default Discussion;
