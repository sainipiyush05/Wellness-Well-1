import axios, { AxiosError } from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const predictDisease = async (diseaseType: string, data: any) => {
  try {
    console.log("Sending prediction request:", { diseaseType, data });
    const response = await axios.post(
      `${API_URL}/predict/${diseaseType}`,
      data
    );
    console.log("Prediction response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Prediction error:", error);
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.detail ||
          "An error occurred while making the prediction"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};
