import getResponseMessage from "../services/chatbotService.js";
import {
  fetchMessagesByDiscussion,
  createMessageToDiscussion,
} from "../services/messageService.js";

export const getMessagesByDiscussion = async (req, res) => {
  try {
    const discussionId = req.params.discussionId;
    const { limit, page } = req.query;
    const messages = await fetchMessagesByDiscussion({
      discussionId,
      limit,
      page,
    });
    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const addMessageToDiscussion = async (req, res) => {
  try {
    const { discussionId, sender, text } = req.body;
    //creat message to db
    const message = await createMessageToDiscussion({
      discussionId,
      sender,
      text,
    });
    //generate message response by bot
    // const responseText = await getResponseMessage(text);
    // const responseMessage = await createMessageToDiscussion({
    //   discussionId,
    //   sender: "bot",
    //   text: responseText,
    // });
    res.status(200).json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getMessageFromBot = async (req, res) => {
  try {
    const { discussionId, sender, text } = req.body;
    // const contextMessages = await fetchMessagesByDiscussion({
    //   discussionId,
    //   limit: 5,
    // });
    const contextMessages = JSON.parse(text);
    const contextMessageString = contextMessages
      .map((message) => {
        return `${message.sender}: ${message.text}`;
      })
      .join(",");

    console.log(contextMessages);
    console.log(contextMessageString);
    const responseText = await getResponseMessage(contextMessageString);
    const responseMessage = await createMessageToDiscussion({
      discussionId,
      sender: "bot",
      text: responseText,
    });
    res.status(200).json(responseMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
