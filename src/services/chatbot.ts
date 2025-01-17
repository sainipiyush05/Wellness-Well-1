const API_KEY = process.env.REACT_APP_HUGGING_FACE_API_KEY;

async function query(message: string) {
  console.log("Sending request to API...");

  const response = await fetch(
    "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-v0.1",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: message,
        parameters: {
          max_new_tokens: 100,
          temperature: 0.7,
          top_k: 50,
          top_p: 0.9,
          do_sample: true,
          return_full_text: false,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("API Error:", errorText);
    throw new Error(`API error: ${response.status}`);
  }

  const result = await response.json();
  return result;
}

export const getChatbotResponse = async (message: string): Promise<string> => {
  try {
    // Handle greetings and general conversation while maintaining medical context
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes("how are you")) {
      return "I'm doing well, thank you! I'm here to help you with any medical questions or concerns. Would you like to know about our disease prediction tools?";
    }

    const prompt = `As a medical AI assistant, please provide a brief, professional response to: ${message}. Focus on health-related aspects if applicable.`;

    const result = await query(prompt);
    console.log("API Response:", result);

    if (Array.isArray(result)) {
      return result[0]?.generated_text || getFallbackResponse(message);
    } else if (typeof result === "object" && "generated_text" in result) {
      return result.generated_text || getFallbackResponse(message);
    }

    return getFallbackResponse(message);
  } catch (error) {
    console.error("Chatbot error:", error);
    return getFallbackResponse(message);
  }
};

const getFallbackResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("how are you")) {
    return "I'm here to help with your medical questions! Would you like to learn about our disease prediction tools?";
  }
  if (lowerMessage.includes("diabetes")) {
    return "I can help you understand diabetes and its risk factors. Would you like to use our diabetes prediction tool?";
  }
  if (lowerMessage.includes("heart")) {
    return "Heart disease has many risk factors we can analyze. Would you like to check your heart disease risk?";
  }
  if (lowerMessage.includes("parkinson")) {
    return "Our Parkinson's disease prediction tool uses voice analysis. Would you like to learn more?";
  }
  if (lowerMessage.includes("cancer")) {
    return "Early detection is crucial for breast cancer. Would you like to use our prediction tool?";
  }
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
    return "Hello! I'm your medical AI assistant. I can help you understand various diseases and use our prediction tools. What would you like to know about?";
  }

  return "I'm focused on helping with medical questions and disease prediction. Would you like to learn about our health assessment tools?";
};

export const resetConversation = (): void => {
  return;
};
