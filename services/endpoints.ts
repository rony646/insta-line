import { ToastAndroid } from "react-native";
import api from "./api";
import { paths } from "./paths";

interface PostCaptionResponse {
  choices: {
    index: 0;
    message: {
      role: string;
      content: string;
      refusal: boolean | null;
    };
  }[];
}

export const generatePostCaption = async (
  description: string
): Promise<PostCaptionResponse> => {
  try {
    const response = await api.post(paths.chat, {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Create a create instagram caption for this description: ${description}`,
            },
          ],
        },
      ],
      store: false,
    });
    return response.data;
  } catch (err) {
    ToastAndroid.show(
      "Error while trying to generate caption",
      ToastAndroid.SHORT
    );

    throw err;
  }
};
