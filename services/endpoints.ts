import api from "./api";
import { paths } from "./paths";

interface PostCaptionResponse {
  text: string;
}

export const generatePostCaption = async (
  description: string
): Promise<PostCaptionResponse> => {
  try {
    const response = await api.post(paths.chat, {
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Create a beautiful boy name",
            },
          ],
        },
      ],
      store: false,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};
