import axios from "axios";
export const speakHandler = async (req, res) => {
  const { text, voiceId = "en-Us-natalie", format = 'mp3' } = req.body;

  try {

    const response = await axios.post("https://api.murf.ai/v1/speech/generate",
      { text, voiceId, format },
      {
        headers: {
          "content-type": "application/json",
          "accept": "application/json",
          "api-key": process.env.MURF_API_KEY,
        }
      }
    );
    return res.json({ audioUrl: response.data.audioUrl || response.data.audioFile });

  } catch (error) {
    res.status(500).json({ error: error.message || 'Error generating audio' });
  }
}