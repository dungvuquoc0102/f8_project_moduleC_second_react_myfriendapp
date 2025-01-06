import axios from "axios";
async function getResponseMessage(prompt) {
  try {
    const payload = {
      model: "gemma2:2b",
      prompt,
      max_tokens: 200,
    };
    const response = await axios.post(
      "http://localhost:11434/v1/completions",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.choices[0].text;
  } catch (error) {
    console.log(error);
  }
}

export default getResponseMessage;
