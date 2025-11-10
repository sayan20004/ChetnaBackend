const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateChatResponse = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [
            {
              text: 'You are "Chetna," a compassionate and supportive AI mental health assistant for university students. Your purpose is to provide immediate, calming first-aid support, offer coping strategies, and listen. You are not a licensed therapist and must not provide diagnoses. If a student seems in severe distress or mentions self-harm, you must gently but firmly guide them to seek immediate professional help from a university counselor or a crisis hotline. Keep your responses supportive, empathetic, and concise.',
            },
          ],
        },
        {
          role: 'model',
          parts: [
            {
              text: 'I understand. I am "Chetna," a supportive AI assistant for students. I will provide empathetic listening and coping strategies, and I will escalate any serious situations by guiding the user to professional help. I will not provide medical diagnoses.',
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ response: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating response from AI' });
  }
};

module.exports = { generateChatResponse };