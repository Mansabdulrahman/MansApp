
import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";

// API Key is handled by the environment and must not be configured in the UI.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const PROMPT = "Make the person in this photo appear to be sleeping on a bed, wearing pajamas. The background should be a cozy bedroom setting. The final image should be photorealistic and peaceful.";

export const editImage = async (base64ImageData: string, mimeType: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: PROMPT,
          },
        ],
      },
      config: {
          responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
      }
    }

    throw new Error("The AI did not return an image. It might have responded with text only. Please try another image.");
  } catch (error) {
    console.error("Error editing image with Gemini API:", error);
    if (error instanceof Error) {
        if (error.message.includes('400') || error.message.includes('INVALID_ARGUMENT')) {
             throw new Error("The uploaded image may not be suitable. Please try a clear, well-lit photo of a person.");
        }
        throw new Error(`Failed to generate image: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the image.");
  }
};
